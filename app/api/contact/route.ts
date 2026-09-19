import { Resend } from "resend";

const BUSINESS_INBOX = "info@forevergreenturf.co.za";

export async function POST(request: Request) {
  let body: { name?: string; phone?: string; email?: string; service?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const service = (body.service ?? "").trim();
  const message = (body.message ?? "").trim();

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!phone) missing.push("phone");
  if (!/\S+@\S+\.\S+/.test(email)) missing.push("email");
  if (missing.length) {
    return Response.json({ error: `Missing or invalid: ${missing.join(", ")}` }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "Forever Green Turf <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: BUSINESS_INBOX,
    replyTo: email,
    subject: `New project enquiry from ${name}${service ? ` — ${service}` : ""}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Service Required:</strong> ${escapeHtml(service || "—")}</p>
      <p><strong>Project Description:</strong></p>
      <p>${escapeHtml(message || "—").replace(/\n/g, "<br/>")}</p>
    `,
    text:
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Service Required: ${service || "—"}\n\n` +
      `Project Description:\n${message || "—"}`,
  });

  if (error) {
    console.error("Contact form email failed:", error);
    return Response.json({ error: "Could not send your message. Please try again or call us directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
