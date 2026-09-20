import { randomUUID } from "node:crypto";
import { Storage } from "@google-cloud/storage";
import { generateQuotePdf } from "@/app/lib/quotePdf";
import { sendQuoteEmail } from "@/app/lib/quoteEmail";
import { getServiceAccountCredentials, getSheetsClient, resolveSpreadsheetId } from "@/app/lib/googleAuth";

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function getStorage() {
  return new Storage({ credentials: getServiceAccountCredentials(), projectId: process.env.GOOGLE_CLOUD_PROJECT_ID });
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

// Uploads to a uniform-bucket-level-access bucket — public read comes from a
// bucket-level `allUsers: Storage Object Viewer` IAM binding (see .env.local
// setup notes), not from a per-object ACL. Calling file.makePublic() here
// would throw ("Cannot use ACL API with UBLA enabled").
async function uploadPhoto(file: File): Promise<string> {
  const bucketName = process.env.GCS_BUCKET_NAME!;
  const key = `quotes/${Date.now()}-${randomUUID()}-${sanitizeFilename(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await getStorage().bucket(bucketName).file(key).save(buffer, {
    contentType: file.type || "application/octet-stream",
    resumable: false,
  });
  return `https://storage.googleapis.com/${bucketName}/${key}`;
}

function formatDims(dimsJson: string) {
  try {
    const dims = JSON.parse(dimsJson) as Record<string, string>;
    return Object.entries(dims)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  } catch {
    return "";
  }
}

async function appendQuoteRow(row: (string | number)[]) {
  const sheets = getSheetsClient();
  const tab = process.env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1";
  await sheets.spreadsheets.values.append({
    spreadsheetId: resolveSpreadsheetId(),
    range: `${tab}!A:L`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const str = (k: string) => (formData.get(k) as string | null)?.trim() ?? "";
  const name = str("name");
  const phone = str("phone");
  const email = str("email");
  const location = str("location");
  const service = str("service");
  const shape = str("shape");
  const dimsJson = str("dims");
  const area = str("area");
  const estimateLow = str("estimateLow");
  const estimateHigh = str("estimateHigh");

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!phone) missing.push("phone");
  if (!/\S+@\S+\.\S+/.test(email)) missing.push("email");
  if (!service) missing.push("service");
  if (!shape) missing.push("shape");
  if (missing.length) {
    return Response.json({ error: `Missing or invalid: ${missing.join(", ")}` }, { status: 400 });
  }

  const photoFiles = formData.getAll("photos").filter(
    (v): v is File => v instanceof File && v.size > 0
  );
  if (photoFiles.length > MAX_PHOTOS) {
    return Response.json({ error: `Please upload at most ${MAX_PHOTOS} photos.` }, { status: 400 });
  }
  const tooLarge = photoFiles.find(f => f.size > MAX_PHOTO_BYTES);
  if (tooLarge) {
    return Response.json({ error: `"${tooLarge.name}" is too large (max 5MB).` }, { status: 400 });
  }

  let photoUrls: string[] = [];
  try {
    photoUrls = await Promise.all(photoFiles.map(uploadPhoto));
  } catch (err) {
    console.error("GCS upload failed:", err);
    return Response.json({ error: "Photo upload failed. Please try again." }, { status: 502 });
  }

  try {
    await appendQuoteRow([
      new Date().toISOString(),
      name,
      phone,
      email,
      location,
      service,
      shape,
      formatDims(dimsJson),
      area,
      estimateLow,
      estimateHigh,
      photoUrls.join(", "),
    ]);
  } catch (err) {
    console.error("Sheets append failed:", err);
    return Response.json({ error: "Could not save your request. Please try again." }, { status: 502 });
  }

  try {
    const referenceNumber = `FGT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const pdfBuffer = await generateQuotePdf({
      referenceNumber,
      createdAt: new Date(),
      name, phone, email, location, service, shape,
      dimsSummary: formatDims(dimsJson),
      area, estimateLow, estimateHigh,
    });
    await sendQuoteEmail({ to: email, name, service, estimateLow, estimateHigh, referenceNumber, pdfBuffer });
  } catch (err) {
    // Non-fatal: the lead is already recorded in the Sheet above, so a PDF/email
    // failure here shouldn't fail the customer's submission.
    console.error("Quote PDF/email delivery failed (lead already recorded):", err);
  }

  return Response.json({ ok: true });
}
