import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Served at /robots.txt.
 *
 * Note this allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot and friends) by
 * omission — for a B2B services company, being citable in AI answers is usually
 * worth more than blocking the crawl. If you would rather opt out, add explicit
 * `userAgent` blocks with `disallow: "/"` here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing crawlable lives under these; keeps crawl budget on content.
        // /admin is also noindexed and behind authentication — robots.txt is a
        // courtesy to crawlers, never a security control.
        disallow: ["/admin", "/api/", "/_next/static/chunks/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
