import type { Metadata } from "next";
import Nav from "../components/Nav";
import PortfolioSection from "../components/PortfolioSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | ForeverGreenTurf",
  description:
    "Browse recent ForeverGreenTurf artificial grass installation, paving, and garden design projects across Cape Town and nearby areas.",
};

export default function PortfolioPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav transparentOnTop={false} />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
