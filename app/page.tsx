import LandingPage from "./components/LandingPage";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return <LandingPage testimonials={<Testimonials />} />;
}
