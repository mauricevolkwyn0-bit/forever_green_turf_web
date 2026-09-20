import { getSheetsClient, hasServiceAccountCredentials, resolveSpreadsheetId } from "./googleAuth";
import type { PortfolioEntry } from "../components/Portfolio";

const VALID_TAGS = new Set(["lawn", "paving", "garden"]);

// Portfolio projects are managed by the business in a "Portfolio" tab of the
// same Google Sheet used for quote leads, so non-technical staff can add or
// remove projects without a code deploy. Expected columns (row 1 is a header,
// data starts at row 2):
//   A: Title           e.g. "Sandton Residential"
//   B: Category        "lawn", "paving", or "garden"
//   C: Image           object path in the GCS_BUCKET_NAME bucket, e.g.
//                       "portfolio/sandton-1.jpg" (or a full https:// URL)
// Returns null (caller falls back to placeholder projects) whenever the
// sheet isn't configured, has no valid rows, or the fetch fails.
export async function getPortfolioItems(): Promise<PortfolioEntry[] | null> {
  const bucket = process.env.GCS_BUCKET_NAME;
  if (!bucket || !process.env.GOOGLE_SHEETS_SPREADSHEET_ID || !hasServiceAccountCredentials()) {
    return null;
  }

  try {
    const sheets = getSheetsClient();
    const tab = process.env.GOOGLE_SHEETS_PORTFOLIO_SHEET_NAME || "Portfolio";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: resolveSpreadsheetId(),
      range: `${tab}!A2:C500`,
    });

    const rows = res.data.values ?? [];
    const items: PortfolioEntry[] = [];
    rows.forEach((row, i) => {
      const [title, rawTag, image] = row as (string | undefined)[];
      const tag = rawTag?.trim().toLowerCase();
      if (!title?.trim() || !image?.trim() || !tag || !VALID_TAGS.has(tag)) return;
      const key = image.trim().replace(/^\/+/, "");
      const img = /^https?:\/\//i.test(key) ? key : `https://storage.googleapis.com/${bucket}/${key}`;
      items.push({ id: `sheet-${i}`, tag: tag as PortfolioEntry["tag"], title: title.trim(), img });
    });

    return items.length ? items : null;
  } catch (err) {
    console.error("Failed to load portfolio from Google Sheet:", err);
    return null;
  }
}
