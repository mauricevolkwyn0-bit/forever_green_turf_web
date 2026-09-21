export const FOREST = "#2A4A19";
export const GRASS = "#6B9B2A";
export const CREAM = "#F2EDE3";
export const STONE = "#6B6251";

export const FONT_DISPLAY = "var(--font-playfair-display), Georgia, serif";
export const FONT_BODY = "var(--font-dm-sans), system-ui, sans-serif";

export const BRAND = "Forever Green Turf";
export const SLOGAN = "Excellence is our core business.";

export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=141+King+Edward+St%2C+Parow%2C+Cape+Town%2C+7500";

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
