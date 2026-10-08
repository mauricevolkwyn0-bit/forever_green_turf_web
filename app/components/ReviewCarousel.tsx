"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";

export type ReviewItem = { name: string; stars: number; text: string; meta: string; avatarUrl?: string };

const GAP = 28;
const AUTOPLAY_MS = 6000;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();
}

// Scroll-snap track: native swipe on touch, arrows/dots on desktop. Auto-
// advances (looping back to the start) unless the visitor is hovering or
// focused inside it, or prefers reduced motion.
export default function ReviewCarousel({ items }: { items: ReviewItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + GAP;
    const perView = Math.max(1, Math.round((el.clientWidth + GAP) / step));
    setPageCount(Math.max(1, items.length - perView + 1));
    setActive(Math.round(el.scrollLeft / step));
  }, [items.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollTo({ left: i * (card.offsetWidth + GAP), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused || pageCount <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => goTo(active + 1 >= pageCount ? 0 : active + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, pageCount, active, goTo]);

  const arrow = (dir: -1 | 1) => {
    const disabled = dir === -1 ? active <= 0 : active >= pageCount - 1;
    const Icon = dir === -1 ? ChevronLeft : ChevronRight;
    return (
      <button
        type="button"
        aria-label={dir === -1 ? "Previous reviews" : "Next reviews"}
        onClick={() => goTo(active + dir)}
        disabled={disabled}
        style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: disabled ? "transparent" : FOREST,
          color: disabled ? "rgba(42,74,25,0.3)" : "#fff",
          border: `1px solid ${disabled ? "rgba(42,74,25,0.15)" : FOREST}`,
          cursor: disabled ? "default" : "pointer",
          transition: "all 0.2s",
        }}
      >
        <Icon size={20} />
      </button>
    );
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <div ref={trackRef} onScroll={measure} className="review-track">
        {items.map((t, i) => (
          <div key={i} className="review-card" style={{ background: CREAM, borderRadius: 4, padding: "36px 32px", border: `1px solid rgba(42,74,25,0.08)`, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 20 }} aria-label={`${t.stars} out of 5 stars`}>
              {Array(t.stars).fill(null).map((_, j) => (
                <Star key={j} size={14} color={GRASS} fill={GRASS} />
              ))}
            </div>
            <p className="review-text" style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 17, color: FOREST, lineHeight: 1.65, marginBottom: 28, flexGrow: 1 }}>
              &quot;{t.text}&quot;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid rgba(42,74,25,0.1)`, paddingTop: 20 }}>
              {t.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.avatarUrl} alt={t.name} referrerPolicy="no-referrer" style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: FOREST, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13, color: "#BFD98F" }}>{initials(t.name)}</span>
                </div>
              )}
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: FOREST }}>{t.name}</div>
                <div style={{ fontSize: 12, color: STONE }}>{t.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 32 }}>
          {arrow(-1)}
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                style={{
                  width: i === active ? 24 : 8, height: 8, borderRadius: 100, padding: 0, border: "none",
                  background: i === active ? GRASS : "rgba(42,74,25,0.2)",
                  cursor: "pointer", transition: "all 0.3s",
                }}
              />
            ))}
          </div>
          {arrow(1)}
        </div>
      )}

      <style>{`
        .review-track {
          display: flex; gap: ${GAP}px; overflow-x: auto; scroll-snap-type: x mandatory;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .review-track::-webkit-scrollbar { display: none; }
        .review-card { flex: 0 0 calc((100% - ${GAP * 2}px) / 3); scroll-snap-align: start; box-sizing: border-box; }
        .review-text { display: -webkit-box; -webkit-line-clamp: 8; -webkit-box-orient: vertical; overflow: hidden; }
        @media (max-width: 900px) { .review-card { flex-basis: calc((100% - ${GAP}px) / 2); } }
        @media (max-width: 600px) { .review-card { flex-basis: 100%; padding: 28px 24px !important; } }
      `}</style>
    </div>
  );
}
