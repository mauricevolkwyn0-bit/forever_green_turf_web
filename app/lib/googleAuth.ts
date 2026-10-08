// Shared service-account access to Google Sheets and Cloud Storage. Never
// expose these credentials to the browser (no NEXT_PUBLIC_ prefix, never
// imported into a client component).
//
// Talks to the REST APIs directly with a self-signed JWT instead of using the
// `googleapis` / `@google-cloud/storage` SDKs — those add several MB to the
// server bundle, which pushes the Cloudflare Worker over its size limit.

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/devstorage.read_write",
].join(" ");

export function getServiceAccountCredentials() {
  return {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  };
}

export function hasServiceAccountCredentials() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
}

// Accepts either a bare spreadsheet ID or the full Sheets URL people naturally
// copy-paste from their browser address bar.
export function resolveSpreadsheetId(raw = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!) {
  return raw.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ?? raw;
}

function base64url(input: ArrayBuffer | string) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signJwt(clientEmail: string, privateKeyPem: string) {
  const der = Uint8Array.from(
    atob(privateKeyPem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")),
    c => c.charCodeAt(0),
  );
  const key = await crypto.subtle.importKey(
    "pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"],
  );
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64url(JSON.stringify({
    iss: clientEmail,
    scope: SCOPES,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }))}`;
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  return `${unsigned}.${base64url(sig)}`;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;
  const { client_email, private_key } = getServiceAccountCredentials();
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: await signJwt(client_email, private_key),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google token request failed: ${res.status} ${await res.text()}`);
  const data: { access_token: string; expires_in: number } = await res.json();
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function googleFetch(url: string, init: RequestInit = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${await getAccessToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google API ${res.status} for ${url.split("?")[0]}: ${await res.text()}`);
  return res;
}

const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

export async function getSheetValues(range: string): Promise<string[][]> {
  const res = await googleFetch(`${SHEETS_BASE}/${resolveSpreadsheetId()}/values/${encodeURIComponent(range)}`);
  const data: { values?: string[][] } = await res.json();
  return data.values ?? [];
}

export async function appendSheetRow(range: string, row: (string | number)[]) {
  const params = new URLSearchParams({ valueInputOption: "USER_ENTERED", insertDataOption: "INSERT_ROWS" });
  await googleFetch(`${SHEETS_BASE}/${resolveSpreadsheetId()}/values/${encodeURIComponent(range)}:append?${params}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
  });
}

export async function uploadToBucket(bucket: string, key: string, body: ArrayBuffer, contentType: string) {
  const params = new URLSearchParams({ uploadType: "media", name: key });
  await googleFetch(`https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?${params}`, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body,
  });
}
