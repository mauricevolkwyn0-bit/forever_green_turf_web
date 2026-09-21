"use client";

import { Car, Square, Footprints, Grid3x3, SquareStack, Waves, Ruler, Shovel, Trash2 } from "lucide-react";
import { SLOGAN } from "./theme";
import { ServiceHero, FeatureGrid, ServiceNote, ServiceCTA } from "./ServicePageSections";
import FadeInSection from "./FadeInSection";

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

      <FadeInSection>
        <FeatureGrid
          heading="Our Paving Services"
          subheading="Every paving project starts with proper preparation and finishes with clean, precise edging — the details that make paving last."
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
