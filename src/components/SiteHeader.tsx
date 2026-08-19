import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";
import { routes, serviceHref, type NavColumn, type NavItem } from "@/lib/routes";
import type { CollectionData } from "@/server/content/schemas";

type ServiceLink = { slug: string; title: string; navDescription: string };
type IndustryLink = { slug: string; name: string; focus: string[] };
type NavMenu = CollectionData["navMenu"];
type HeaderSettings = CollectionData["settings"]["header"];

/**
 * Floating pill header.
 *
 * The bar itself is a rounded pill, but — as requested — it and its mega panel
 * are both constrained to `container-x` rather than spanning the viewport, so the
 * header lines up with every section below it.
 *
 * Server component: it assembles the nav data and hands it to the client
 * component that owns the interaction.
 *
 * Structure comes from the `header` nav menu in D1. Service and industry links
 * are still generated from their own collections rather than stored as nav rows,
 * because those are the two menus that must never go stale — adding a service
 * should put it in the menu without anyone remembering to.
 */
export function SiteHeader({
  services,
  industries,
  menu,
  header,
  brandName,
}: {
  services: ServiceLink[];
  industries: IndustryLink[];
  menu: NavMenu;
  header: HeaderSettings;
  brandName: string;
}) {
  /** Splits a generated list into the header's two-column panel layout. */
  function twoColumns<T>(
    entries: T[],
    primaryHeading: string,
    secondaryHeading: string,
    toLink: (entry: T) => { label: string; href: string; description: string },
  ): NavColumn[] {
    const half = Math.ceil(entries.length / 2);
    return [
      { heading: primaryHeading, links: entries.slice(0, half).map(toLink) },
      { heading: secondaryHeading, links: entries.slice(half).map(toLink) },
    ];
  }

  /** Editor-authored children of a trigger, grouped into their columns. */
  function manualColumns(parentLabel: string): NavColumn[] {
    const children = menu.items.filter((item) => item.parent === parentLabel);
    const order: string[] = [];
    const byGroup = new Map<string, NavColumn["links"]>();

    for (const child of children) {
      const heading = child.group;
      if (!byGroup.has(heading)) {
        byGroup.set(heading, []);
        order.push(heading);
      }
      byGroup.get(heading)!.push({
        label: child.label,
        href: child.href,
        description: child.description || undefined,
      });
    }

    return order.map((heading) => ({ heading, links: byGroup.get(heading)! }));
  }

  const feature = header.promoHeading
    ? {
        heading: header.promoHeading,
        body: header.promoBody,
        href: header.promoCtaHref || routes.contact,
        cta: header.promoCtaLabel,
      }
    : undefined;

  const items: NavItem[] = menu.items
    .filter((item) => !item.parent)
    .map((item) => {
      const manual = manualColumns(item.label);

      if (item.href === routes.services) {
        return {
          label: item.label,
          href: item.href,
          columns: [
            ...twoColumns(
              services,
              header.serviceGroupPrimary,
              header.serviceGroupSecondary,
              (service) => ({
                label: service.title,
                href: serviceHref(service.slug),
                description: service.navDescription,
              }),
            ),
            ...manual,
          ],
          feature,
        };
      }

      if (item.href === routes.industries) {
        return {
          label: item.label,
          href: item.href,
          columns: [
            ...twoColumns(
              industries,
              header.industryGroupPrimary,
              header.industryGroupSecondary,
              (industry) => ({
                label: industry.name,
                href: `${routes.industries}#${industry.slug}`,
                description: industry.focus[0],
              }),
            ),
            ...manual,
          ],
        };
      }

      return {
        label: item.label,
        href: item.href,
        // No children means a plain link rather than a mega-menu trigger.
        ...(manual.length > 0 ? { columns: manual } : {}),
      };
    });

  return (
    <header className="sticky top-0 z-50 pt-4 lg:pt-5">
      <div className="container-x relative">
        <div className="flex items-center justify-between gap-6 rounded-full border border-ink-200/80 bg-white/85 py-2.5 pl-5 pr-2.5 shadow-lg shadow-brand-950/5 backdrop-blur-xl lg:pl-6">
          <Logo name={brandName} />
          <SiteNav items={items} ctaLabel={header.ctaLabel} />
        </div>
      </div>
    </header>
  );
}
