"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";
import { useCookieConsent } from "./CookieConsentContext";
import { writeConsent } from "./cookieConsent";

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      style={{
        width: 40, height: 22, borderRadius: 100, border: "none", position: "relative", flexShrink: 0,
        background: checked ? GRASS : "rgba(107,98,81,0.3)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background 0.2s",
      }}
    >
      <span
        style={{
          position: "absolute", top: 2, left: checked ? 20 : 2,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

export default function CookieConsentBanner() {
  const { isOpen, expanded, setExpanded, close } = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);

  if (!isOpen) return null;

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true });
    close();
  }

  function rejectNonEssential() {
    writeConsent({ necessary: true, analytics: false });
    close();
  }

  function savePreferences() {
    writeConsent({ necessary: true, analytics });
    close();
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 190,
        background: "#fff", borderTop: `1px solid rgba(42,74,25,0.15)`,
        boxShadow: "0 -8px 30px rgba(0,0,0,0.12)", fontFamily: FONT_BODY,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 36, height: 36, borderRadius: 4, background: "rgba(107,155,42,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Cookie size={18} color={GRASS} />
          </div>

          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: FOREST, marginBottom: 4 }}>
              Cookie Preferences
            </div>
            <p style={{ fontSize: 13, color: STONE, lineHeight: 1.6, maxWidth: 620 }}>
              We use strictly necessary browser storage to run this site. We don&apos;t currently use analytics or
              marketing cookies, if that changes, you can control it here. See our{" "}
              <Link href="/cookies" style={{ color: FOREST, fontWeight: 600 }}>Cookie Policy</Link> for details.
            </p>

            {expanded && (
              <div style={{ marginTop: 16, display: "grid", gap: 12, maxWidth: 480 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "10px 12px", background: "#F5F0E8", borderRadius: 4 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: FOREST }}>Strictly Necessary</div>
                    <div style={{ fontSize: 12, color: STONE, marginTop: 2 }}>Required for the site to function. Always on.</div>
                  </div>
                  <Toggle checked disabled />
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "10px 12px", background: "#F5F0E8", borderRadius: 4 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: FOREST }}>Analytics &amp; Performance</div>
                    <div style={{ fontSize: 12, color: STONE, marginTop: 2 }}>Not currently in use. Controls whether we may collect anonymous usage data in the future.</div>
                  </div>
                  <Toggle checked={analytics} onChange={setAnalytics} />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
            {expanded ? (
              <button
                onClick={savePreferences}
                style={{ background: FOREST, color: "#fff", border: "none", borderRadius: 4, padding: "10px 20px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Save Preferences
              </button>
            ) : (
              <button
                onClick={acceptAll}
                style={{ background: GRASS, color: "#fff", border: "none", borderRadius: 4, padding: "10px 20px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Accept All
              </button>
            )}
            <button
              onClick={rejectNonEssential}
              style={{ background: "transparent", color: STONE, border: `1px solid rgba(42,74,25,0.2)`, borderRadius: 4, padding: "10px 20px", fontFamily: FONT_BODY, fontWeight: 500, fontSize: 13, cursor: "pointer" }}
            >
              Reject Non-Essential
            </button>
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                style={{ background: "none", border: "none", color: FOREST, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 12, cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                Manage Preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
