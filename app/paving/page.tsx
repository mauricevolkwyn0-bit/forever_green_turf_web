import type { Metadata } from "next";
import Nav from "../components/Nav";
import Paving from "../components/Paving";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Paving Contractors in Cape Town | ForeverGreenTurf",
  description:
    "Paving contractors in Cape Town for driveways, patios, walkways, block, bond and cobblestone paving, pool surrounds, and kerbs and edging. Proper preparation, precise installation.",
};

export default function PavingPage() {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <Paving />
      <Footer />
    </div>
  );
}
