"use client";

import Image from "next/image";
import Link from "next/link";
import { Car, Square, Footprints, Grid3x3, SquareStack, Waves, Ruler, Shovel, Trash2 } from "lucide-react";
import { FOREST, GRASS, FONT_DISPLAY, FONT_BODY, SLOGAN } from "./theme";
import { ServiceHero, FeatureGrid, ServiceNote, ServiceCTA } from "./ServicePageSections";
import FadeInSection from "./FadeInSection";
import { normalizePavingType } from "./Portfolio";

const PAVING_TYPES = [
  { label: "Cement Bond Paving", image: "paving-cement-bond.jpg" },
  { label: "Block Paving", image: "paving-block.jpg" },
  { label: "Cobblestone Paving", image: "paving-cobblestone.jpg" },
  { label: "Wheatstone Paving", image: "paving-wheatstone.jpg" },
];

const FEATURES = [
  { icon: Car, title: "Driveway Paving", desc: "Durable, precision-laid driveways engineered for heavy load and lasting kerb appeal." },
  { icon: Square, title: "Patio Paving", desc: "Neatly laid patios built for everyday outdoor living and entertaining." },
  { icon: Footprints, title: "Walkways", desc: "Level, well-finished walkways and pathways around your home or property." },
  { icon: Grid3x3, title: "Block & Bond Paving", desc: "Handcrafted block and bond paving patterns in clay and concrete brick." },
  { icon: SquareStack, title: "Cobblestone Paving", desc: "Cobblestone paving for a classic, textured finish that ages beautifully." },
  { icon: Waves, title: "Pool Surrounds", desc: "Slip-conscious, precisely laid paving around pool areas." },
  { icon: Ruler, title: "Kerbs & Edging", desc: "Clean kerbs and edging that frame the finished paving and keep it in place." },
  { icon: Shovel, title: "Paving Preparation", desc: "Correct base preparation and compaction so your paving stays level for years." },
  { icon: Trash2, title: "Removal of Existing Material", desc: "Removal of old paving, rubble, or surfaces where required before work begins." },
];

export default function Paving() {
  return (
    <>
      <ServiceHero
        eyebrow="Paving Contractors in Cape Town"
        title="Paving Contractors in Cape Town"
        intro="From driveways to pool surrounds, we design, prepare, and lay paving built to last across Cape Town and surrounding areas."
      />

      {/* Paving types */}
      <FadeInSection>
        <section style={{ background: "#fff", padding: "64px 24px", fontFamily: FONT_BODY }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Paving Type Options</span>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(26px, 3vw, 36px)", color: FOREST, marginTop: 10, marginBottom: 32 }}>
              A Style to Suit Every Property
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="paving-type-grid">
              {PAVING_TYPES.map(t => (
                <Link
                  key={t.label}
                  href={`/portfolio?category=paving&pavingType=${normalizePavingType(t.label)}`}
                  style={{ display: "block", border: `1px solid rgba(42,74,25,0.15)`, borderRadius: 6, overflow: "hidden", textDecoration: "none" }}
                >
                  <div style={{ position: "relative", width: "100%", height: 130 }}>
                    <Image
                      src={`/images/${t.image}`}
                      alt={`${t.label} sample`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                  <div style={{ padding: "16px 12px" }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16, color: FOREST, lineHeight: 1.3 }}>{t.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 640px) { .paving-type-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
        </section>
      </FadeInSection>

      <FadeInSection>
        <FeatureGrid
          heading="Our Paving Services"
          subheading="Every paving project starts with proper preparation and finishes with clean, precise edging, the details that make paving last."
          items={FEATURES}
        />
      </FadeInSection>

      <FadeInSection>
        <ServiceNote text={`Whether it's a new driveway, a full patio alteration, or removing an old surface to start fresh, we assess your site before providing a final quotation. ${SLOGAN}`} />
      </FadeInSection>

      <FadeInSection><ServiceCTA text="Ready to upgrade your driveway, patio, or pool area?" /></FadeInSection>
    </>
  );
}
