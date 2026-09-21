"use client";

import { Sprout, Shovel, Leaf, Droplets, Blocks, TreePine } from "lucide-react";
import { SLOGAN } from "./theme";
import { ServiceHero, FeatureGrid, ServiceNote, ServiceCTA } from "./ServicePageSections";
import FadeInSection from "./FadeInSection";

const FEATURES = [
  { icon: Sprout, title: "Garden Transformations", desc: "Practical, lasting transformations that turn an unused garden into outdoor space you'll actually use." },
  { icon: Shovel, title: "Garden Preparation", desc: "Clearing, levelling, and preparing the ground properly before any new work begins." },
  { icon: Leaf, title: "Artificial Grass Integration", desc: "Artificial grass worked into your garden layout alongside beds, paving, and paths." },
  { icon: Droplets, title: "Irrigation", desc: "Irrigation solutions that keep the rest of your garden healthy with minimal upkeep." },
  { icon: Blocks, title: "Retaining Blocks", desc: "Retaining block walls for sloped or uneven properties, built to hold their line." },
  { icon: TreePine, title: "General Landscaping", desc: "General landscaping solutions for residential and commercial properties, start to finish." },
];

export default function Landscaping() {
  return (
    <>
      <ServiceHero
        eyebrow="Landscaping Cape Town"
        title="Practical Landscaping Solutions"
        intro="We focus on practical outdoor improvement, not design for its own sake — garden transformations, preparation, and landscaping across Cape Town and surrounding areas."
      />

      <FadeInSection>
        <FeatureGrid
          heading="Our Landscaping Services"
          subheading="From ground preparation to the finished garden, every landscaping project is built around how the space will actually be used."
          items={FEATURES}
        />
      </FadeInSection>

      <FadeInSection>
        <ServiceNote text={`Whether it's a full garden transformation or a single area that needs work, we assess your site before providing a final quotation. ${SLOGAN}`} />
      </FadeInSection>

      <FadeInSection><ServiceCTA text="Ready to make your garden work for you?" /></FadeInSection>
    </>
  );
}
