import type { Metadata } from "next";
import Nav from "../components/Nav";
import PortfolioSection from "../components/PortfolioSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | ForeverGreenTurf",
  description:
    "Browse recent ForeverGreenTurf artificial grass, paving, and landscaping projects across Cape Town and surrounding areas.",
};

const VALID_CATEGORIES = new Set(["lawn", "paving", "garden"]);

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawCategory = typeof params.category === "string" ? params.category : undefined;
  const initialFilter = rawCategory && VALID_CATEGORIES.has(rawCategory) ? (rawCategory as "lawn" | "paving" | "garden") : undefined;
  const initialPileHeight = typeof params.pileHeight === "string" ? params.pileHeight : undefined;
  const initialPavingType = typeof params.pavingType === "string" ? params.pavingType : undefined;

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Nav transparentOnTop={false} />
      <PortfolioSection initialFilter={initialFilter} initialPileHeight={initialPileHeight} initialPavingType={initialPavingType} />
      <Footer />
    </div>
  );
}
