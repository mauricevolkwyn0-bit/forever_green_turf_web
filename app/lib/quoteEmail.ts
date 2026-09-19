import { Resend } from "resend";

export type SendQuoteEmailArgs = {
  to: string;
  name: string;
  service: string;
  estimateLow: string;
  estimateHigh: string;
  referenceNumber: string;
  pdfBuffer: Buffer;
};

export async function sendQuoteEmail(args: SendQuoteEmailArgs) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "Forever Green Turf <onboarding@resend.dev>";
  const low = Number(args.estimateLow).toLocaleString("en-ZA");
  const high = Number(args.estimateHigh).toLocaleString("en-ZA");

  const { error } = await resend.emails.send({
    from,
    to: args.to,
    subject: `Your Forever Green Turf Quote Estimate — R${low} – R${high}`,
    html: `
      <p>Hi ${escapeHtml(args.name)},</p>
      <p>Thanks for requesting a quote for ${escapeHtml(args.service)} with Forever Green Turf. Your estimate is attached as a PDF (ref: ${escapeHtml(args.referenceNumber)}).</p>
      <p>This is a rough automated estimate based on area only. Your final price is confirmed after a free, no-obligation site visit from our team.</p>
      <p>We'll be in touch within one business day to arrange your site visit.</p>
      <p>— The Forever Green Turf Team<br/>081 412 5540 · info@forevergreenturf.co.za</p>
    `,
    text:
      `Hi ${args.name},\n\n` +
      `Thanks for requesting a quote for ${args.service} with Forever Green Turf. Your estimate is attached as a PDF (ref: ${args.referenceNumber}).\n\n` +
      `This is a rough automated estimate based on area only. Your final price is confirmed after a free, no-obligation site visit from our team.\n\n` +
      `We'll be in touch within one business day to arrange your site visit.\n\n` +
      `— The Forever Green Turf Team\n081 412 5540 · info@forevergreenturf.co.za`,
    attachments: [
      {
        filename: `forever-green-turf-quote-${args.referenceNumber}.pdf`,
        content: args.pdfBuffer,
      },
    ],
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
