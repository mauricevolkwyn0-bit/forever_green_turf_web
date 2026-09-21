import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY, BRAND } from "./theme";

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: [
      `This Privacy Policy explains how ${BRAND} ("we", "us", "our") collects, uses, stores, and protects the personal information of visitors to our website and clients who request a quote or contact us, in accordance with South Africa's Protection of Personal Information Act, 2013 (POPIA).`,
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "We collect personal information that you voluntarily provide when you use our contact form or the \"Get a Free Quote\" tool on this website, which may include:",
    ],
    list: [
      "Your name, phone number, and email address",
      "Your physical address or the location of the project",
      "Details about the service you're enquiring about (e.g. artificial grass, paving, or landscaping work) and the dimensions of the area",
      "Photos of your property that you choose to upload",
      "Any other information you include in a message to us",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    body: ["We use the information you provide to:"],
    list: [
      "Prepare and send you a quote or cost estimate",
      "Respond to your enquiries and schedule site visits",
      "Communicate with you about a project you've requested",
      "Improve our services and this website",
    ],
    footer: "We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    heading: "4. Legal Basis for Processing",
    body: [
      "We process your personal information because you have voluntarily provided it to request a service from us (consent), and because doing so is necessary to respond to your enquiry and, where applicable, to perform a contract for services with you.",
    ],
  },
  {
    heading: "5. Cookies and Automated Tracking",
    body: [
      "This website does not currently use analytics, advertising, or tracking cookies. If that changes in the future, this policy will be updated accordingly and, where required, we will ask for your consent. See our Cookie Policy (/cookies) for full details and to manage your preferences.",
    ],
  },
  {
    heading: "6. Sharing With Third Parties",
    body: [
      "We may share limited information with trusted service providers who help us run our business and this website — for example, our website hosting provider, or Google, whose Places API we use to display our public Google reviews on this site. These providers only process information as needed to provide their service to us and are not permitted to use it for their own purposes.",
    ],
  },
  {
    heading: "7. Data Retention",
    body: [
      "We retain the personal information you provide for as long as necessary to respond to your enquiry, deliver any requested service, and comply with our legal and accounting obligations. You may ask us to delete your information at any time, as described below.",
    ],
  },
  {
    heading: "8. Your Rights Under POPIA",
    body: ["Subject to POPIA, you have the right to:"],
    list: [
      "Ask us what personal information we hold about you",
      "Ask us to correct or update inaccurate information",
      "Ask us to delete your personal information",
      "Object to how we process your personal information",
      "Lodge a complaint with the Information Regulator of South Africa",
    ],
    footer: "To exercise any of these rights, contact us using the details at the bottom of this page.",
  },
  {
    heading: "9. Security",
    body: [
      "We take reasonable technical and organisational measures to protect the personal information you share with us against loss, misuse, or unauthorised access. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "10. Children's Privacy",
    body: [
      "Our website and services are intended for adults. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "11. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <section style={{ background: "#fff", padding: "160px 24px 100px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Legal</span>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: STONE, marginBottom: 32 }}>Effective date: 16 September 2026</p>

        {SECTIONS.map((s, i) => (
          <div key={i} style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: FOREST, marginBottom: 12, letterSpacing: "-0.01em" }}>
              {s.heading}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} style={{ color: STONE, lineHeight: 1.75, fontSize: 15, marginBottom: s.list ? 12 : 0 }}>
                {p}
              </p>
            ))}
            {s.list && (
              <ul style={{ margin: "0 0 12px", paddingLeft: 20, color: STONE, lineHeight: 1.8, fontSize: 15 }}>
                {s.list.map((item, k) => <li key={k}>{item}</li>)}
              </ul>
            )}
            {s.footer && (
              <p style={{ color: STONE, lineHeight: 1.75, fontSize: 15 }}>{s.footer}</p>
            )}
          </div>
        ))}

        <div style={{ background: "#F5F0E8", borderRadius: 4, padding: "20px 24px", marginTop: 8 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: FOREST, marginBottom: 8 }}>12. Contact Us</h2>
          <p style={{ color: STONE, lineHeight: 1.75, fontSize: 14, marginBottom: 4 }}>
            If you have any questions about this Privacy Policy or wish to exercise your rights under POPIA, please contact us:
          </p>
          <p style={{ color: FOREST, fontWeight: 600, fontSize: 14, lineHeight: 1.8, marginTop: 8 }}>
            {BRAND}<br />
            141 King Edward St, Parow, Cape Town, 7500<br />
            info@forevergreenturf.co.za · 081 412 5540
          </p>
        </div>

        <p style={{ color: STONE, fontSize: 12, lineHeight: 1.7, marginTop: 24, fontStyle: "italic" }}>
          This page is a general template and does not constitute legal advice. We recommend having it reviewed by a
          qualified legal professional to ensure it fully meets POPIA and any other applicable requirements for your business.
        </p>
      </div>
    </section>
  );
}
