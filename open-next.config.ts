import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig({}),
  // OpenNext runs `npm run build` by default, but that script is itself the
  // OpenNext build (so Cloudflare's default "npm run build" build command
  // produces the Worker) — call Next directly to avoid recursing.
  buildCommand: "npx next build",
};
