"use client";

import { useState } from "react";
import Image from "next/image";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";

type PortfolioTag = "lawn" | "paving" | "garden";
type PortfolioFilter = "all" | PortfolioTag;

export type PortfolioEntry = { id: string | number; tag: PortfolioTag; title: string; img: string };

const TAG_LABELS: Record<PortfolioTag, string> = {
  lawn: "Artificial Grass",
  paving: "Paving",
  garden: "Gardens",
};

// Shown until the Google Sheet-backed items load (see app/lib/portfolio.ts) or
// if that sheet isn't configured.
const FALLBACK_PORTFOLIO: PortfolioEntry[] = [
  { id: 1, tag: "lawn",   title: "Sandton Residential",     img: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=800&h=600&fit=crop&auto=format" },
  { id: 2, tag: "paving", title: "Rosebank Driveway",       img: "https://images.unsplash.com/photo-1780216200639-47d28549d04e?w=600&h=400&fit=crop&auto=format" },
  { id: 3, tag: "garden", title: "Midrand Garden Suite",    img: "https://images.unsplash.com/photo-1777454765997-8a4a6b98f760?w=600&h=400&fit=crop&auto=format" },
  { id: 4, tag: "paving", title: "Centurion Courtyard",     img: "https://images.unsplash.com/photo-1702308632273-711147c3e648?w=600&h=500&fit=crop&auto=format" },
  { id: 5, tag: "lawn",   title: "Bryanston Estate",        img: "https://images.unsplash.com/photo-1597201278257-3687be27d954?w=600&h=400&fit=crop&auto=format" },
  { id: 6, tag: "garden", title: "Fourways Patio Garden",   img: "https://images.unsplash.com/photo-1771479452302-19a1849c0e25?w=600&h=400&fit=crop&auto=format" },
];

export default function Portfolio({ showFilters = true, items, compact = false }: { showFilters?: boolean; items?: PortfolioEntry[]; compact?: boolean }) {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const filters: { id: PortfolioFilter; label: string }[] = [
    { id: "all",    label: "All Projects" },
    { id: "lawn",   label: TAG_LABELS.lawn },
    { id: "paving", label: TAG_LABELS.paving },
    { id: "garden", label: TAG_LABELS.garden },
  ];

  const source = items ?? FALLBACK_PORTFOLIO;
  const visible = filter === "all" ? source : source.filter(p => p.tag === filter);

  return (
    <section style={{ background: CREAM, padding: compact ? "48px 24px 100px" : "160px 24px 100px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Our Portfolio</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Recent Projects</h2>
          {/* Filters */}
          {showFilters && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  style={{
                    background: filter === f.id ? FOREST : "transparent",
                    color: filter === f.id ? "#fff" : STONE,
                    border: `1px solid ${filter === f.id ? FOREST : "rgba(42,74,25,0.2)"}`,
                    borderRadius: 100,
                    padding: "8px 18px",
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: 240, gap: 16 }} className="portfolio-grid">
          {visible.map((item, i) => (
            <PortfolioItem key={item.id} item={item} isLarge={filter === "all" && i === 0} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 180px !important; }
        }
        @media (max-width: 500px) {
          .portfolio-grid { grid-template-columns: 1fr !important; grid-auto-rows: 220px !important; }
        }
      `}</style>
    </section>
  );
}

function PortfolioItem({ item, isLarge }: { item: PortfolioEntry; isLarge: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        gridRow: isLarge ? "span 2" : "span 1",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "#2A3A1A",
      }}
    >
      <Image
        src={item.img}
        alt={item.title}
        fill
        sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 500px) 100vw, (max-width: 768px) 50vw, 33vw"}
        style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(42,74,25,0.55)" : "rgba(0,0,0,0.15)", transition: "background 0.3s" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 20px", transform: hovered ? "translateY(0)" : "translateY(4px)", transition: "transform 0.3s" }}>
        <span style={{ display: "inline-block", background: GRASS, color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 2, marginBottom: 6, fontFamily: FONT_BODY }}>
          {TAG_LABELS[item.tag]}
        </span>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: isLarge ? 24 : 16, color: "#fff" }}>{item.title}</div>
      </div>
    </div>
  );
}
