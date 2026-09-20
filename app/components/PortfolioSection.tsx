import Portfolio from "./Portfolio";
import { getPortfolioItems } from "../lib/portfolio";

export default async function PortfolioSection({ showFilters = true }: { showFilters?: boolean }) {
  const items = await getPortfolioItems();
  return <Portfolio showFilters={showFilters} items={items ?? undefined} />;
}
