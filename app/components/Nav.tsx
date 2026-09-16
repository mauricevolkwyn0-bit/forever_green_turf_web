"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Leaf } from "lucide-react";
import { FOREST, GRASS, CREAM, FONT_BODY, FONT_DISPLAY, BRAND } from "./theme";
import { useQuoteModal } from "./QuoteModalContext";

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav({ transparentOnTop = true }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const solid = !transparentOnTop || scrolled;

  function handleLogoClick(e: React.MouseEvent) {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: solid ? "rgba(242,237,227,0.95)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? `1px solid rgba(42,74,25,0.12)` : "none",
        transition: "all 0.3s ease",
        fontFamily: FONT_BODY,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: FOREST, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Leaf size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: solid ? FOREST : "#fff", letterSpacing: "-0.01em" }}>{BRAND}</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {LINKS.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: solid ? FOREST : "#fff", letterSpacing: "0.01em", transition: "opacity 0.2s", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="hidden-mobile">
          <a href="tel:+27814125540" style={{ display: "flex", alignItems: "center", gap: 6, color: solid ? FOREST : "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500, fontFamily: FONT_BODY }}>
            <Phone size={14} />
            081 412 5540
          </a>
          <button
            onClick={openQuoteModal}
            style={{ background: GRASS, color: "#fff", border: "none", borderRadius: 4, padding: "10px 20px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = FOREST)}
            onMouseLeave={e => (e.currentTarget.style.background = GRASS)}
          >
            Get a Free Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: solid ? FOREST : "#fff" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: CREAM, borderTop: `1px solid rgba(42,74,25,0.12)`, padding: "16px 24px 24px", fontFamily: FONT_BODY }}>
          {LINKS.map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: FOREST, padding: "12px 0", borderBottom: `1px solid rgba(42,74,25,0.08)`, textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { setOpen(false); openQuoteModal(); }}
            style={{ display: "block", marginTop: 16, width: "100%", textAlign: "center", background: FOREST, color: "#fff", border: "none", borderRadius: 4, padding: "14px 20px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: "pointer", boxSizing: "border-box" }}
          >
            Get a Free Quote
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}
