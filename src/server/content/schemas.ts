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

/* ------------------------------------------------------------------ page ---- */

/** Free-form page copy: heroes, intros and section blurbs keyed by slot. */
export const pageSchema = z.object({
  metaTitle,
  metaDescription,
  heading: nonEmpty("Heading", 160),
  intro: z.array(nonEmpty("Paragraph", 900)).min(1).max(5),
  blocks: z
    .array(z.object({ title: nonEmpty("Title", 160), body: nonEmpty("Body", 1500) }))
    .max(12)
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
};
