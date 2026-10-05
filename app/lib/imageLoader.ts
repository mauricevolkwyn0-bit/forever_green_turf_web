"use client";

// Custom next/image loader (wired up in next.config.ts) that replaces Vercel's
// built-in Image Optimization, which is metered and returns 402 Payment
// Required once the plan's monthly allowance runs out — breaking every image
// size that hadn't already been cached.
//
//   - Unsplash: resized by Unsplash's own CDN via its w/q URL params.
//   - Remote images (the GCS portfolio bucket): resized and converted to WebP
//     by wsrv.nl, a free open-source image CDN. Matters most when staff upload
//     full-size phone photos to the bucket.
//   - Local /public images: served as-is. They're already web-sized, and
//     wsrv.nl can't reach them during local dev. The ?w= param is ignored by
//     the static file server but keeps each srcset entry distinct.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const q = quality || 75;

  if (src.startsWith("/")) {
    return `${src}?w=${width}`;
  }

  const url = new URL(src);

  if (url.hostname === "images.unsplash.com") {
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(q));
    url.searchParams.set("auto", "format");
    // A fixed height alongside a varying width would change the crop's aspect
    // ratio per srcset size; the components use objectFit: cover anyway.
    url.searchParams.delete("h");
    return url.toString();
  }

  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&q=${q}&output=webp`;
}
