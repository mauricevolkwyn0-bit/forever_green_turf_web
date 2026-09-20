import { Resend } from "resend";

const BUSINESS_INBOX = "info@forevergreenturf.co.za";
const RECAPTCHA_ACTION = "contact";
const RECAPTCHA_MIN_SCORE = 0.5;

// Verifies a reCAPTCHA v3 token server-side. Returns true (open) when the
// secret isn't configured yet, so the form keeps working before setup —
// same fail-open behavior as the other optional third-party keys in this
// project (see .env.local). Once RECAPTCHA_SECRET_KEY is set, submissions
// without a valid, high-enough-scoring token are rejected.
async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data: { success?: boolean; score?: number; action?: string } = await res.json();
    return (
      data.success === true &&
      (data.score === undefined || data.score >= RECAPTCHA_MIN_SCORE) &&
      (data.action === undefined || data.action === RECAPTCHA_ACTION)
    );
  } catch (err) {
    console.error("reCAPTCHA verification request failed:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: { name?: string; phone?: string; email?: string; location?: string; service?: string; message?: string; recaptchaToken?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const location = (body.location ?? "").trim();
  const service = (body.service ?? "").trim();
  const message = (body.message ?? "").trim();

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!phone) missing.push("phone");
  if (!/\S+@\S+\.\S+/.test(email)) missing.push("email");
  if (missing.length) {
    return Response.json({ error: `Missing or invalid: ${missing.join(", ")}` }, { status: 400 });
  }

  if (!(await verifyRecaptcha(body.recaptchaToken))) {
    return Response.json({ error: "Verification failed. Please refresh the page and try again." }, { status: 400 });
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
      <p><strong>Location:</strong> ${escapeHtml(location || "—")}</p>
      <p><strong>Service Required:</strong> ${escapeHtml(service || "—")}</p>
      <p><strong>Project Description:</strong></p>
      <p>${escapeHtml(message || "—").replace(/\n/g, "<br/>")}</p>
    `,
    text:
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Location: ${location || "—"}\n` +
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
