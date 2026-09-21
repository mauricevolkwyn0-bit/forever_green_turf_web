import { unstable_cache } from "next/cache";
import { getSheetsClient, hasServiceAccountCredentials, resolveSpreadsheetId } from "./googleAuth";
import type { PortfolioEntry } from "../components/Portfolio";

const VALID_TAGS = new Set(["lawn", "paving", "garden"]);

async function fetchPortfolioItems(): Promise<PortfolioEntry[] | null> {
  const bucket = process.env.GCS_BUCKET_NAME;
  if (!bucket || !process.env.GOOGLE_SHEETS_SPREADSHEET_ID || !hasServiceAccountCredentials()) {
    return null;
  }

  try {
    const sheets = getSheetsClient();
    const tab = process.env.GOOGLE_SHEETS_PORTFOLIO_SHEET_NAME || "Portfolio";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: resolveSpreadsheetId(),
      range: `${tab}!A2:E500`,
    });

    const rows = res.data.values ?? [];
    const items: PortfolioEntry[] = [];
    rows.forEach((row, i) => {
      const [title, rawTag, image, rawPileHeight, rawPavingType] = row as (string | undefined)[];
      const tag = rawTag?.trim().toLowerCase();
      if (!title?.trim() || !image?.trim() || !tag || !VALID_TAGS.has(tag)) return;
      const key = image.trim().replace(/^\/+/, "");
      const img = /^https?:\/\//i.test(key) ? key : `https://storage.googleapis.com/${bucket}/${key}`;
      const pileHeight = tag === "lawn" ? rawPileHeight?.trim() || undefined : undefined;
      const pavingType = tag === "paving" ? rawPavingType?.trim() || undefined : undefined;
      items.push({ id: `sheet-${i}`, tag: tag as PortfolioEntry["tag"], title: title.trim(), img, pileHeight, pavingType });
    });

    return items.length ? items : null;
  } catch (err) {
    console.error("Failed to load portfolio from Google Sheet:", err);
    return null;
  }
}

// Portfolio projects are managed by the business in a "Portfolio" tab of the
// same Google Sheet used for quote leads, so non-technical staff can add or
// remove projects without a code deploy. Expected columns (row 1 is a header,
// data starts at row 2):
//   A: Title           e.g. "Sandton Residential"
//   B: Category        "lawn", "paving", or "garden"
//   C: Image           object path in the GCS_BUCKET_NAME bucket, e.g.
//                       "portfolio/sandton-1.jpg" (or a full https:// URL)
//   D: Pile Height     lawn rows only, e.g. "20mm" — matches the pile height
//                       options on /artificial-grass so that page can deep-link
//                       into a pre-filtered portfolio view. Left blank for
//                       paving/garden rows.
//   E: Paving Type     paving rows only, e.g. "Block Paving" — matches the
//                       paving type options on /paving for the same deep-link
//                       behavior. Left blank for lawn/garden rows.
// Returns null (caller falls back to placeholder projects) whenever the
// sheet isn't configured, has no valid rows, or the fetch fails.
//
// Wrapped in unstable_cache: this calls the Sheets API directly (not via
// `fetch`), so without caching it would re-run on every request in
// production, adding a live external API round-trip to every homepage and
// /portfolio page load. Revalidating every 5 minutes keeps pages fast while
// still picking up sheet edits without a redeploy.
export const getPortfolioItems = unstable_cache(fetchPortfolioItems, ["portfolio-items"], {
  revalidate: 300,
  tags: ["portfolio"],
});
