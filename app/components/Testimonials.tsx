import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY, BRAND } from "./theme";
import ReviewCarousel, { type ReviewItem } from "./ReviewCarousel";
import { getGoogleReviews } from "../lib/googleReviews";

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

        <ReviewCarousel items={items} />

        {googleReviews && (
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: STONE }}>
            Reviews sourced live from Google
          </div>
        )}
      </div>
    </section>
  );
}
