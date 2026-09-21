import type { Metadata } from "next";
import Nav from "../components/Nav";
import Landscaping from "../components/Landscaping";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Landscaping Cape Town | ForeverGreenTurf",
  description:
    "Landscaping in Cape Town: garden transformations, garden preparation, artificial grass integration, irrigation, and retaining blocks for residential and commercial properties.",
};

export default function LandscapingPage() {
  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <Landscaping />
      <Footer />
    </div>
  );
}
