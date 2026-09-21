import type { Metadata } from "next";
import Nav from "../components/Nav";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection";

export const metadata: Metadata = {
  title: "Contact Us | ForeverGreenTurf",
  description:
    "Get in touch with ForeverGreenTurf for a free quote on artificial grass, paving, and landscaping across Cape Town and surrounding areas.",
};

export default function ContactPage() {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <FadeInSection><Contact /></FadeInSection>
      <FadeInSection><Footer /></FadeInSection>
    </div>
  );
}
