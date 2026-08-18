import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { siteSchema } from "@/lib/schema";

/**
 * Layout for the public marketing site.
 *
 * Everything specific to the public site lives here rather than in the root
 * layout, so the admin panel shares only <html>/<body> and the stylesheet — no
 * marketing header, no site-wide JSON-LD, and none of that markup shipped to
 * logged-in editors.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Organization + WebSite, emitted once so every public page carries them.
          Per-page nodes (WebPage, BreadcrumbList, Service, FAQPage) reference
          these by @id from within each page. */}
      <JsonLd data={siteSchema()} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
