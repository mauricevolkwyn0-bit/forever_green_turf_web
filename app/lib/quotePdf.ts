import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { FOREST, GRASS, CREAM, STONE } from "@/app/components/theme";

export type QuotePdfData = {
  referenceNumber: string;
  createdAt: Date;
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  shape: string;
  dimsSummary: string;
  area: string;
  estimateLow: string;
  estimateHigh: string;
};

const CONTACT = {
  phone: "081 412 5540",
  email: "info@forevergreenturf.co.za",
  address: "141 King Edward St, Parow, Cape Town, 7500",
};

const MARGIN = 50;
const PAGE_WIDTH = 495; // A4 content width at 50pt margins

export function generateQuotePdf(data: QuotePdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: MARGIN });
      const chunks: Buffer[] = [];
      doc.on("data", chunk => chunks.push(chunk as Buffer));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      let y = drawHeader(doc);
      y = drawTitleBlock(doc, data, y);
      y = drawCustomerBlock(doc, data, y);
      y = drawDetailsTable(doc, data, y);
      drawDisclaimer(doc, y);
      drawFooter(doc);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

function drawHeader(doc: PDFKit.PDFDocument): number {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  try {
    doc.image(fs.readFileSync(logoPath), MARGIN, 40, { width: 40 });
  } catch {
    // Logo missing — proceed without it rather than failing the whole PDF.
  }

  doc.font("Times-Bold").fontSize(18).fillColor(FOREST).text("Forever Green Turf", MARGIN + 50, 50);

  doc.font("Helvetica").fontSize(8.5).fillColor(STONE).text(
    `${CONTACT.phone}\n${CONTACT.email}\n${CONTACT.address}`,
    MARGIN,
    42,
    { width: PAGE_WIDTH, align: "right" }
  );

  const ruleY = 95;
  doc.moveTo(MARGIN, ruleY).lineTo(MARGIN + PAGE_WIDTH, ruleY).lineWidth(1.5).strokeColor(GRASS).stroke();
  return ruleY + 20;
}

function drawTitleBlock(doc: PDFKit.PDFDocument, data: QuotePdfData, startY: number): number {
  doc.font("Times-Bold").fontSize(22).fillColor(FOREST).text("QUOTE ESTIMATE", MARGIN, startY);

  const dateStr = data.createdAt.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
  const lineY = startY + 30;
  doc.font("Helvetica").fontSize(9).fillColor(STONE).text(`Ref: ${data.referenceNumber}    Date: ${dateStr}`, MARGIN, lineY);
  return lineY + 25;
}

// Draws a label/value row as two independent columns (rather than PDFKit's
// `continued` text mode, which flows label+value as one paragraph and wraps
// long values inside the label's narrow width) and returns the y position
// for the next row, sized to whichever column actually wrapped taller.
function drawLabelValueRow(
  doc: PDFKit.PDFDocument,
  label: string,
  value: string,
  x: number,
  y: number,
  labelWidth: number,
  valueWidth: number,
  gap: number
): number {
  doc.font("Helvetica-Bold").fontSize(10.5);
  const labelHeight = doc.heightOfString(label, { width: labelWidth });
  doc.font("Helvetica").fontSize(10.5);
  const valueHeight = doc.heightOfString(value, { width: valueWidth });
  const rowHeight = Math.max(labelHeight, valueHeight);

  doc.font("Helvetica-Bold").fillColor(STONE).text(label, x, y, { width: labelWidth });
  doc.font("Helvetica").fillColor(FOREST).text(value, x + labelWidth, y, { width: valueWidth });

  return y + rowHeight + gap;
}

function drawCustomerBlock(doc: PDFKit.PDFDocument, data: QuotePdfData, startY: number): number {
  let y = startY;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(GRASS).text("PREPARED FOR", MARGIN, y, { characterSpacing: 1 });
  y += 18;

  const labelWidth = 80;
  const valueWidth = PAGE_WIDTH - labelWidth;
  const fields: [string, string][] = [
    ["Name:", data.name],
    ["Phone:", data.phone],
    ["Email:", data.email],
    ["Location:", data.location || "—"],
  ];
  for (const [label, value] of fields) {
    y = drawLabelValueRow(doc, label, value, MARGIN, y, labelWidth, valueWidth, 6);
  }

  return y + 10;
}

function drawDetailsTable(doc: PDFKit.PDFDocument, data: QuotePdfData, startY: number): number {
  let y = startY;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(GRASS).text("QUOTE DETAILS", MARGIN, y, { characterSpacing: 1 });
  y += 20;

  const rows: [string, string][] = [
    ["Service", capitalize(data.service)],
    ["Shape", capitalize(data.shape)],
    ["Dimensions", data.dimsSummary || "—"],
    ["Area", `${data.area} m²`],
  ];

  const labelColX = MARGIN + 12;
  const valueColX = MARGIN + 170;
  const valueColWidth = PAGE_WIDTH - 170 - 24;
  const rowPadding = 16;

  rows.forEach(([label, value], i) => {
    doc.font("Helvetica").fontSize(10);
    const valueHeight = doc.heightOfString(value, { width: valueColWidth });
    const rowHeight = Math.max(valueHeight + rowPadding, 26);

    if (i % 2 === 0) {
      doc.rect(MARGIN, y, PAGE_WIDTH, rowHeight).fill(CREAM);
    }
    doc.font("Helvetica-Bold").fontSize(10).fillColor(STONE).text(label, labelColX, y + 8, { width: 150 });
    doc.font("Helvetica").fontSize(10).fillColor(FOREST).text(value, valueColX, y + 8, { width: valueColWidth });
    y += rowHeight;
  });

  y += 12;
  const boxHeight = 60;
  doc.roundedRect(MARGIN, y, PAGE_WIDTH, boxHeight, 4).fill(CREAM);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(STONE).text("Estimated Price Range", MARGIN + 12, y + 12);
  doc.font("Times-Bold").fontSize(20).fillColor(FOREST).text(
    `R ${Number(data.estimateLow).toLocaleString("en-ZA")} – R ${Number(data.estimateHigh).toLocaleString("en-ZA")}`,
    MARGIN + 12,
    y + 28
  );

  return y + boxHeight + 20;
}

function drawDisclaimer(doc: PDFKit.PDFDocument, startY: number) {
  const height = 90;
  doc.roundedRect(MARGIN, startY, PAGE_WIDTH, height, 4).fillAndStroke("#FFF8E8", STONE);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(FOREST).text(
    "IMPORTANT — THIS IS AN AUTOMATED ESTIMATE",
    MARGIN + 12,
    startY + 14,
    { width: PAGE_WIDTH - 24 }
  );
  doc.font("Helvetica").fontSize(9.5).fillColor(STONE).text(
    "This is a rough automated estimate based on area only, generated without a site visit. " +
    "Your final price will be confirmed after a free, no-obligation site visit from our team — " +
    "pricing may vary based on ground conditions, access, and material selection.",
    MARGIN + 12,
    startY + 34,
    { width: PAGE_WIDTH - 24, lineGap: 2 }
  );
}

function drawFooter(doc: PDFKit.PDFDocument) {
  const y = 760;
  doc.moveTo(MARGIN, y).lineTo(MARGIN + PAGE_WIDTH, y).lineWidth(0.5).strokeColor(STONE).stroke();
  doc.font("Helvetica").fontSize(8).fillColor(STONE).text(
    `Forever Green Turf · ${CONTACT.phone} · ${CONTACT.email} · ${CONTACT.address}`,
    MARGIN,
    y + 8,
    { width: PAGE_WIDTH, align: "center" }
  );
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
