import type { MetadataRoute } from "next";
import { absolute, routes, serviceHref } from "@/lib/routes";
import { getCollectionOrFallback } from "@/server/content/with-fallback";
import { serviceFallback } from "@/server/content/static-fallback";

/**
 * Served at /sitemap.xml.
 *
 * Generated from the same route definitions the navigation uses, so a link and
 * its sitemap entry cannot drift apart. Two rules:
 *
 *  1. Only URLs that return 200 are listed. Listing pages you have not built is
 *     a common own-goal — Search Console reports them as errors and trust in the
 *     whole sitemap drops.
 *  2. Noindexed pages are excluded. Asking a crawler to index a page you have
 *     told it not to index is a contradictory signal.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const servicePages = await getCollectionOrFallback("service", serviceFallback);

  return [
    {
      url: absolute(routes.home),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absolute(routes.services),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Service pages are the commercial landing pages, so they rank above the
    // rest of the site in priority.
    ...servicePages.map((service) => ({
      url: absolute(serviceHref(service.slug)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absolute(routes.industries),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absolute(routes.technology),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absolute(routes.caseStudies),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absolute(routes.about),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: absolute(routes.contact),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: absolute(routes.careers),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    // /privacy-policy and /terms are intentionally absent: both are noindexed
    // until their real text lands. Add them here when that changes.
  ];
}
