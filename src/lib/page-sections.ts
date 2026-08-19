import type { CollectionData } from "@/server/content/schemas";

/**
 * The registry of editable page sections.
 *
 * Every section heading on the public site is identified by the page it lives on
 * plus the `<Section id>` it renders as. This file is the single place that
 * knows the full set, which buys three things at once:
 *
 *  1. the admin can render exactly the right rows, with human labels, without a
 *     hand-written form per page;
 *  2. a component can look its copy up by key and get the original wording back
 *     if D1 has nothing (or an editor cleared the field);
 *  3. the seed generator emits these as the starting values, so migrating a
 *     heading into the CMS is not also a rewrite of it.
 *
 * Adding a section means adding a row here and reading it in the component. The
 * key must match the `<Section id>`, so the anchor links and the editor labels
 * cannot drift apart.
 */

/** Pages that have a `page` row in D1 and therefore an editor screen. */
export const PAGE_SLUGS = [
  "home",
  "about",
  "services",
  "industries",
  "technology",
  "case-studies",
  "careers",
  "contact",
  "privacy-policy",
  "terms",
  "not-found",
] as const;

export type PageSlug = (typeof PAGE_SLUGS)[number];

export function isPageSlug(value: string): value is PageSlug {
  return (PAGE_SLUGS as readonly string[]).includes(value);
}

/** Sidebar/list labels and the public route each page maps to. */
export const pageLabels: Record<PageSlug, { label: string; route: string }> = {
  home: { label: "Home", route: "/" },
  about: { label: "About", route: "/about" },
  services: { label: "Services", route: "/services" },
  industries: { label: "Industries", route: "/industries" },
  technology: { label: "Technology", route: "/technology" },
  "case-studies": { label: "Case studies", route: "/case-studies" },
  careers: { label: "Careers", route: "/careers" },
  contact: { label: "Contact", route: "/contact" },
  "privacy-policy": { label: "Privacy policy", route: "/privacy-policy" },
  terms: { label: "Terms of service", route: "/terms" },
  "not-found": { label: "404 page", route: "/not-found-preview" },
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  ctaLabel: string;
  bullets: string[];
  footnote: string;
};

type SectionDefault = Partial<SectionCopy> & {
  key: string;
  /** Shown in the admin so an editor knows which part of the page this is. */
  label: string;
};

const emptySectionCopy: SectionCopy = {
  eyebrow: "",
  title: "",
  lead: "",
  ctaLabel: "",
  bullets: [],
  footnote: "",
};

/**
 * Default copy per section — the exact wording that was hardcoded in the
 * components before any of this was editable.
 *
 * `{consultationLength}`, `{discoveryLength}` and `{responseTime}` are resolved
 * against site settings by `interpolate()`. They exist so a sentence stays
 * editable without hardcoding a number that Site Settings is supposed to own.
 */
export const pageSectionDefaults: Record<PageSlug, SectionDefault[]> = {
  home: [
    {
      key: "platforms",
      label: "Platform strip",
      eyebrow: "",
      title: "Platforms and clouds we build on",
      lead: "",
    },
    {
      key: "pillars",
      label: "Engagement pillars",
      eyebrow: "",
      title: "How an engagement works",
      lead: "",
    },
    {
      key: "services",
      label: "Services grid",
      eyebrow: "What we do",
      title: "Software and cloud services, end to end",
      lead: "Six practices covering the whole lifecycle — from the first architecture decision to running the system at scale. Most clients start with one and expand.",
      ctaLabel: "All services",
    },
    {
      key: "process",
      label: "How we work (tabs)",
      eyebrow: "How we work",
      title: "A delivery process you can hold us to",
      lead: "Most failed projects fail in the first month, on assumptions nobody wrote down. This is the sequence we use so that does not happen.",
    },
    {
      key: "industries",
      label: "Industries grid",
      eyebrow: "Industries",
      title: "Domain knowledge, not just engineering",
      lead: "Regulated industries do not need developers who learn the domain on your budget. These are the sectors we have shipped in repeatedly.",
    },
    {
      key: "technologies",
      label: "Tech stack",
      eyebrow: "Technology",
      title: "We work in the stack you already run",
      lead: "We pick the boring, proven tool unless there is a specific reason not to — a stack you can still hire for in five years matters more than one that is exciting this quarter. You inherit the maintenance, not us.",
      ctaLabel: "See our full stack",
      bullets: [
        "Managed services over self-hosted, unless there is a reason",
        "Where two options are close, your team’s stack wins",
        "Nothing load-bearing without a maintained release history",
      ],
      footnote:
        "This reflects what our clients run, not the limit of what we will work on — and we would rather tell you we are not a fit than learn your platform on your budget.",
    },
    {
      key: "work",
      label: "Case studies",
      eyebrow: "Success stories",
      title: "Results our clients can point at",
      lead: "Described the way we would describe them to your board: what was broken, what we built, and the number that changed.",
      ctaLabel: "All case studies",
    },
    {
      key: "testimonials",
      label: "Testimonials",
      eyebrow: "Client feedback",
      title: "What it is like to work with us",
      lead: "Ask any of our references the same question you would ask us: what happened when something went wrong?",
    },
    {
      key: "engagement",
      label: "Engagement models",
      eyebrow: "Engagement models",
      title: "Three ways to work with us",
      lead: "Most clients start with discovery and then pick the shape that fits what discovery found. You are never locked into the first choice.",
      ctaLabel: "Schedule a call",
    },
    {
      key: "faq",
      label: "FAQ",
      eyebrow: "FAQ",
      title: "Your questions, answered",
      lead: "If yours is not here, ask it on the call — we would rather answer it before you sign than after.",
      ctaLabel: "Contact us",
    },
    {
      key: "contact",
      label: "Closing CTA",
      eyebrow: "Start your journey",
      title: "Let’s start building something great together",
      lead: "Book a free {consultationLength} consultation. You will talk to an engineer, not an account manager, and you will leave with a concrete opinion on your options — whether or not you hire us.",
    },
  ],

  about: [
    {
      key: "principles",
      label: "Principles",
      eyebrow: "How we operate",
      title: "Six things we hold to",
      lead: "These are commitments, not values on a wall. Hold us to them — and tell us when we slip.",
    },
    {
      key: "leadership",
      label: "Leadership",
      eyebrow: "Leadership",
      title: "Who you will actually be working with",
      lead: "The people who scope your engagement stay on it. No handoff to a delivery team you have never met.",
    },
    {
      key: "milestones",
      label: "Timeline",
      eyebrow: "Timeline",
      title: "How we got here",
      lead: "",
    },
    {
      key: "offices",
      label: "Offices",
      eyebrow: "Where we are",
      title: "Our offices",
      lead: "Delivery teams work with an overlap to your business hours — the location matters less than the overlap, and we staff for the overlap.",
    },
  ],

  services: [
    {
      key: "all-services",
      label: "Services list",
      eyebrow: "Our practices",
      title: "Services in detail",
      lead: "Each page covers the symptoms that lead clients here, how we approach the work, what you receive, and the technologies involved.",
    },
    {
      key: "process",
      label: "Delivery process",
      eyebrow: "How we work",
      title: "A delivery process you can hold us to",
      lead: "Most failed projects fail in the first month, on assumptions nobody wrote down. This is the sequence we use to make sure that does not happen.",
    },
    /*
     * The five below are the shared template for every /services/[slug] page,
     * not for /services itself. They live here so one edit updates all six
     * service pages — putting them on the `service` collection would mean
     * retyping the same heading six times.
     */
    {
      key: "detail-signals",
      label: "Service page — “when to call us”",
      eyebrow: "When to call us",
      title: "You probably need this if…",
      lead: "",
    },
    {
      key: "detail-approach",
      label: "Service page — approach",
      eyebrow: "How we work",
      title: "",
      lead: "",
    },
    {
      key: "detail-deliverables",
      label: "Service page — deliverables",
      eyebrow: "Deliverables",
      title: "What you actually receive",
      lead: "Artefacts, not activity. Everything here is something you keep, and something you could hand to another supplier.",
    },
    {
      key: "detail-faq",
      label: "Service page — FAQ",
      eyebrow: "FAQ",
      title: "",
      lead: "",
    },
    {
      key: "detail-related",
      label: "Service page — related",
      eyebrow: "Related services",
      title: "Often needed alongside this",
      lead: "",
    },
  ],

  industries: [
    {
      key: "sectors",
      label: "Sector list",
      eyebrow: "Sector experience",
      title: "Where we have delivered",
      lead: "Each of these carries constraints that shape architecture rather than decorate it — regulatory scope, uptime expectations, and the systems you cannot replace.",
    },
  ],

  technology: [
    {
      key: "stack",
      label: "Stack by layer",
      eyebrow: "Our stack",
      title: "What we build with",
      lead: "Grouped by layer, with a note on when each one earns its place.",
    },
    {
      key: "how-we-choose",
      label: "Selection criteria",
      eyebrow: "Selection criteria",
      title: "How we choose between them",
      lead: "Technology choices outlive the people who make them. These are the tie-breakers we apply.",
    },
    {
      key: "services-using-stack",
      label: "Services using the stack",
      eyebrow: "Put to work",
      title: "Where we apply it",
      lead: "Each service page lists the specific technologies that engagement typically involves.",
    },
  ],

  "case-studies": [
    {
      key: "studies",
      label: "Engagement list",
      eyebrow: "Engagements",
      title: "Problem, approach, result",
      lead: "No hero narratives. What was broken, what we did about it, and the number that changed.",
    },
    {
      key: "testimonials",
      label: "Testimonials",
      eyebrow: "Client feedback",
      title: "What it is like to work with us",
      lead: "Ask any of our references the same question you would ask us: what happened when something went wrong?",
    },
    {
      key: "services-behind",
      label: "Services involved",
      eyebrow: "Services involved",
      title: "The work behind these results",
      lead: "",
    },
  ],

  careers: [
    {
      key: "openings",
      label: "Open roles",
      eyebrow: "Open roles",
      title: "Where we are hiring",
      lead: "If none of these fit but you think you should be here, write to us anyway and say why.",
    },
    {
      key: "benefits",
      label: "Benefits",
      eyebrow: "What we offer",
      title: "The practical details",
      lead: "",
    },
    {
      key: "hiring-process",
      label: "Hiring process",
      eyebrow: "Hiring process",
      title: "What to expect, in order",
      lead: "Four steps, and you hear back at each one. We know what it is like to be left waiting.",
    },
  ],

  contact: [
    {
      key: "reach-us",
      label: "Direct lines",
      eyebrow: "Direct lines",
      title: "How to reach us",
      lead: "Email gets the fastest considered answer; the phone gets the fastest answer. Both reach a person who can talk about the work.",
    },
    {
      key: "offices",
      label: "Offices",
      eyebrow: "Offices",
      title: "Where we are",
      lead: "",
    },
    {
      key: "which-service",
      label: "Start with a service",
      eyebrow: "Or start with a service",
      title: "Know what you need already?",
      lead: "Go straight to the relevant service page — each one lists what the engagement involves and what you receive.",
    },
  ],

  "privacy-policy": [
    {
      key: "sections",
      label: "Policy sections",
      eyebrow: "Draft structure",
      title: "Sections this policy needs to cover",
      lead: "",
    },
  ],

  terms: [
    {
      key: "sections",
      label: "Terms sections",
      eyebrow: "Draft structure",
      title: "Sections these terms need to cover",
      lead: "",
    },
  ],

  "not-found": [
    {
      key: "suggestions",
      label: "Suggested links",
      eyebrow: "",
      title: "Looking for one of these?",
      lead: "",
    },
  ],
};

/**
 * The closing CTA band. Pages that had no bespoke wording inherit the shared
 * default, which is what they got from `CtaBand`'s own defaults before.
 */
export const sharedCtaBand = {
  heading: "Tell us what is slowing your systems down",
  body: "Book a free {consultationLength} consultation. You will talk to an engineer, not an account manager, and you will leave with a concrete opinion on your options — whether or not you hire us.",
};

export const pageCtaBandDefaults: Partial<Record<PageSlug, { heading: string; body: string }>> = {
  services: {
    heading: "Not sure which service you need?",
    body: "Describe the problem rather than the solution. We will tell you which of these applies — or that configuration solves it and you should keep your budget.",
  },
  careers: {
    heading: "Not seeing your role?",
    body: "Tell us what you want to work on and what you have shipped. We read every application, and we reply either way.",
  },
  industries: {
    heading: "Your sector not listed?",
    body: "Domain knowledge transfers further than most agencies admit — the constraints that matter are usually regulatory, data-shaped or uptime-driven rather than industry-specific. Describe yours and we will tell you honestly whether we are a fit.",
  },
  technology: {
    heading: "Working in a stack we have not listed?",
    body: "Ask. The list reflects what our clients run, not the limit of what we will work on — and we would rather tell you we are not the right fit than learn your platform on your budget.",
  },
  "case-studies": {
    heading: "Want to talk to one of these clients?",
    body: "We will put you in touch with a reference whose problem resembled yours. Ask them what happened when something went wrong — that is the answer worth having.",
  },
};

/** The homepage hero's original copy. */
export const homeHeroDefaults = {
  headline: "IT consulting and custom software for modern enterprises",
  highlight: "custom software",
  subhead:
    "We modernise the systems your business runs on, move them to the cloud, and build the software your competitors cannot buy off-the-shelf. Senior engineers, honest scoping, and a working demo every two weeks.",
  primaryCta: "Get started",
  secondaryCta: "Explore services",
  note: "A free {consultationLength} call with an engineer who has shipped this before. No sales script.",
  cardTitle: "Your first engagement",
  cardItems: [
    "Stakeholder interviews and system audit",
    "Target architecture, with trade-offs",
    "Written scope, timeline and costed plan",
    "Yours to keep — even if you stop there",
  ],
};

/* ------------------------------------------------------------------ labels -- */

type LabelDefault = {
  key: string;
  /** Field label in the admin. */
  label: string;
  value: string;
  /** Groups the fields under a subheading in the editor. */
  group: string;
};

/**
 * The small one-off strings: badges, table labels, button text inside cards.
 *
 * Registered rather than schema'd so the editor can render them generically and
 * a component can ask for one by key. `group` exists only to keep the form
 * readable — twenty ungrouped text inputs is not an editing experience.
 */
export const pageLabelDefaults: Partial<Record<PageSlug, LabelDefault[]>> = {
  home: [
    { key: "hero.cadenceLabel", label: "Cadence card — label", value: "Sprint cadence", group: "Hero cards" },
    { key: "hero.cadenceValue", label: "Cadence card — value", value: "2 weeks", group: "Hero cards" },
    {
      key: "hero.demoLabel",
      label: "Cadence card — footer label",
      value: "Working demo each sprint",
      group: "Hero cards",
    },
    { key: "hero.demoValue", label: "Cadence card — footer value", value: "100%", group: "Hero cards" },
    { key: "hero.ipLabel", label: "Badge card — label", value: "IP & source code", group: "Hero cards" },
    { key: "hero.ipValue", label: "Badge card — value", value: "Yours on payment", group: "Hero cards" },

    {
      key: "services.itemCta",
      label: "Service card link prefix",
      value: "Explore",
      group: "Services",
    },

    { key: "process.stageWord", label: "Stage word", value: "Stage", group: "How we work" },
    { key: "process.statusComplete", label: "Status — complete", value: "Complete", group: "How we work" },
    { key: "process.statusActive", label: "Status — active", value: "Active", group: "How we work" },
    { key: "process.statusQueued", label: "Status — queued", value: "Queued", group: "How we work" },

    {
      key: "technologies.askHeading",
      label: "Ask card — heading",
      value: "Not on the list?",
      group: "Tech stack",
    },
    { key: "technologies.askCta", label: "Ask card — link", value: "Ask us", group: "Tech stack" },

    { key: "work.challengeLabel", label: "Challenge label", value: "Challenge", group: "Case studies" },
    { key: "work.outcomeLabel", label: "Outcome label", value: "Outcome", group: "Case studies" },
    {
      key: "work.itemCta",
      label: "Case study card link",
      value: "Read the full case study",
      group: "Case studies",
    },

    {
      key: "testimonials.extraTitle",
      label: "Extra card — heading",
      value:
        "We would rather be measured on whether your team can maintain the system after we leave.",
      group: "Testimonials",
    },
    {
      key: "testimonials.extraBody",
      label: "Extra card — body",
      value:
        "Documentation, tests and a recorded walkthrough are part of every engagement — not an upsell at the end.",
      group: "Testimonials",
    },

    {
      key: "engagement.popularBadge",
      label: "Popular badge",
      value: "Most chosen",
      group: "Engagement models",
    },

    {
      key: "contact.replyNote",
      label: "Reply promise",
      value: "Replies within {responseTime}",
      group: "Closing CTA",
    },
    { key: "contact.ndaNote", label: "NDA note", value: "NDA on request", group: "Closing CTA" },
  ],
  // The testimonials block is shared with the homepage, so its extra card needs
  // registering here too — otherwise it renders blank on this page.
  "case-studies": [
    {
      key: "testimonials.extraTitle",
      label: "Extra card — heading",
      value:
        "We would rather be measured on whether your team can maintain the system after we leave.",
      group: "Testimonials",
    },
    {
      key: "testimonials.extraBody",
      label: "Extra card — body",
      value:
        "Documentation, tests and a recorded walkthrough are part of every engagement — not an upsell at the end.",
      group: "Testimonials",
    },
  ],
};

/** Resolves one small label, falling back to the registered default. */
export function resolveLabel(
  labels: Record<string, string> | undefined,
  pageSlug: PageSlug,
  key: string,
): string {
  const stored = labels?.[key]?.trim();
  if (stored) return stored;
  return pageLabelDefaults[pageSlug]?.find((entry) => entry.key === key)?.value ?? "";
}

export function labelRecordFor(pageSlug: PageSlug): Record<string, string> {
  return Object.fromEntries(
    (pageLabelDefaults[pageSlug] ?? []).map((entry) => [entry.key, entry.value]),
  );
}

/* -------------------------------------------------------------- navigation -- */

/**
 * The menus, seeded from what `src/lib/routes.ts` hardcoded.
 *
 * Service and industry links are still injected by the header from their own
 * collections — those stay automatic so adding a service cannot leave the menu
 * stale. Everything an editor would actually want to change by hand lives here.
 */
export const NAV_MENUS = ["header", "footer-pages", "legal"] as const;
export type NavMenuSlug = (typeof NAV_MENUS)[number];

export const navMenuDefaults: Record<
  NavMenuSlug,
  {
    label: string;
    items: {
      label: string;
      href: string;
      description: string;
      parent: string;
      group: string;
    }[];
  }
> = {
  header: {
    label: "Header",
    items: [
      { label: "Home", href: "/", description: "", parent: "", group: "" },
      { label: "Services", href: "/services", description: "", parent: "", group: "" },
      { label: "Industries", href: "/industries", description: "", parent: "", group: "" },
      { label: "Company", href: "/about", description: "", parent: "", group: "" },
      {
        label: "About Us",
        href: "/about",
        description: "How we work and who you will work with",
        parent: "Company",
        group: "Company",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Problem, approach and measured result",
        parent: "Company",
        group: "Company",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Open roles and how we hire",
        parent: "Company",
        group: "Company",
      },
      {
        label: "Technology",
        href: "/technology",
        description: "Our stack and how we choose it",
        parent: "Company",
        group: "Capability",
      },
      {
        label: "All Services",
        href: "/services",
        description: "Six practices in one place",
        parent: "Company",
        group: "Capability",
      },
      {
        label: "Contact Us",
        href: "/contact",
        description: "Talk to an engineer, not a salesperson",
        parent: "Company",
        group: "Capability",
      },
    ],
  },
  "footer-pages": {
    label: "Footer — pages",
    items: [
      { label: "Home", href: "/", description: "", parent: "", group: "" },
      { label: "About Us", href: "/about", description: "", parent: "", group: "" },
      { label: "Case Studies", href: "/case-studies", description: "", parent: "", group: "" },
      { label: "Industries", href: "/industries", description: "", parent: "", group: "" },
      { label: "Technology", href: "/technology", description: "", parent: "", group: "" },
      { label: "Careers", href: "/careers", description: "", parent: "", group: "" },
      { label: "Contact Us", href: "/contact", description: "", parent: "", group: "" },
    ],
  },
  legal: {
    label: "Footer — legal bar",
    items: [
      { label: "Privacy Policy", href: "/privacy-policy", description: "", parent: "", group: "" },
      { label: "Terms of Service", href: "/terms", description: "", parent: "", group: "" },
      { label: "Sitemap", href: "/sitemap.xml", description: "", parent: "", group: "" },
    ],
  },
};

/** Header/footer chrome defaults, matching what the components hardcoded. */
export const headerDefaults = {
  ctaLabel: "Contact us",
  promoHeading: "Not sure where to start?",
  promoBody:
    "Describe the problem rather than the solution. We will tell you which service applies — or that you do not need us.",
  promoCtaLabel: "Book a free consultation",
  promoCtaHref: "/contact",
  serviceGroupPrimary: "Build & modernise",
  serviceGroupSecondary: "Data, AI & teams",
  industryGroupPrimary: "Regulated sectors",
  industryGroupSecondary: "Operations & product",
};

export const footerDefaults = {
  blurb: "for enterprises that need software delivered predictably.",
  newsletterHeading: "Sign up for our newsletter",
  newsletterBody:
    "Occasional notes on modernisation, cloud cost and delivery — no more than once a month.",
  newsletterPlaceholder: "you@company.com",
  newsletterCtaLabel: "Subscribe",
  pagesHeading: "Pages",
  servicesHeading: "Services",
  officesHeading: "Offices",
  copyrightSuffix: "All rights reserved.",
};

/* --------------------------------------------------------------- resolving -- */

type StoredSection = { key: string } & Partial<SectionCopy>;

/**
 * Resolves one section's copy: the stored value wins, a blank falls through to
 * the registry default.
 *
 * Field-by-field rather than row-by-row on purpose — an editor who overwrites
 * only the title should keep the original eyebrow and lead, not lose them.
 */
export function resolveSection(
  sections: StoredSection[] | undefined,
  pageSlug: PageSlug,
  key: string,
): SectionCopy {
  const registry = pageSectionDefaults[pageSlug].find((section) => section.key === key);
  const fallback: SectionCopy = { ...emptySectionCopy, ...registry };
  const stored = sections?.find((section) => section.key === key);

  return {
    eyebrow: stored?.eyebrow?.trim() || fallback.eyebrow,
    title: stored?.title?.trim() || fallback.title,
    lead: stored?.lead?.trim() || fallback.lead,
    ctaLabel: stored?.ctaLabel?.trim() || fallback.ctaLabel,
    bullets: stored?.bullets?.length ? stored.bullets : fallback.bullets,
    footnote: stored?.footnote?.trim() || fallback.footnote,
  };
}

/** Full section rows for a page, used to seed D1 and the static fallback. */
export function sectionRowsFor(pageSlug: PageSlug): ({ key: string } & SectionCopy)[] {
  return pageSectionDefaults[pageSlug].map((section) => ({
    ...emptySectionCopy,
    ...section,
    key: section.key,
  }));
}

export function resolveCtaBand(
  page: { ctaBand?: { heading: string; body: string } } | undefined,
  pageSlug: PageSlug,
): { heading: string; body: string } {
  const fallback = pageCtaBandDefaults[pageSlug] ?? sharedCtaBand;
  return {
    heading: page?.ctaBand?.heading?.trim() || fallback.heading,
    body: page?.ctaBand?.body?.trim() || fallback.body,
  };
}

/**
 * Substitutes the `{promise}` tokens editors can use in any copy field.
 *
 * Unknown tokens are left alone rather than blanked: a stray brace in prose
 * should look like a typo to whoever wrote it, not silently delete their text.
 */
export function interpolate(
  text: string,
  settings: Pick<CollectionData["settings"], "promises">,
): string {
  return text.replace(/\{(consultationLength|discoveryLength|responseTime)\}/g, (_, token) => {
    return settings.promises[token as keyof typeof settings.promises];
  });
}

type PromiseSettings = Pick<CollectionData["settings"], "promises">;

/**
 * A section's copy, resolved and interpolated, ready to render.
 *
 * Sections are handed to components as plain objects rather than a lookup
 * function because several of them are client components — a function prop would
 * not survive the server/client boundary.
 */
export function sectionCopy(
  sections: StoredSection[] | undefined,
  pageSlug: PageSlug,
  key: string,
  settings: PromiseSettings,
): SectionCopy {
  const copy = resolveSection(sections, pageSlug, key);
  return {
    eyebrow: interpolate(copy.eyebrow, settings),
    title: interpolate(copy.title, settings),
    lead: interpolate(copy.lead, settings),
    ctaLabel: interpolate(copy.ctaLabel, settings),
    bullets: copy.bullets.map((bullet) => interpolate(bullet, settings)),
    footnote: interpolate(copy.footnote, settings),
  };
}

/** Every registered label for a page, stored values winning over defaults. */
export function resolveLabels(
  labels: Record<string, string> | undefined,
  pageSlug: PageSlug,
  settings: PromiseSettings,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const entry of pageLabelDefaults[pageSlug] ?? []) {
    out[entry.key] = interpolate(labels?.[entry.key]?.trim() || entry.value, settings);
  }
  return out;
}

/** The homepage hero, resolved and interpolated. */
export function resolveHero(
  hero: Partial<typeof homeHeroDefaults> | undefined,
  settings: PromiseSettings,
): typeof homeHeroDefaults {
  const merged = {
    headline: hero?.headline?.trim() || homeHeroDefaults.headline,
    highlight: hero?.highlight?.trim() ?? homeHeroDefaults.highlight,
    subhead: hero?.subhead?.trim() || homeHeroDefaults.subhead,
    primaryCta: hero?.primaryCta?.trim() || homeHeroDefaults.primaryCta,
    secondaryCta: hero?.secondaryCta?.trim() || homeHeroDefaults.secondaryCta,
    note: hero?.note?.trim() || homeHeroDefaults.note,
    cardTitle: hero?.cardTitle?.trim() || homeHeroDefaults.cardTitle,
    cardItems: hero?.cardItems?.length ? hero.cardItems : homeHeroDefaults.cardItems,
  };
  return {
    ...merged,
    headline: interpolate(merged.headline, settings),
    subhead: interpolate(merged.subhead, settings),
    note: interpolate(merged.note, settings),
    cardItems: merged.cardItems.map((item) => interpolate(item, settings)),
  };
}

/**
 * Splits a headline around the phrase that gets the gradient treatment, so the
 * effect survives an editor rewording the headline. Returns the whole headline
 * as `before` when the phrase is absent.
 */
export function splitHeadline(
  headline: string,
  highlight: string,
): { before: string; highlight: string; after: string } {
  if (!highlight) return { before: headline, highlight: "", after: "" };
  const at = headline.toLowerCase().indexOf(highlight.toLowerCase());
  if (at === -1) return { before: headline, highlight: "", after: "" };
  return {
    before: headline.slice(0, at),
    highlight: headline.slice(at, at + highlight.length),
    after: headline.slice(at + highlight.length),
  };
}
