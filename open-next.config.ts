import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

export default {
  // A persistent cache (Workers KV) plus a revalidation queue are what make
  // `revalidate` work on Cloudflare. Without them, pages like the homepage stay
  // frozen at their build-time render — built without runtime secrets, so the
  // Google reviews never load. See https://opennext.js.org/cloudflare/caching
  ...defineCloudflareConfig({
    incrementalCache: kvIncrementalCache,
    queue: memoryQueue,
  }),
  // OpenNext runs `npm run build` by default, but that script is itself the
  // OpenNext build (so Cloudflare's default "npm run build" build command
  // produces the Worker) — call Next directly to avoid recursing.
  buildCommand: "npx next build",
};
