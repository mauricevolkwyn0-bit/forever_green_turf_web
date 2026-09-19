import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // PDFKit reads font-metric (.afm) files from disk at runtime even for its
    // built-in fonts, and the logo is read via fs in the quote PDF route —
    // neither is picked up by the default serverless file trace.
    "/api/quote-request/route": [
      "./node_modules/pdfkit/js/data/**/*",
      "./public/logo.png",
    ],
  },
};

export default nextConfig;
