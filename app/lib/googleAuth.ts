import { google } from "googleapis";

// Shared service-account credentials for Google Cloud Storage and Sheets
// access. Never expose these to the browser (no NEXT_PUBLIC_ prefix, never
// imported into a client component).
export function getServiceAccountCredentials() {
  return {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  };
}

export function hasServiceAccountCredentials() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
}

export function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: getServiceAccountCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// Accepts either a bare spreadsheet ID or the full Sheets URL people naturally
// copy-paste from their browser address bar.
export function resolveSpreadsheetId(raw = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!) {
  return raw.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ?? raw;
}
