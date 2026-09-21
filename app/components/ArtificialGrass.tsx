"use client";

import {
  Ruler, PawPrint, Shovel, Layers, Droplets, Scissors, Wind, Home, Building2,
} from "lucide-react";
import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY, SLOGAN } from "./theme";
import { ServiceHero, FeatureGrid, ServiceNote, ServiceCTA } from "./ServicePageSections";
import FadeInSection from "./FadeInSection";

const PILE_HEIGHTS = ["20mm", "25mm", "30mm", "35mm"];

const FEATURES = [
  { icon: PawPrint, title: "Pet-Friendly Options", desc: "Durable, easy-to-clean artificial grass ranges built to handle pets and heavy family use." },
  { icon: Home, title: "Turf Supply Only", desc: "Prefer to install it yourself? We supply quality artificial grass rolls without installation." },
  { icon: Shovel, title: "Ground Preparation", desc: "Proper excavation and levelling so your lawn sits flat, drains well, and lasts for years." },
  { icon: Layers, title: "Weed Membrane", desc: "A weed membrane laid beneath every installation to keep the surface clean long-term." },
  { icon: Ruler, title: "Sub-Base Preparation", desc: "Sub-base preparation where required, for a stable, even foundation under the turf." },
  { icon: Scissors, title: "Edging & Finishing", desc: "Clean, precise edging and finishing for a neat, professional-looking result." },
  { icon: Droplets, title: "Silica Sand Infill", desc: "Silica sand infill where appropriate, to support the blades and improve durability." },
  { icon: Wind, title: "Drainage", desc: "Installations designed with proper drainage in mind, so water never pools on the surface." },
  { icon: Building2, title: "Residential & Commercial", desc: "From family gardens to commercial properties and developments, sized to the job." },
];

export default function ArtificialGrass() {
  return (
    <>
      <ServiceHero
        eyebrow="Artificial Grass Installers Cape Town"
        title="Artificial Grass Supply & Installation"
        intro="Professional artificial grass solutions for homes and businesses across Cape Town and surrounding areas, from supply-only to full installation. Excellence is our core business."
      />

      {/* Pile heights */}
      <FadeInSection>
        <section style={{ background: "#fff", padding: "64px 24px", fontFamily: FONT_BODY }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Pile Height Options</span>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(26px, 3vw, 36px)", color: FOREST, marginTop: 10, marginBottom: 32 }}>
              A Range to Suit Every Space
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="pile-grid">
              {PILE_HEIGHTS.map(h => (
                <div key={h} style={{ border: `1px solid rgba(42,74,25,0.15)`, borderRadius: 6, padding: "28px 12px" }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 28, color: FOREST }}>{h}</div>
                  <div style={{ fontSize: 12, color: STONE, marginTop: 4 }}>Pile Height</div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 640px) { .pile-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
        </section>
      </FadeInSection>

      <FadeInSection>
        <FeatureGrid
          heading="Supply, Preparation & Installation"
          subheading="Every artificial grass project includes the preparation work that makes it last — not just the roll of grass on top."
          items={FEATURES}
        />
      </FadeInSection>

      <FadeInSection>
        <ServiceNote text={`We prefer to assess and measure your site in person before providing a final quotation, so the price and plan reflect exactly what your space needs. ${SLOGAN}`} />
      </FadeInSection>

      <FadeInSection><ServiceCTA text="Ready for a lawn that never needs mowing?" /></FadeInSection>
    </>
  );
}
