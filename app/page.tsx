import LandingPage from "./components/LandingPage";
import Testimonials from "./components/Testimonials";

// The build runs without the Google Places secrets, so getGoogleReviews()
// returns before its fetch and Next sees no revalidate hint — it would then
// freeze the homepage forever with the placeholder testimonials. An explicit
// interval makes Cloudflare re-render it at runtime, where the secrets exist.
// The Places call itself stays cached for an hour (see googleReviews.ts).
export const revalidate = 300;

export default function Home() {
  return <LandingPage testimonials={<Testimonials />} />;
}
