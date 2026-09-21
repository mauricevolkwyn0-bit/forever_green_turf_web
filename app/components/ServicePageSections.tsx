"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";
import { useQuoteModal } from "./QuoteModalContext";
import { useInView } from "../hooks/useInView";

// Shared building blocks for the dedicated service pages (Artificial Grass,
// Paving, Landscaping) — same hero/feature-grid/CTA shape, different content.

export function ServiceHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  const { open: openQuoteModal } = useQuoteModal();
  return (
    <section style={{
      background: FOREST,
      padding: "160px 24px 80px",
      fontFamily: FONT_BODY,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      backgroundImage: "url(/images/hero-grass-texture.jpg)",
      backgroundRepeat: "repeat",
      backgroundSize: "420px auto",
      backgroundAttachment: "fixed",
    }}>
      {/* Dark wash so the white text stays legible over the photo */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,26,9,0.88), rgba(15,26,9,0.68))" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>{eyebrow}</span>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 56px)", color: "#fff", marginTop: 12, marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>{intro}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={openQuoteModal}
            style={{ background: GRASS, color: "#fff", border: "none", borderRadius: 4, padding: "14px 28px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#5a8420")}
            onMouseLeave={e => (e.currentTarget.style.background = GRASS)}
          >
            Get a Free Quote <ArrowRight size={16} />
          </button>
          <Link
            href="/portfolio"
            style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 4, padding: "14px 28px", fontFamily: FONT_BODY, fontWeight: 500, fontSize: 15, cursor: "pointer", transition: "border-color 0.2s", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}

export type FeatureItem = { icon: LucideIcon; title: string; desc: string };

export function FeatureGrid({ heading, subheading, items }: { heading: string; subheading?: string; items: FeatureItem[] }) {
  const { ref: gridRef, inView } = useInView<HTMLDivElement>(0.2, true);

  return (
    <section style={{ background: CREAM, padding: "100px 24px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 42px)", color: FOREST, lineHeight: 1.1, letterSpacing: "-0.02em" }}>{heading}</h2>
          {subheading && <p style={{ color: STONE, lineHeight: 1.7, fontSize: 16, maxWidth: 640, margin: "16px auto 0" }}>{subheading}</p>}
        </div>
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="feature-grid">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              style={{
                background: "#fff",
                borderRadius: 4,
                padding: 28,
                border: "1px solid rgba(42,74,25,0.1)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 4, background: "rgba(107,155,42,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon size={20} color={GRASS} />
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: FOREST, marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 14, color: STONE, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .feature-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .feature-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

export function ServiceNote({ text }: { text: string }) {
  return (
    <section style={{ background: FOREST, padding: "56px 24px", textAlign: "center", fontFamily: FONT_BODY }}>
      <p style={{ color: "#fff", lineHeight: 1.75, fontSize: 20, maxWidth: 720, margin: "0 auto" }}>
        {text}
      </p>
    </section>
  );
}

export function ServiceCTA({ text }: { text: string }) {
  const { open: openQuoteModal } = useQuoteModal();
  return (
    <section style={{
      background: FOREST,
      padding: "80px 24px",
      textAlign: "center",
      fontFamily: FONT_BODY,
      position: "relative",
      overflow: "hidden",
      backgroundImage: "url(/images/hero-grass-texture.jpg)",
      backgroundRepeat: "repeat",
      backgroundSize: "420px auto",
      backgroundAttachment: "fixed",
    }}>
      {/* Dark wash so the white text stays legible over the photo */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,9,0.82)" }} />
      <p style={{ position: "relative", color: "#fff", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: 1.3, marginBottom: 28, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
        {text}
      </p>
      <button
        onClick={openQuoteModal}
        style={{ position: "relative", background: GRASS, color: "#fff", border: "none", borderRadius: 4, padding: "16px 36px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#5a8420")}
        onMouseLeave={e => (e.currentTarget.style.background = GRASS)}
      >
        Get a Free Quote <ArrowRight size={16} />
      </button>
    </section>
  );
}
