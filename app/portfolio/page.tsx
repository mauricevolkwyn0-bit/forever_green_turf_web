import type { Metadata } from "next";
import Nav from "../components/Nav";
import PortfolioSection from "../components/PortfolioSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | ForeverGreenTurf",
  description:
    "Browse recent ForeverGreenTurf artificial grass, paving, and landscaping projects across Cape Town and surrounding areas.",
};

export default function PortfolioPage() {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
