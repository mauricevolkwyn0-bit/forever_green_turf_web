export const FOREST = "#2A4A19";
export const GRASS = "#6B9B2A";
export const CREAM = "#F2EDE3";
export const STONE = "#6B6251";

export const FONT_DISPLAY = "var(--font-playfair-display), Georgia, serif";
export const FONT_BODY = "var(--font-dm-sans), system-ui, sans-serif";

export const BRAND = "ForeverGreenTurf";

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
