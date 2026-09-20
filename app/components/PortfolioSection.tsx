import Portfolio from "./Portfolio";
import { getPortfolioItems } from "../lib/portfolio";

export default async function PortfolioSection({ showFilters = true, compact = false, limit }: { showFilters?: boolean; compact?: boolean; limit?: number }) {
  const items = await getPortfolioItems();
  return <Portfolio showFilters={showFilters} items={items ?? undefined} compact={compact} limit={limit} />;
}
