import type { Metadata } from "next";
import Nav from "../components/Nav";
import About from "../components/About";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection";

export const metadata: Metadata = {
  title: "About Us | ForeverGreenTurf",
  description:
    "Learn about ForeverGreenTurf — Cape Town artificial grass, paving and landscaping specialists built on craft and grounded in quality since 2012.",
};

export default function AboutPage() {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <FadeInSection><About /></FadeInSection>
      <FadeInSection><Footer /></FadeInSection>
    </div>
  );
}
