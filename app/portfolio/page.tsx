import type { Metadata } from "next";
import Nav from "../components/Nav";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | ForeverGreenTurf",
  description:
    "Browse recent ForeverGreenTurf lawn installation, paving, and garden design projects across Cape Town and nearby areas.",
};

export default function PortfolioPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav transparentOnTop={false} />
      <Portfolio />
      <Footer />
    </div>
  );
}
