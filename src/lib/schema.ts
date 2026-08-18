import { site } from "@/config/site";
import { servicePages, type ServicePage } from "@/content/services";
import { absolute, serviceUrl } from "@/lib/routes";

/**
 * JSON-LD structured data.
 *
 * Split in two so nothing is emitted twice on a multipage site:
 *
 *  - `siteSchema()` defines the Organization and WebSite nodes and is rendered
 *    once, in the root layout, so it appears on every page.
 *  - `pageSchema()` defines the per-page nodes (WebPage, BreadcrumbList and
 *    optionally Service or FAQPage) and references the Organization by @id.
 *
 * Google merges nodes across the JSON-LD blocks on a page, so the @id references
 * resolve even though the nodes live in different <script> tags.
 *
 * Validate changes at https://search.google.com/test/rich-results.
 */

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;
const logoId = `${site.url}/#logo`;

/* --------------------------------------------------------- site-wide ---- */

function organization() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    foundingDate: site.foundingYear,
    email: site.contact.email,
    telephone: site.contact.phone,
    logo: {
      "@type": "ImageObject",
      "@id": logoId,
      url: `${site.url}/logo.svg`,
      contentUrl: `${site.url}/logo.svg`,
      caption: site.name,
    },
    image: { "@id": logoId },
    sameAs: Object.values(site.social),
    address: site.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.street,
      addressLocality: office.city,
      addressRegion: office.region,
      postalCode: office.postalCode,
      addressCountry: office.country,
    })),
    // One ContactPoint per office, so the right number is associated with the
    // right location rather than all of them collapsing into one.
    contactPoint: site.offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: office.isHeadquarters ? "sales" : "customer support",
      telephone: office.phone,
      email: site.contact.email,
      areaServed: office.country,
      availableLanguage: "English",
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${site.name} services`,
      itemListElement: servicePages.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: serviceUrl(service.slug),
          provider: { "@id": orgId },
        },
      })),
    },
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": siteId,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

/** Rendered once, in the root layout. */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website()],
  };
}

/* --------------------------------------------------------- per page ---- */

export type Crumb = { name: string; path: string };

/**
 * WebPage subtypes carry meaning: AboutPage and ContactPage in particular help
 * search engines understand a site's shape, and CollectionPage marks an index.
 */
type PageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "ProfilePage";

export function pageSchema({
  path,
  name,
  description,
  type = "WebPage",
  breadcrumbs = [],
  faqs = [],
  service,
}: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  /** Trail excluding the current page; "Home" is added automatically. */
  breadcrumbs?: Crumb[];
  faqs?: { question: string; answer: string }[];
  /** Present on service pages: emits a Service node for the offering. */
  service?: ServicePage;
}) {
  const url = absolute(path);
  const nodes: object[] = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
      inLanguage: "en",
      ...(breadcrumbs.length > 0
        ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
        : {}),
    },
  ];

  if (breadcrumbs.length > 0) {
    const trail: Crumb[] = [{ name: "Home", path: "/" }, ...breadcrumbs];
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absolute(crumb.path),
      })),
    });
  }

  if (service) {
    nodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.metaDescription,
      url,
      serviceType: service.title,
      provider: { "@id": orgId },
      areaServed: site.offices.map((office) => office.country),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} deliverables`,
        itemListElement: service.deliverables.map((deliverable) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: deliverable },
        })),
      },
    });
  }

  // Only questions that are visible on this page belong here.
  if (faqs.length > 0) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": nodes };
}
