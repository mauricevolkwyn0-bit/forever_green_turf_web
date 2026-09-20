import Portfolio from "./Portfolio";
import { getPortfolioItems } from "../lib/portfolio";

export default async function PortfolioSection({ showFilters = true, compact = false }: { showFilters?: boolean; compact?: boolean }) {
  const items = await getPortfolioItems();
  return <Portfolio showFilters={showFilters} items={items ?? undefined} compact={compact} />;
}
