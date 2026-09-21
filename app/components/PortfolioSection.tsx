import Portfolio from "./Portfolio";
import { getPortfolioItems } from "../lib/portfolio";

export default async function PortfolioSection({
  showFilters = true, compact = false, limit, initialFilter, initialPileHeight, initialPavingType,
}: {
  showFilters?: boolean; compact?: boolean; limit?: number;
  initialFilter?: "all" | "lawn" | "paving" | "garden"; initialPileHeight?: string; initialPavingType?: string;
}) {
  const items = await getPortfolioItems();
  return (
    <Portfolio
      // Remounts (resetting internal filter state) whenever the deep-link
      // params change, e.g. browser back/forward between two
      // /portfolio?pileHeight=... or ?pavingType=... URLs.
      key={`${initialFilter ?? "all"}-${initialPileHeight ?? ""}-${initialPavingType ?? ""}`}
      showFilters={showFilters}
      items={items ?? undefined}
      compact={compact}
      limit={limit}
      initialFilter={initialFilter}
      initialPileHeight={initialPileHeight}
      initialPavingType={initialPavingType}
    />
  );
}
