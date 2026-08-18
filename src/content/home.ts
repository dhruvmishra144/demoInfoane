/**
 * Homepage copy, kept out of the components so marketing can edit it without
 * touching JSX.
 *
 * SEO notes worth preserving if you rewrite any of this:
 *  - Each service `title` doubles as the anchor text of an internal link to its
 *    service page. Keyword-descriptive anchors beat "Learn more" every time.
 *  - The FAQ entries are rendered as visible content AND as FAQPage structured
 *    data. Never put a question in the schema that a user cannot read on the
 *    page — Google treats that as a structured-data violation.
 *  - Headings are written to read naturally first and match search intent
 *    second. Do not stuff keywords; modern rankings punish it.
 */

import { servicePages } from "./services";

export type Service = {
  title: string;
  slug: string;
  summary: string;
  bullets: string[];
};

/**
 * Derived from the service pages so the homepage cards, the header dropdown,
 * the footer and the service pages themselves can never describe the same
 * service differently.
 */
export const services: Service[] = servicePages.map((service) => ({
  title: service.title,
  slug: service.slug,
  summary: service.summary,
  bullets: service.bullets,
}));

/**
 * The three numbered cards under the hero.
 */
export const pillars = [
  {
    step: "01",
    title: "Scope it properly",
    body: "A short paid discovery ends with a written scope, architecture options and a costed plan — yours to keep even if you build it elsewhere.",
  },
  {
    step: "02",
    title: "Ship every two weeks",
    body: "Working software in a real environment at the end of every sprint, so progress is something you can see rather than something you are told.",
  },
  {
    step: "03",
    title: "Hand it over cleanly",
    body: "Your repo, your cloud account, your CI from the first commit. Documentation and a walkthrough are part of delivery, not an upsell.",
  },
];

/**
 * The logo strip below the hero.
 *
 * These are the platforms we build on, not client logos — we do not have
 * permission to display client marks yet. Swap this for a client logo wall once
 * you do; it is a stronger trust signal. See CONTENT-TODO.md.
 */
export const platformStrip = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Kubernetes",
  "Snowflake",
  "Databricks",
  ".NET",
  "PostgreSQL",
];

/**
 * Engagement models, shown in the dark contained panel.
 *
 * This replaces the reference design's SaaS pricing table: a consultancy sells
 * engagement shapes, not per-seat plans. Rates are placeholders — see
 * CONTENT-TODO.md.
 */
export const engagementModels = [
  {
    name: "Discovery",
    tagline: "Start here if the scope is unclear",
    price: "[$X,000]",
    unit: "fixed",
    summary:
      "A short paid engagement that ends in a written scope, architecture options and a costed delivery plan. Yours to keep either way.",
    includes: [
      "Stakeholder interviews and system audit",
      "Target architecture with trade-offs",
      "Costed plan and delivery sequence",
      "No obligation to continue with us",
    ],
    popular: false,
  },
  {
    name: "Fixed scope",
    tagline: "Best when the outcome is well defined",
    price: "[$XX,000]",
    unit: "per project",
    summary:
      "A defined deliverable, a defined price. Changes run through an agreed change process rather than a renegotiation.",
    includes: [
      "Written scope and acceptance criteria",
      "Sprint demos and weekly reporting",
      "Automated tests and CI/CD",
      "Documented handover at completion",
    ],
    popular: true,
  },
  {
    name: "Dedicated team",
    tagline: "Best when the roadmap keeps moving",
    price: "[$X,XXX]",
    unit: "per person / month",
    summary:
      "Named engineers embedded in your team, working your process in your repository, scaling up or down as scope changes.",
    includes: [
      "Named candidates you interview",
      "Minimum [4]-hour overlap with your day",
      "Work tracked in your own backlog",
      "[30] days' notice to change team size",
    ],
    popular: false,
  },
];

export type Industry = { name: string; note: string };

export const industries: Industry[] = [
  { name: "Financial Services", note: "Payments, lending and regulatory reporting" },
  { name: "Healthcare & Life Sciences", note: "Patient platforms and clinical data" },
  { name: "Manufacturing & Logistics", note: "Supply chain visibility and shop-floor systems" },
  { name: "Retail & eCommerce", note: "Storefronts, order management and fulfilment" },
  { name: "SaaS & Technology", note: "Product engineering and platform scale-up" },
  { name: "Energy & Utilities", note: "Field operations and asset monitoring" },
];

export type ProcessStep = { step: string; title: string; body: string };

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    body: "A short paid discovery: we interview your stakeholders, audit the current system and leave you with a written scope, architecture options and a cost range — yours to keep either way.",
  },
  {
    step: "02",
    title: "Architect",
    body: "We agree the target architecture, security model and delivery plan before anyone writes production code, so estimates hold up and nothing surprising lands in month three.",
  },
  {
    step: "03",
    title: "Build",
    body: "Two-week sprints with a working demo at the end of each one. You see progress in a real environment, and priorities can change without renegotiating the contract.",
  },
  {
    step: "04",
    title: "Operate & Scale",
    body: "Monitoring, on-call runbooks and a documented handover. We can hand the system to your team, or keep running it under an SLA — your call.",
  },
];

export type CaseStudy = {
  client: string;
  industry: string;
  challenge: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  slug: string;
};

/**
 * PLACEHOLDER CONTENT. Every field here needs a real, client-approved story.
 * Get written permission before naming a client — most enterprise contracts
 * prohibit it, and "a Fortune 500 insurer" is fine when they say no.
 */
export const caseStudies: CaseStudy[] = [
  {
    client: "[CLIENT_NAME or 'A national insurance provider']",
    industry: "Financial Services",
    challenge:
      "[One sentence on the problem — the system, the constraint, the business cost of leaving it alone.]",
    outcome:
      "[One sentence on what was delivered and the measurable business result.]",
    metric: "[XX]%",
    metricLabel: "[faster claims processing]",
    slug: "[case-study-1-slug]",
  },
  {
    client: "[CLIENT_NAME or 'A global logistics operator']",
    industry: "Logistics",
    challenge: "[The problem in one sentence.]",
    outcome: "[The delivered outcome in one sentence.]",
    metric: "[XX]%",
    metricLabel: "[lower cloud spend]",
    slug: "[case-study-2-slug]",
  },
  {
    client: "[CLIENT_NAME or 'A B2B SaaS platform']",
    industry: "SaaS",
    challenge: "[The problem in one sentence.]",
    outcome: "[The delivered outcome in one sentence.]",
    metric: "[X]x",
    metricLabel: "[release frequency]",
    slug: "[case-study-3-slug]",
  },
];

export type Testimonial = { quote: string; name: string; role: string; company: string };

/** PLACEHOLDER CONTENT — do not publish unattributed or invented quotes. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "[Verbatim client quote. The useful ones name a specific problem and a specific result rather than calling the team 'great to work with'.]",
    name: "[First client full name]",
    role: "[Job title]",
    company: "[Company, with permission to be named]",
  },
  {
    quote: "[Second verbatim client quote.]",
    name: "[Second client full name]",
    role: "[Job title]",
    company: "[Company]",
  },
];

export const techStack: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "React Native", "Flutter"] },
  { group: "Backend", items: [".NET", "Node.js", "Java", "Python", "Go"] },
  { group: "Cloud", items: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform"] },
  { group: "Data & AI", items: ["Snowflake", "Databricks", "PostgreSQL", "dbt", "LangChain"] },
];

export type Faq = { question: string; answer: string };

/**
 * These render as visible <details> content and as FAQPage JSON-LD.
 * Questions are phrased the way buyers actually search, which is what earns
 * long-tail traffic and AI-overview citations.
 */
export const faqs: Faq[] = [
  {
    question: "What services does Infotech provide?",
    answer:
      "We are an IT consulting and software development company. We build custom web, mobile and back-office applications, migrate workloads to AWS, Azure and Google Cloud, modernize legacy systems, build data platforms and analytics, implement AI and automation, and provide dedicated engineering teams that work alongside your in-house staff.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Cost depends on scope, integrations and compliance requirements, so we do not quote a single number up front. A focused MVP typically runs [$XX,000–$XXX,000] and a multi-team enterprise programme is priced per sprint or per team. Our paid discovery phase ends with a written scope and a costed delivery plan, so you can commit to the build with a real number rather than an estimate.",
  },
  {
    question: "What engagement models do you offer?",
    answer:
      "Three: fixed-scope projects for well-defined deliverables, time-and-materials for evolving product work, and dedicated teams billed monthly for long-running engagements. Most clients start with a short discovery engagement and then pick the model that fits what discovery found.",
  },
  {
    question: "How quickly can a team start?",
    answer:
      "Discovery usually begins within [1–2] weeks of a signed agreement. A full delivery team is typically staffed and onboarded within [2–4] weeks, depending on the specialisms involved.",
  },
  {
    question: "Who owns the code and the intellectual property?",
    answer:
      "You do. Our contracts assign all IP, source code and documentation to you on payment, and everything lives in your repositories and cloud accounts from the first commit — not ours. You are never dependent on us to keep the system running.",
  },
  {
    question: "How do you handle security and compliance?",
    answer:
      "We work under NDA, follow least-privilege access on client systems, and run secure development practices including code review, dependency scanning and secrets management. We hold [ISO 27001 / SOC 2 Type II] and have delivered under [GDPR, HIPAA, PCI-DSS] requirements. We can work inside your own security tooling and review process.",
  },
  {
    question: "Do you work with our existing in-house engineers?",
    answer:
      "Yes, and that is most of what we do. Our teams join your sprint rituals, your repository and your code standards. We are also happy to be measured on how well your team can maintain the system after we leave — documentation and handover are part of every engagement.",
  },
];
