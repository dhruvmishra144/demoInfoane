import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";
import { servicePages } from "@/content/services";
import { industriesPage } from "@/content/pages";
import {
  primaryNav,
  routes,
  serviceHref,
  type NavItem,
} from "@/lib/routes";

/**
 * Floating pill header.
 *
 * The bar itself is a rounded pill, but — as requested — it and its mega panel
 * are both constrained to `container-x` rather than spanning the viewport, so the
 * header lines up with every section below it.
 *
 * Server component: it assembles the nav data (services and industries pulled
 * from the content files) and hands it to the client component that owns the
 * interaction.
 */
export function SiteHeader() {
  const items: NavItem[] = primaryNav.map((item) => {
    if (item.label === "Services") {
      // Six services split across two columns, in content order.
      const half = Math.ceil(servicePages.length / 2);
      const toLink = (service: (typeof servicePages)[number]) => ({
        label: service.title,
        href: serviceHref(service.slug),
        description: service.navDescription,
      });
      return {
        ...item,
        columns: [
          { heading: "Build & modernise", links: servicePages.slice(0, half).map(toLink) },
          { heading: "Data, AI & teams", links: servicePages.slice(half).map(toLink) },
        ],
      };
    }

    if (item.label === "Industries") {
      const half = Math.ceil(industriesPage.detail.length / 2);
      const toLink = (industry: (typeof industriesPage.detail)[number]) => ({
        label: industry.name,
        href: `${routes.industries}#${industry.slugId}`,
        description: industry.focus[0],
      });
      return {
        ...item,
        columns: [
          { heading: "Regulated sectors", links: industriesPage.detail.slice(0, half).map(toLink) },
          { heading: "Operations & product", links: industriesPage.detail.slice(half).map(toLink) },
        ],
      };
    }

    return item;
  });

  return (
    <header className="sticky top-0 z-50 pt-4 lg:pt-5">
      <div className="container-x relative">
        <div className="flex items-center justify-between gap-6 rounded-full border border-ink-200/80 bg-white/85 py-2.5 pl-5 pr-2.5 shadow-lg shadow-brand-950/5 backdrop-blur-xl lg:pl-6">
          <Logo />
          <SiteNav items={items} />
        </div>
      </div>
    </header>
  );
}
