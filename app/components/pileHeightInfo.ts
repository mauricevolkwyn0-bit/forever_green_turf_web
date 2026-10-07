// Product details shown on /portfolio when it's deep-linked to a single pile
// height (e.g. ?category=lawn&pileHeight=20mm). Keyed by the pile height's
// digits so "20" and "20mm" both match.
export const PILE_HEIGHT_INFO: Record<string, { title: string; description: string; features: string[] }> = {
  "20": {
    title: "20mm Eco Artificial Grass",
    description: "Our 20mm Eco Artificial Grass is a durable, low-maintenance and cost-effective solution for creating a clean, green outdoor space all year round. Designed with a natural appearance and soft feel, it is suitable for residential gardens, patios, balconies, walkways and other landscaping applications.",
    features: [
      "20mm pile height",
      "UV protected for long-lasting colour and performance",
      "ISO-certified quality standards",
      "Durable and weather resistant",
      "Low maintenance and water saving",
      "Easy to clean and maintain",
      "Suitable for outdoor residential and landscaping applications",
    ],
  },
  "25": {
    title: "25mm Artificial Grass",
    description: "Our 25mm Artificial Grass offers an attractive, natural-looking finish with a fuller and softer appearance than shorter-pile options. It is designed for durability, low maintenance and year-round greenery, making it ideal for residential gardens, entertainment areas, patios, balconies and landscaping projects.",
    features: [
      "25mm pile height",
      "UV protected for long-lasting colour",
      "ISO-certified quality standards",
      "Durable and weather resistant",
      "Soft, natural-looking appearance",
      "Low maintenance and water saving",
      "Easy to clean and maintain",
      "Suitable for residential and landscaping applications",
    ],
  },
  "30": {
    title: "30mm Artificial Grass",
    description: "Our 30mm Artificial Grass provides a lush, natural-looking finish with a fuller and softer feel underfoot. Designed for durability and everyday use, it is an excellent choice for gardens, family areas, entertainment spaces and landscaping projects, offering a beautiful green lawn all year round with minimal maintenance.",
    features: [
      "30mm pile height",
      "UV protected for long-lasting colour and performance",
      "ISO-certified quality standards",
      "Durable and weather resistant",
      "Soft, lush and natural-looking appearance",
      "Excellent for residential and high-use areas",
      "Low maintenance and water saving",
      "Easy to clean and maintain",
      "Suitable for gardens, entertainment areas and landscaping applications",
    ],
  },
  "35": {
    title: "35mm Artificial Grass",
    description: "Our 35mm Artificial Grass delivers a premium, lush and natural-looking lawn with a soft, comfortable feel underfoot. Its longer pile creates a fuller appearance while providing excellent durability for everyday family use, entertainment areas and high-quality landscaping projects.",
    features: [
      "35mm pile height",
      "UV protected for long-lasting colour and performance",
      "ISO-certified quality standards",
      "Durable and weather resistant",
      "Premium, lush and natural-looking appearance",
      "Soft and comfortable underfoot",
      "Excellent recovery and resilience",
      "Low maintenance and water saving",
      "Easy to clean and maintain",
      "Ideal for gardens, entertainment areas and premium landscaping",
    ],
  },
};
