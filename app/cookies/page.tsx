import type { Metadata } from "next";
import Nav from "../components/Nav";
import CookiePolicy from "../components/CookiePolicy";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | ForeverGreenTurf",
  description:
    "How ForeverGreenTurf uses cookies and similar browser storage, and how to manage your preferences.",
};

export default function CookiesPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav transparentOnTop={false} />
      <CookiePolicy />
      <Footer />
    </div>
  );
}
