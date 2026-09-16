"use client";

import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY, BRAND } from "./theme";
import { useCookieConsent } from "./CookieConsentContext";

const SECTIONS = [
  {
    heading: "1. What Are Cookies?",
    body: [
      "Cookies are small text files placed on your device by websites you visit. They're widely used to make websites work, work more efficiently, and to provide reporting information. \"Similar technologies\" such as browser local storage work in much the same way and are covered by this policy too.",
    ],
  },
  {
    heading: "2. Cookies We Currently Use",
    body: [
      `At present, ${BRAND}'s website does not set any tracking, advertising, or analytics cookies. The only browser storage we use is a single, strictly necessary local storage entry that remembers the cookie preference choice you make below, so we don't ask you again on every visit.`,
    ],
    list: [
      "Purpose: remembers your cookie consent choice",
      "Type: browser local storage (not a tracking cookie)",
      "Duration: until you clear your browser data or change your preference",
      "Third parties involved: none",
    ],
  },
  {
    heading: "3. Cookie Categories",
    body: ["If we introduce additional cookies in the future, they will fall into one of these categories, which you can always control from the cookie preferences panel on this site:"],
    list: [
      "Strictly Necessary — required for core site functionality. These cannot be switched off.",
      "Analytics & Performance — would help us understand how visitors use the site (e.g. page views). Not currently active.",
      "Marketing — would be used to measure the effectiveness of advertising. We do not use these and have no plans to.",
    ],
  },
  {
    heading: "4. Third-Party Services",
    body: [
      "This website displays Google reviews via a server-side integration with the Google Places API. That integration runs on our server, not in your browser, so it does not set any cookies on your device. If we later add a client-side service (such as analytics or a chat widget) that does set cookies, this policy and the preferences panel will be updated to reflect it before it goes live.",
    ],
  },
  {
    heading: "5. Managing Your Preferences",
    body: [
      "You can review or change your cookie preferences for this site at any time using the button below, or via the \"Cookie Settings\" link in the site footer.",
    ],
  },
  {
    heading: "6. Controlling Cookies via Your Browser",
    body: [
      "Most web browsers also let you manage cookies through their settings, including blocking or deleting them. Because doing so may affect other websites you use, refer to your browser's help documentation for instructions specific to Chrome, Safari, Firefox, or Edge.",
    ],
  },
  {
    heading: "7. Changes to This Policy",
    body: [
      "We may update this Cookie Policy as our use of cookies changes. Any changes will be posted on this page with an updated effective date.",
    ],
  },
];

export default function CookiePolicy() {
  const { open } = useCookieConsent();

  return (
    <section style={{ background: "#fff", padding: "160px 24px 100px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Legal</span>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Cookie Policy
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
              <ul style={{ margin: 0, paddingLeft: 20, color: STONE, lineHeight: 1.8, fontSize: 15 }}>
                {s.list.map((item, k) => <li key={k}>{item}</li>)}
              </ul>
            )}
            {s.heading === "5. Managing Your Preferences" && (
              <button
                onClick={() => open(true)}
                style={{ marginTop: 8, background: FOREST, color: "#fff", border: "none", borderRadius: 4, padding: "12px 24px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
              >
                Manage Cookie Preferences
              </button>
            )}
          </div>
        ))}

        <div style={{ background: "#F5F0E8", borderRadius: 4, padding: "20px 24px", marginTop: 8 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: FOREST, marginBottom: 8 }}>8. Contact Us</h2>
          <p style={{ color: STONE, lineHeight: 1.75, fontSize: 14, marginBottom: 4 }}>
            If you have any questions about this Cookie Policy, please contact us:
          </p>
          <p style={{ color: FOREST, fontWeight: 600, fontSize: 14, lineHeight: 1.8, marginTop: 8 }}>
            {BRAND}<br />
            141 King Edward St, Parow, Cape Town, 7500<br />
            info@forevergreenturf.co.za · 081 412 5540
          </p>
        </div>

        <p style={{ color: STONE, fontSize: 12, lineHeight: 1.7, marginTop: 24, fontStyle: "italic" }}>
          This page is a general template and does not constitute legal advice. We recommend having it reviewed by a
          qualified legal professional to ensure it accurately reflects your use of cookies and complies with POPIA
          and any other applicable requirements for your business.
        </p>
      </div>
    </section>
  );
}
