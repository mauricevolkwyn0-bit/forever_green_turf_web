import { Star } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY, BRAND } from "./theme";
import { getGoogleReviews } from "../lib/googleReviews";

type ReviewItem = { name: string; stars: number; text: string; meta: string; avatarUrl?: string };

const FALLBACK_TESTIMONIALS: ReviewItem[] = [
  {
    name: "Thembi Dlamini",
    stars: 5,
    text: `${BRAND} transformed our bare yard into something out of a magazine. Professional, clean, and the lawn quality is outstanding. Three years later it still looks immaculate.`,
    meta: "Sandton · Lawn & Garden",
  },
  {
    name: "Pieter van der Merwe",
    stars: 5,
    text: "Got three quotes. These guys weren't cheapest, but the quality of material they proposed was clearly better. Driveway is done beautifully and they finished two days early.",
    meta: "Centurion · Driveway Paving",
  },
  {
    name: "Nadia Botha",
    stars: 5,
    text: "Incredibly neat workmanship. They even re-leveled an existing step at no extra charge. I've had five neighbours ask for the contact details since.",
    meta: "Midrand · Brick Paving Patio",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();
}

export default async function Testimonials() {
  const googleReviews = await getGoogleReviews();

  const items: ReviewItem[] = googleReviews
    ? googleReviews.map(r => ({
        name: r.name,
        stars: r.stars,
        text: r.text,
        meta: r.relativeTime,
        avatarUrl: r.avatarUrl,
      }))
    : FALLBACK_TESTIMONIALS;

  return (
    <section style={{ background: "#fff", padding: "40px 24px 100px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Client Reviews</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            What Our Clients Say
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="testimonial-grid">
          {items.map((t, i) => (
            <div key={i} style={{ background: CREAM, borderRadius: 4, padding: "36px 32px", border: `1px solid rgba(42,74,25,0.08)` }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {Array(t.stars).fill(null).map((_, j) => (
                  <Star key={j} size={14} color={GRASS} fill={GRASS} />
                ))}
              </div>
              <p style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 17, color: FOREST, lineHeight: 1.65, marginBottom: 28 }}>
                &quot;{t.text}&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid rgba(42,74,25,0.1)`, paddingTop: 20 }}>
                {t.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatarUrl} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
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

        {googleReviews && (
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: STONE }}>
            Reviews sourced live from Google
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px)  { .testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .testimonial-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
