import LandingPage from "./components/LandingPage";
import Testimonials from "./components/Testimonials";
import PortfolioSection from "./components/PortfolioSection";

export default function Home() {
  return <LandingPage testimonials={<Testimonials />} portfolio={<PortfolioSection showFilters={false} />} />;
}
