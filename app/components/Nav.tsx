"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_BODY, FONT_DISPLAY, BRAND } from "./theme";
import { useQuoteModal } from "./QuoteModalContext";

const NAV_HEIGHT = 72;

const LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const HOME_MENU = [
  { label: "Main", href: "/#main", desc: "Back to the homepage overview" },
  { label: "Services", href: "/#services", desc: "Artificial grass, paving & landscaping" },
  { label: "Process", href: "/#process", desc: "How we bring your project to life" },
];

const SERVICE_PAGES = [
  { label: "Artificial Grass", href: "/artificial-grass", desc: "Supply, installation & pet-friendly options" },
  { label: "Paving", href: "/paving", desc: "Driveways, patios, walkways & more" },
  { label: "Landscaping", href: "/landscaping", desc: "Garden transformations, irrigation & more" },
];

export default function Nav({ transparentOnTop = true }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const { open: openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const solid = !transparentOnTop || scrolled;

  function handleHomeClick(e: React.MouseEvent) {
    setHomeMenuOpen(false);
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
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: NAV_HEIGHT, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" onClick={handleHomeClick} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", textDecoration: "none" }}>
          <Image src="/logo.png" alt={`${BRAND} logo`} width={36} height={36} priority />
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: solid ? FOREST : "#fff", letterSpacing: "-0.01em" }}>{BRAND}</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {/* Home — hover reveals a full-width mega menu.
              height/display here make this wrapper span the full nav bar
              height, flush against the dropdown's `top: NAV_HEIGHT` below —
              otherwise there's a dead zone between the "Home" text and the
              dropdown that isn't part of the hover area, so moving the
              mouse down toward the menu exits the wrapper and closes it
              before the cursor arrives. */}
          <div
            onMouseEnter={() => setHomeMenuOpen(true)}
            onMouseLeave={() => setHomeMenuOpen(false)}
            style={{ position: "relative", height: NAV_HEIGHT, display: "flex", alignItems: "center" }}
          >
            <Link
              href="/"
              onClick={handleHomeClick}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: solid ? FOREST : "#fff", letterSpacing: "0.01em", transition: "opacity 0.2s", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Home
              <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: homeMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </Link>

            {homeMenuOpen && (
              <div
                style={{
                  position: "fixed", top: NAV_HEIGHT, left: 0, right: 0, zIndex: 99,
                  background: "#E8E4D8",
                  borderTop: "1px solid rgba(42,74,25,0.12)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
                  padding: "56px 24px",
                }}
              >
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                  {HOME_MENU.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setHomeMenuOpen(false)}
                      style={{ display: "block", padding: 24, borderRadius: 6, textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(42,74,25,0.06)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 26, color: FOREST, marginBottom: 8, letterSpacing: "-0.01em" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: STONE, lineHeight: 1.5 }}>
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services — same hover-mega-menu pattern as "Home" above, but for
              the three dedicated service pages. */}
          <div
            onMouseEnter={() => setServicesMenuOpen(true)}
            onMouseLeave={() => setServicesMenuOpen(false)}
            style={{ position: "relative", height: NAV_HEIGHT, display: "flex", alignItems: "center" }}
          >
            <span
              style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontSize: 14, fontWeight: 500, color: solid ? FOREST : "#fff", letterSpacing: "0.01em", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Services
              <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: servicesMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </span>

            {servicesMenuOpen && (
              <div
                style={{
                  position: "fixed", top: NAV_HEIGHT, left: 0, right: 0, zIndex: 99,
                  background: "#E8E4D8",
                  borderTop: "1px solid rgba(42,74,25,0.12)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
                  padding: "56px 24px",
                }}
              >
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                  {SERVICE_PAGES.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setServicesMenuOpen(false)}
                      style={{ display: "block", padding: 24, borderRadius: 6, textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(42,74,25,0.06)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 26, color: FOREST, marginBottom: 8, letterSpacing: "-0.01em" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: STONE, lineHeight: 1.5 }}>
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dimming backdrop — deliberately OUTSIDE the hover-tracking wrapper
              above. Nesting it inside previously meant the mouse never left
              that wrapper's DOM subtree while over the backdrop (which covers
              the whole viewport below the nav), so the menu never auto-closed. */}
          {(homeMenuOpen || servicesMenuOpen) && (
            <div
              onClick={() => { setHomeMenuOpen(false); setServicesMenuOpen(false); }}
              style={{ position: "fixed", top: NAV_HEIGHT, left: 0, right: 0, bottom: 0, background: "rgba(10,15,6,0.35)", zIndex: 98 }}
            />
          )}

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
          <Link
            href="/"
            onClick={() => { setOpen(false); }}
            style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: FOREST, padding: "12px 0", borderBottom: `1px solid rgba(42,74,25,0.08)`, textDecoration: "none" }}
          >
            Home
          </Link>
          <div style={{ padding: "4px 0 8px 16px", borderBottom: `1px solid rgba(42,74,25,0.08)` }}>
            {HOME_MENU.map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: FOREST, opacity: 0.75, padding: "8px 0", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "block", width: "100%", textAlign: "left", fontSize: 16, fontWeight: 500, color: FOREST, padding: "12px 0 4px" }}>Services</div>
          <div style={{ padding: "0 0 8px 16px", borderBottom: `1px solid rgba(42,74,25,0.08)` }}>
            {SERVICE_PAGES.map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: FOREST, opacity: 0.75, padding: "8px 0", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
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
