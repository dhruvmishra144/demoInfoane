import { z } from "zod";
import type { Collection } from "@/server/db/schema";

/**
 * Zod schemas for every collection.
 *
 * These are the contract between the database and the pages. Content is stored as
 * JSON in D1, so without validation a bad row would flow into a component as
 * `any` and either crash the page or render `undefined`. Parsing on read means a
 * malformed row fails loudly in one place instead of silently corrupting a page.
 *
 * They do double duty as the admin form validators, so the editor UI and the
 * public site can never disagree about what a valid service looks like.
 */

const nonEmpty = (label: string, max = 300) =>
  z.string().trim().min(1, `${label} is required`).max(max);

/** Meta description length is a real SEO constraint, so it is enforced here. */
const metaDescription = z
  .string()
  .trim()
  .min(50, "Too short to be useful in search results")
  .max(165, "Google truncates around 160 characters");

const metaTitle = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(70, "Google truncates around 60 characters, plus the brand suffix");

export const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(80)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Lower-case letters, numbers and single hyphens only — this becomes the URL",
  );

/* -------------------------------------------------------------- service ---- */

export const serviceSchema = z.object({
  title: nonEmpty("Title", 80),
  heading: nonEmpty("Page heading", 120),
  metaTitle,
  metaDescription,
  navDescription: nonEmpty("Menu description", 90),
  summary: nonEmpty("Card summary", 400),
  bullets: z.array(nonEmpty("Bullet", 120)).min(1).max(5),
  intro: z.array(nonEmpty("Paragraph", 800)).min(1).max(4),
  signals: z.array(nonEmpty("Signal", 200)).min(1).max(8),
  sections: z
    .array(z.object({ title: nonEmpty("Section title", 120), body: nonEmpty("Body", 1200) }))
    .min(1)
    .max(8),
  deliverables: z.array(nonEmpty("Deliverable", 200)).min(1).max(10),
  technologies: z.array(nonEmpty("Technology", 60)).min(1).max(20),
  faqs: z
    .array(z.object({ question: nonEmpty("Question", 200), answer: nonEmpty("Answer", 1500) }))
    .min(1)
    .max(10),
  /** Slugs of related services, for internal linking. */
  related: z.array(slugSchema).max(4),
  iconName: z
    .enum(["code", "cloud", "refresh", "data", "spark", "team", "shield"])
    .default("code"),
});

/* ------------------------------------------------------------- industry ---- */

export const industrySchema = z.object({
  name: nonEmpty("Name", 80),
  note: nonEmpty("Short note", 160),
  body: nonEmpty("Description", 1200),
  focus: z.array(nonEmpty("Focus area", 120)).min(1).max(6),
});

/* ----------------------------------------------------------- case study ---- */

export const caseStudySchema = z.object({
  client: nonEmpty("Client name or descriptor", 120),
  industry: nonEmpty("Industry", 80),
  challenge: nonEmpty("Challenge", 800),
  outcome: nonEmpty("Outcome", 800),
  metric: nonEmpty("Headline metric", 20),
  metricLabel: nonEmpty("Metric label", 80),
  /**
   * Naming a client usually requires written permission, so this is an explicit
   * flag rather than an assumption. The admin UI warns when it is off.
   */
  clientNameApproved: z.boolean().default(false),
  imageId: z.string().nullable().default(null),
});

/* ---------------------------------------------------------- testimonial ---- */

export const testimonialSchema = z.object({
  quote: nonEmpty("Quote", 1000),
  name: nonEmpty("Name", 120),
  role: nonEmpty("Job title", 120),
  company: nonEmpty("Company", 120),
  /** Same reasoning as case studies: attribution needs consent. */
  attributionApproved: z.boolean().default(false),
  avatarId: z.string().nullable().default(null),
});

/* ------------------------------------------------------------------ faq ---- */

export const faqSchema = z.object({
  question: nonEmpty("Question", 200),
  answer: nonEmpty("Answer", 1500),
  /**
   * Which page's FAQ block this belongs to. FAQPage structured data is only
   * valid for questions visible on that page, so the grouping is load-bearing,
   * not cosmetic.
   */
  placement: z.enum(["home", "service"]).default("home"),
});

/* --------------------------------------------------------------- pillar ---- */

export const pillarSchema = z.object({
  step: nonEmpty("Step number", 4),
  title: nonEmpty("Title", 80),
  body: nonEmpty("Body", 600),
});

/* ----------------------------------------------------- engagement model ---- */

export const engagementModelSchema = z.object({
  name: nonEmpty("Name", 60),
  tagline: nonEmpty("Tagline", 120),
  price: nonEmpty("Price", 40),
  unit: nonEmpty("Unit", 40),
  summary: nonEmpty("Summary", 600),
  includes: z.array(nonEmpty("Item", 160)).min(1).max(8),
  popular: z.boolean().default(false),
});

/* -------------------------------------------------------------- process ---- */

/** The 4-step delivery-stages list — same shape as `pillar`, different placement. */
export const processSchema = z.object({
  step: nonEmpty("Step number", 4),
  title: nonEmpty("Title", 80),
  body: nonEmpty("Body", 600),
});

/* ------------------------------------------------------------ tech stack ---- */

export const techStackSchema = z.object({
  group: nonEmpty("Group name", 60),
  items: z.array(nonEmpty("Item", 60)).min(1).max(20),
});

/* ------------------------------------------------------------------ page ---- */

/**
 * Free-form page copy: heroes, intros and section blurbs keyed by slot, plus
 * the extra shapes About/Careers/Technology/Contact need. One shared schema
 * rather than a collection per page type, so a single generic editor screen
 * keeps working — pages that don't use a given section just leave it empty.
 */
/**
 * A section's framing copy, keyed by the `<Section id>` it belongs to.
 *
 * One row per section beats a bespoke field per section: eleven pages carry
 * roughly forty of these, and a generic editor can only stay generic if they
 * share a shape. Every field is optional — a blank falls back to the default in
 * `src/lib/page-sections.ts`, so an editor who clears a box gets the original
 * wording back rather than an empty heading.
 */
const pageSectionSchema = z.object({
  key: nonEmpty("Key", 60),
  eyebrow: z.string().trim().max(80).default(""),
  title: z.string().trim().max(200).default(""),
  lead: z.string().trim().max(800).default(""),
  /** The section's own button, where it has one ("All services", "Ask us"). */
  ctaLabel: z.string().trim().max(60).default(""),
  /** Supporting points beside the heading, as the tech-stack section uses. */
  bullets: z.array(z.string().trim().max(200)).max(6).default([]),
  /** Small print under the section body. */
  footnote: z.string().trim().max(600).default(""),
});

export const pageSchema = z.object({
  metaTitle,
  metaDescription,
  heading: nonEmpty("Heading", 160),
  intro: z.array(nonEmpty("Paragraph", 900)).min(1).max(5),
  /** Section headings. Defaulted so the six pre-existing rows stay valid. */
  sections: z.array(pageSectionSchema).max(24).default([]),
  /**
   * Closing CTA band. Blank means "use the site-wide default", which is what
   * every page except About relied on when this copy lived in JSX.
   */
  ctaBand: z
    .object({
      heading: z.string().trim().max(200).default(""),
      body: z.string().trim().max(800).default(""),
    })
    .default({ heading: "", body: "" }),
  /** Homepage hero. Empty on every other page. */
  hero: z
    .object({
      headline: z.string().trim().max(200).default(""),
      /**
       * A substring of `headline` that renders with the gradient treatment.
       * Kept separate because the effect needs its own element — inline markup
       * in the headline would have to be parsed, and editors would have to
       * write it.
       */
      highlight: z.string().trim().max(80).default(""),
      subhead: z.string().trim().max(800).default(""),
      primaryCta: z.string().trim().max(40).default(""),
      secondaryCta: z.string().trim().max(40).default(""),
      note: z.string().trim().max(300).default(""),
      cardTitle: z.string().trim().max(120).default(""),
      cardItems: z.array(nonEmpty("Item", 160)).max(6).default([]),
    })
    .default({
      headline: "",
      highlight: "",
      subhead: "",
      primaryCta: "",
      secondaryCta: "",
      note: "",
      cardTitle: "",
      cardItems: [],
    }),
  /**
   * Small one-off strings — table labels, badges, button text inside cards.
   *
   * A free-form map rather than a field per string: the homepage alone has
   * around twenty of these, and none of them justify a schema change or a
   * bespoke form control. The known keys and their defaults live in
   * `src/lib/page-sections.ts`, which is what the editor renders from — so this
   * stays a closed set in practice while remaining open in the data.
   */
  labels: z.record(z.string(), z.string().trim().max(300)).default({}),
  blocks: z
    .array(z.object({ title: nonEmpty("Title", 160), body: nonEmpty("Body", 1500) }))
    .max(12)
    .default([]),
  /** About: the numbered principles list. */
  principles: z
    .array(z.object({ title: nonEmpty("Title", 120), body: nonEmpty("Body", 600) }))
    .max(10)
    .default([]),
  /** About: leadership bios — real people only, never invented placeholders. */
  leadership: z
    .array(
      z.object({
        name: nonEmpty("Name", 120),
        role: nonEmpty("Role", 120),
        bio: nonEmpty("Bio", 400),
        linkedin: nonEmpty("LinkedIn URL", 200),
      }),
    )
    .max(12)
    .default([]),
  /** About: the company timeline. */
  milestones: z
    .array(z.object({ year: nonEmpty("Year", 10), event: nonEmpty("Event", 200) }))
    .max(20)
    .default([]),
  /** Careers: benefits grid. */
  benefits: z
    .array(z.object({ title: nonEmpty("Title", 80), body: nonEmpty("Body", 300) }))
    .max(10)
    .default([]),
  /** Careers: numbered hiring-process steps. */
  hiringProcess: z
    .array(
      z.object({
        step: nonEmpty("Step number", 4),
        title: nonEmpty("Title", 80),
        body: nonEmpty("Body", 400),
      }),
    )
    .max(10)
    .default([]),
  /** Careers: open roles. */
  openings: z
    .array(
      z.object({
        title: nonEmpty("Title", 120),
        location: nonEmpty("Location", 80),
        type: nonEmpty("Type", 40),
        summary: nonEmpty("Summary", 300),
      }),
    )
    .max(20)
    .default([]),
  /** Technology: grouped stack, richer than the standalone `techStack` collection. */
  techGroups: z
    .array(
      z.object({
        group: nonEmpty("Group name", 60),
        body: nonEmpty("Body", 300),
        items: z.array(nonEmpty("Item", 60)).min(1).max(20),
      }),
    )
    .max(10)
    .default([]),
  /** Contact: the short "what to expect" bullet list. */
  expectations: z.array(nonEmpty("Expectation", 200)).max(10).default([]),
});

/* ------------------------------------------------------------- navigation ---- */

/**
 * One menu per row: `header`, `footer-pages`, `legal`.
 *
 * Stored flat, with `parent` and `group` describing the shape, because a nested
 * array is far worse to edit than it is to render: a link with no parent is a
 * top-level entry, and one naming a parent becomes a child in that trigger's
 * mega panel under the column heading `group`.
 *
 * `href` is validated as a site-relative path or an absolute URL, so a page
 * created in the admin can be linked the moment its slug exists — no deploy, and
 * no way to save a `javascript:` URL into the navigation.
 */
const navHref = z
  .string()
  .trim()
  .min(1, "Link target is required")
  .max(300)
  .regex(
    /^(\/[A-Za-z0-9\-._~/?#[\]@!$&'()*+,;=%]*|https?:\/\/\S+|mailto:\S+@\S+|tel:\+?[\d\s-]+)$/,
    "Use a path starting with / or a full http(s), mailto: or tel: URL",
  );

export const navMenuSchema = z.object({
  label: nonEmpty("Menu name", 80),
  items: z
    .array(
      z.object({
        label: nonEmpty("Label", 80),
        href: navHref,
        /** Shown under the label in the header's mega panels. */
        description: z.string().trim().max(160).default(""),
        /** Top-level entry this hangs under. Blank means it is top-level. */
        parent: z.string().trim().max(80).default(""),
        /** Column heading inside the parent's panel. */
        group: z.string().trim().max(80).default(""),
      }),
    )
    .max(30)
    .default([]),
});

/* -------------------------------------------------------------- settings ---- */

const officeSchema = z.object({
  label: nonEmpty("Label", 80),
  street: nonEmpty("Street", 160),
  city: nonEmpty("City", 80),
  region: nonEmpty("Region", 80),
  postalCode: nonEmpty("Postal code", 20),
  country: z.string().trim().length(2, "Two-letter ISO country code, e.g. US or IN"),
  phone: nonEmpty("Phone (E.164)", 30),
  phoneDisplay: nonEmpty("Phone (display)", 30),
  isHeadquarters: z.boolean().default(false),
});

export const settingsSchema = z.object({
  name: nonEmpty("Company name", 80),
  legalName: nonEmpty("Legal entity name", 160),
  tagline: nonEmpty("Tagline", 160),
  description: metaDescription,
  foundingYear: z.string().trim().regex(/^\d{4}$/, "Four-digit year"),
  contact: z.object({
    email: z.string().trim().email(),
    phone: nonEmpty("Phone (E.164)", 30),
    phoneDisplay: nonEmpty("Phone (display)", 30),
  }),
  offices: z.array(officeSchema).min(1).max(6),
  social: z.record(z.string(), z.string().url()),
  stats: z.array(z.object({ value: nonEmpty("Value", 20), label: nonEmpty("Label", 80) })).max(4),
  credentials: z.array(nonEmpty("Credential", 120)).max(8),
  promises: z.object({
    consultationLength: nonEmpty("Consultation length", 40),
    discoveryLength: nonEmpty("Discovery length", 40),
    responseTime: nonEmpty("Response time", 40),
  }),
  platformStrip: z.array(nonEmpty("Platform", 60)).max(16),
  /** Header chrome. */
  header: z
    .object({
      ctaLabel: z.string().trim().max(40).default(""),
      /** The mega panel's promo card. Blank heading hides the card. */
      promoHeading: z.string().trim().max(120).default(""),
      promoBody: z.string().trim().max(400).default(""),
      promoCtaLabel: z.string().trim().max(60).default(""),
      promoCtaHref: z.string().trim().max(300).default(""),
      /**
       * Column headings for the two panels whose links are generated from the
       * service and industry collections — the links stay automatic so adding a
       * service cannot leave the menu stale, but the headings above them are
       * editorial.
       */
      serviceGroupPrimary: z.string().trim().max(80).default(""),
      serviceGroupSecondary: z.string().trim().max(80).default(""),
      industryGroupPrimary: z.string().trim().max(80).default(""),
      industryGroupSecondary: z.string().trim().max(80).default(""),
    })
    .default({
      ctaLabel: "",
      promoHeading: "",
      promoBody: "",
      promoCtaLabel: "",
      promoCtaHref: "",
      serviceGroupPrimary: "",
      serviceGroupSecondary: "",
      industryGroupPrimary: "",
      industryGroupSecondary: "",
    }),
  /** Footer chrome. */
  footer: z
    .object({
      blurb: z.string().trim().max(400).default(""),
      newsletterHeading: z.string().trim().max(120).default(""),
      newsletterBody: z.string().trim().max(400).default(""),
      newsletterPlaceholder: z.string().trim().max(80).default(""),
      newsletterCtaLabel: z.string().trim().max(40).default(""),
      pagesHeading: z.string().trim().max(60).default(""),
      servicesHeading: z.string().trim().max(60).default(""),
      officesHeading: z.string().trim().max(60).default(""),
      copyrightSuffix: z.string().trim().max(120).default(""),
    })
    .default({
      blurb: "",
      newsletterHeading: "",
      newsletterBody: "",
      newsletterPlaceholder: "",
      newsletterCtaLabel: "",
      pagesHeading: "",
      servicesHeading: "",
      officesHeading: "",
      copyrightSuffix: "",
    }),
});

/* ---------------------------------------------------------------- registry -- */

export const collectionSchemas = {
  service: serviceSchema,
  industry: industrySchema,
  caseStudy: caseStudySchema,
  testimonial: testimonialSchema,
  faq: faqSchema,
  pillar: pillarSchema,
  engagementModel: engagementModelSchema,
  page: pageSchema,
  settings: settingsSchema,
  process: processSchema,
  techStack: techStackSchema,
  navMenu: navMenuSchema,
} satisfies Record<Collection, z.ZodTypeAny>;

export type CollectionData = {
  service: z.infer<typeof serviceSchema>;
  industry: z.infer<typeof industrySchema>;
  caseStudy: z.infer<typeof caseStudySchema>;
  testimonial: z.infer<typeof testimonialSchema>;
  faq: z.infer<typeof faqSchema>;
  pillar: z.infer<typeof pillarSchema>;
  engagementModel: z.infer<typeof engagementModelSchema>;
  page: z.infer<typeof pageSchema>;
  settings: z.infer<typeof settingsSchema>;
  process: z.infer<typeof processSchema>;
  techStack: z.infer<typeof techStackSchema>;
  navMenu: z.infer<typeof navMenuSchema>;
};

/** Human-readable labels for the admin UI. */
export const collectionLabels: Record<Collection, { singular: string; plural: string }> = {
  service: { singular: "Service", plural: "Services" },
  industry: { singular: "Industry", plural: "Industries" },
  caseStudy: { singular: "Case study", plural: "Case studies" },
  testimonial: { singular: "Testimonial", plural: "Testimonials" },
  faq: { singular: "FAQ", plural: "FAQs" },
  pillar: { singular: "Pillar", plural: "Pillars" },
  engagementModel: { singular: "Engagement model", plural: "Engagement models" },
  page: { singular: "Page", plural: "Pages" },
  settings: { singular: "Site settings", plural: "Site settings" },
  process: { singular: "Process step", plural: "Process steps" },
  techStack: { singular: "Tech stack group", plural: "Tech stack groups" },
  navMenu: { singular: "Menu", plural: "Navigation" },
};
