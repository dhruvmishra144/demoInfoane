import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { siteSchema } from "@/lib/schema";
import {
  getCollectionOrFallback,
  getSettingsOrFallback,
} from "@/server/content/with-fallback";
import {
  serviceFallback,
  industryFallback,
  settingsFallback,
} from "@/server/content/static-fallback";

/**
 * Layout for the public marketing site.
 *
 * Everything specific to the public site lives here rather than in the root
 * layout, so the admin panel shares only <html>/<body> and the stylesheet — no
 * marketing header, no site-wide JSON-LD, and none of that markup shipped to
 * logged-in editors.
 *
 * Settings/services/industries are fetched once here and handed down to the
 * header, footer and JSON-LD — every public page shares this one layout, so
 * fetching them per-page would just repeat the same three D1 reads.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sequential: D1's remote build-time connection only tolerates one session
  // at a time (see next.config.ts's `experimental.cpus: 1` for the other half
  // of this fix).
  const settings = await getSettingsOrFallback(settingsFallback);
  const services = await getCollectionOrFallback("service", serviceFallback);
  const industries = await getCollectionOrFallback("industry", industryFallback);

  return (
    <>
      {/* Organization + WebSite, emitted once so every public page carries them.
          Per-page nodes (WebPage, BreadcrumbList, Service, FAQPage) reference
          these by @id from within each page. */}
      <JsonLd data={siteSchema(settings, services)} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader services={services} industries={industries} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} services={services} />
    </>
  );
}
