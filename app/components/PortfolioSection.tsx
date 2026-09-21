import Portfolio from "./Portfolio";
import { getPortfolioItems } from "../lib/portfolio";

export default async function PortfolioSection({
  showFilters = true, compact = false, limit, initialFilter, initialPileHeight,
}: {
  showFilters?: boolean; compact?: boolean; limit?: number;
  initialFilter?: "all" | "lawn" | "paving" | "garden"; initialPileHeight?: string;
}) {
  const items = await getPortfolioItems();
  return (
    <Portfolio
      // Remounts (resetting internal filter state) whenever the deep-link
      // params change, e.g. browser back/forward between two
      // /portfolio?pileHeight=... URLs.
      key={`${initialFilter ?? "all"}-${initialPileHeight ?? ""}`}
      showFilters={showFilters}
      items={items ?? undefined}
      compact={compact}
      limit={limit}
      initialFilter={initialFilter}
      initialPileHeight={initialPileHeight}
    />
  );
}
