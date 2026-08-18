import { site } from "@/config/site";

/**
 * Single source of truth for the site's URL structure and navigation.
 *
 * The information architecture mirrors the pattern requested (Infoane's):
 * Home · About Us · Services ▾ · Industries · Technology · Careers · Contact Us,
 * with a primary "Enquire Now" call to action. Every route listed here is a real
 * page that returns 200 — the sitemap is generated from this file, so a link and
 * its sitemap entry can never drift apart.
 */

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  technology: "/technology",
  caseStudies: "/case-studies",
  careers: "/careers",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms",
} as const;

export function serviceHref(slug: string): string {
  return `${routes.services}/${slug}`;
}

/** Absolute URLs, for structured data and the sitemap. */
export function absolute(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

export function serviceUrl(slug: string): string {
  return absolute(serviceHref(slug));
}

export function contactHref(): string {
  return routes.contact;
}

export type NavItem = {
  label: string;
  href: string;
  /**
   * Present on mega-menu triggers. The header renders these as columns in one
   * wide panel; the mobile drawer renders them as nested accordions.
   */
  columns?: NavColumn[];
  /** Optional promo card shown at the right of the mega panel. */
  feature?: { heading: string; body: string; href: string; cta: string };
};

export type NavLink = { label: string; href: string; description?: string };
export type NavColumn = { heading: string; links: NavLink[] };

/**
 * Header navigation.
 *
 * Nine destinations are clubbed into three mega-menu triggers plus Home, so the
 * desktop header stays a compact pill and nothing is more than one hover away.
 * Service and industry links are injected by the header from the content files,
 * so adding a service page updates the menu automatically.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  {
    label: "Services",
    href: routes.services,
    columns: [], // filled from content/services.ts
    feature: {
      heading: "Not sure where to start?",
      body: "Describe the problem rather than the solution. We will tell you which service applies — or that you do not need us.",
      href: routes.contact,
      cta: "Book a free consultation",
    },
  },
  {
    label: "Industries",
    href: routes.industries,
    columns: [], // filled from content/pages.ts
  },
  {
    label: "Company",
    href: routes.about,
    columns: [
      {
        heading: "Company",
        links: [
          {
            label: "About Us",
            href: routes.about,
            description: "How we work and who you will work with",
          },
          {
            label: "Case Studies",
            href: routes.caseStudies,
            description: "Problem, approach and measured result",
          },
          {
            label: "Careers",
            href: routes.careers,
            description: "Open roles and how we hire",
          },
        ],
      },
      {
        heading: "Capability",
        links: [
          {
            label: "Technology",
            href: routes.technology,
            description: "Our stack and how we choose it",
          },
          {
            label: "All Services",
            href: routes.services,
            description: "Six practices in one place",
          },
          {
            label: "Contact Us",
            href: routes.contact,
            description: "Talk to an engineer, not a salesperson",
          },
        ],
      },
    ],
  },
];

/** Footer "Quick Links" column. */
export const footerQuickLinks = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Case Studies", href: routes.caseStudies },
  { label: "Industries", href: routes.industries },
  { label: "Technology", href: routes.technology },
  { label: "Careers", href: routes.careers },
  { label: "Contact Us", href: routes.contact },
] as const;
