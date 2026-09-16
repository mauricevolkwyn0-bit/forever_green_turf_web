import type { Metadata } from "next";
import Nav from "../components/Nav";
import About from "../components/About";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us | ForeverGreenTurf",
  description:
    "Learn about ForeverGreenTurf — a Cape Town lawn installation and paving company built on craft and grounded in quality since 2012.",
};

export default function AboutPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav transparentOnTop={false} />
      <About />
      <Footer />
    </div>
  );
}
