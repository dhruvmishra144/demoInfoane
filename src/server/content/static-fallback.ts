/**
 * In-memory fallback data for every collection, built from the same
 * `src/content/*` files that seed D1 — used by `getCollectionOrFallback` /
 * `getSettingsOrFallback` when a table is empty or a bad deploy leaves D1
 * unreachable, so a page never renders blank.
 *
 * Deliberately not shared with `scripts/generate-seed.ts`: that script emits
 * SQL at build time, this runs on the request path — coupling them would tie
 * a one-off script's shape to a hot path for no real benefit.
 */

import { servicePages } from "@/content/services";
import {
  caseStudies,
  engagementModels,
  faqs,
  industries,
  pillars,
  testimonials,
  process as processSteps,
  techStack as techStackGroups,
} from "@/content/home";
import { industriesPage } from "@/content/pages";
import { site } from "@/config/site";
import type { CollectionData } from "./schemas";

const SERVICE_ICONS: CollectionData["service"]["iconName"][] = [
  "code",
  "cloud",
  "refresh",
  "data",
  "spark",
  "team",
];

export const serviceFallback: (CollectionData["service"] & { slug: string })[] =
  servicePages.map((service, index) => ({
    title: service.title,
    heading: service.heading,
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    navDescription: service.navDescription,
    summary: service.summary,
    bullets: [...service.bullets],
    intro: [...service.intro],
    signals: [...service.signals],
    sections: service.sections.map((s) => ({ ...s })),
    deliverables: [...service.deliverables],
    technologies: [...service.technologies],
    faqs: service.faqs.map((f) => ({ ...f })),
    related: [...service.related],
    iconName: SERVICE_ICONS[index] ?? "code",
    slug: service.slug,
  }));

export const industryFallback: (CollectionData["industry"] & { slug: string })[] =
  industriesPage.detail.map((industry, index) => ({
    name: industry.name,
    note: industries[index]?.note ?? industry.focus[0],
    body: industry.body,
    focus: [...industry.focus],
    slug: industry.slugId,
  }));

export const caseStudyFallback: (CollectionData["caseStudy"] & { slug: string })[] =
  caseStudies.map((study, index) => ({
    client: study.client,
    industry: study.industry,
    challenge: study.challenge,
    outcome: study.outcome,
    metric: study.metric,
    metricLabel: study.metricLabel,
    clientNameApproved: false,
    imageId: null,
    slug: study.slug.replace(/[[\]]/g, "") || `case-study-${index + 1}`,
  }));

export const testimonialFallback: (CollectionData["testimonial"] & { slug: string })[] =
  testimonials.map((testimonial, index) => ({
    quote: testimonial.quote,
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    attributionApproved: false,
    avatarId: null,
    slug: `testimonial-${index + 1}`,
  }));

export const faqFallback: (CollectionData["faq"] & { slug: string })[] = faqs.map(
  (faq, index) => ({
    question: faq.question,
    answer: faq.answer,
    placement: "home",
    slug: `home-${index + 1}`,
  }),
);

export const pillarFallback: (CollectionData["pillar"] & { slug: string })[] = pillars.map(
  (pillar) => ({
    step: pillar.step,
    title: pillar.title,
    body: pillar.body,
    slug: `pillar-${pillar.step}`,
  }),
);

export const processFallback: (CollectionData["process"] & { slug: string })[] =
  processSteps.map((step) => ({
    step: step.step,
    title: step.title,
    body: step.body,
    slug: `process-${step.step}`,
  }));

export const techStackFallback: (CollectionData["techStack"] & { slug: string })[] =
  techStackGroups.map((group) => ({
    group: group.group,
    items: [...group.items],
    slug: group.group.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));

export const engagementModelFallback: (CollectionData["engagementModel"] & {
  slug: string;
})[] = engagementModels.map((model) => ({
  name: model.name,
  tagline: model.tagline,
  price: model.price,
  unit: model.unit,
  summary: model.summary,
  includes: [...model.includes],
  popular: model.popular,
  slug: model.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
}));

export const settingsFallback: CollectionData["settings"] = {
  name: site.name,
  legalName: site.legalName,
  tagline: site.tagline,
  description: site.description,
  foundingYear: /^\d{4}$/.test(site.foundingYear) ? site.foundingYear : "1900",
  contact: {
    email: site.contact.email.includes("@")
      ? site.contact.email.replace(/[[\]]/g, "")
      : "hello@example.com",
    phone: site.contact.phone,
    phoneDisplay: site.contact.phoneDisplay,
  },
  offices: site.offices.map((office) => ({
    label: office.label,
    street: office.street,
    city: office.city,
    region: office.region,
    postalCode: office.postalCode,
    country: office.country.replace(/[[\]]/g, "").slice(0, 2).toUpperCase(),
    phone: office.phone,
    phoneDisplay: office.phoneDisplay,
    isHeadquarters: office.isHeadquarters,
  })),
  social: { ...site.social },
  stats: site.stats.map((stat) => ({ value: stat.value, label: stat.label })),
  credentials: [...site.credentials],
  promises: { ...site.promises },
  platformStrip: [
    "AWS",
    "Microsoft Azure",
    "Google Cloud",
    "Kubernetes",
    "Snowflake",
    "Databricks",
    ".NET",
    "PostgreSQL",
  ],
};
