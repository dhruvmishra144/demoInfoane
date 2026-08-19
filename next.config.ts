import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Emit trailing-slash-free canonical URLs so the sitemap, canonical tags and
  // real URLs all agree — duplicate-URL variants are a common SEO leak.
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Static generation now queries D1 for content. The remote D1 connection
    // used during `next build` only tolerates one session at a time — more
    // than one worker process hitting it concurrently throws SQLITE_BUSY.
    // Forcing single-worker generation trades build speed for reliability.
    cpus: 1,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

/**
 * Gives `next dev` access to the Cloudflare bindings declared in wrangler.jsonc
 * (local D1 and R2), so the same data layer works in development and in
 * production. Must be called at the end of this file.
 *
 * Guarded to development on purpose: it spins up a local Workers runtime and a
 * dev registry, which a production `next build` has no use for. Calling it
 * unconditionally makes the build depend on dev-only machinery being able to
 * start — and fail when it cannot.
 */
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
