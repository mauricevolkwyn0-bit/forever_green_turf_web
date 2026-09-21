import type { Metadata } from "next";
import Nav from "../components/Nav";
import ArtificialGrass from "../components/ArtificialGrass";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Artificial Grass Installation Cape Town | ForeverGreenTurf",
  description:
    "Artificial grass supply and installation in Cape Town. Pet-friendly options, 20mm-35mm pile heights, ground preparation, and turf-only supply for residential and commercial properties.",
};

export default function ArtificialGrassPage() {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <ArtificialGrass />
      <Footer />
    </div>
  );
}
