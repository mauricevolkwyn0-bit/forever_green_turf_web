import type { Metadata } from "next";
import Nav from "../components/Nav";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | ForeverGreenTurf",
  description:
    "Get in touch with ForeverGreenTurf for a free quote on lawn installation, paving, and garden design across Cape Town and nearby areas.",
};

export default function ContactPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav transparentOnTop={false} />
      <Contact />
      <Footer />
    </div>
  );
}
