"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GRASS, FONT_BODY, FONT_DISPLAY, BRAND, SLOGAN, MAPS_URL } from "./theme";
import { useCookieConsent } from "./CookieConsentContext";

const SERVICE_LINKS: { label: string; href: string }[] = [
  { label: "Artificial Grass", href: "/artificial-grass" },
  { label: "Paving", href: "/paving" },
  { label: "Landscaping", href: "/landscaping" },
];

const COMPANY_LINKS: { label: string; href?: string }[] = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/#process" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

const SOCIALS: { label: string; icon: typeof FaFacebook; href?: string }[] = [
  { label: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/share/1PMZqio8ZH/" },
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/forevertgreenturf?stkn=OHp0aHBkbHpzMnEw" },
  { label: "LinkedIn", icon: FaLinkedin },
];

export default function Footer() {
  const { open: openCookieSettings } = useCookieConsent();

  return (
    <footer style={{ background: "#111910", color: "rgba(255,255,255,0.7)", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Image src="/logo.png" alt={`${BRAND} logo`} width={32} height={32} />
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: "#fff" }}>{BRAND}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240, color: "rgba(255,255,255,0.5)" }}>
              Artificial grass, paving and landscaping specialists serving Cape Town and surrounding areas. {SLOGAN}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href ?? undefined}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  aria-disabled={!href}
                  onClick={e => { if (!href) e.preventDefault(); }}
                  style={{
                    width: 32, height: 32, borderRadius: 4, background: "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: href ? "pointer" : "default", color: "rgba(255,255,255,0.6)",
                    opacity: href ? 1 : 0.4, transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { if (href) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = GRASS; } }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Services</div>
            {SERVICE_LINKS.map(s => (
              <Link key={s.label} href={s.href} style={{ display: "block", marginBottom: 10, fontSize: 14, cursor: "pointer", color: "rgba(255,255,255,0.55)", transition: "color 0.2s", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{s.label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Company</div>
            {COMPANY_LINKS.map(l => (
              l.href ? (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{ display: "block", marginBottom: 10, fontSize: 14, cursor: "pointer", color: "rgba(255,255,255,0.55)", transition: "color 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >{l.label}</Link>
              ) : (
                <div key={l.label} style={{ marginBottom: 10, fontSize: 14, cursor: "pointer", color: "rgba(255,255,255,0.55)", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >{l.label}</div>
              )
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Contact</div>
            {[
              { icon: Phone,  text: "081 412 5540",                                href: "tel:+27814125540" },
              { icon: Mail,   text: "info@forevergreenturf.co.za",                 href: "mailto:info@forevergreenturf.co.za" },
              { icon: MapPin, text: "141 King Edward St, Parow, Cape Town, 7500",   href: MAPS_URL, external: true },
            ].map(({ icon: Icon, text, href, external }, i) => (
              <a
                key={i}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12, fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                <Icon size={13} color={GRASS} style={{ flexShrink: 0, marginTop: 1 }} />
                {text}
              </a>
            ))}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", marginTop: 4, fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              Closed · Opens 7:30am Thu
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} {BRAND} (Pty) Ltd. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => openCookieSettings(true)}
              style={{ background: "none", border: "none", padding: 0, fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer", textDecoration: "underline", fontFamily: FONT_BODY }}
            >
              Cookie Settings
            </button>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Workmanship Guaranteed</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
