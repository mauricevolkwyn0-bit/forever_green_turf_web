import type { Metadata } from "next";
import Nav from "../components/Nav";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ForeverGreenTurf",
  description:
    "How ForeverGreenTurf collects, uses, and protects your personal information in line with POPIA.",
};

export default function PrivacyPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav transparentOnTop={false} />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}
