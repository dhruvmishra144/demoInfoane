/**
 * Copy for the 2026 redesign (home, about, AI, careers, contact).
 *
 * Wording follows the design mockups. Company-level facts that also live in
 * the CMS — name, email, services, leadership — are still read from D1 by the
 * pages; this file holds the section copy the CMS has no fields for yet.
 *
 * Same rule as src/config/site.ts: anything in [BRACKETS] is a placeholder that
 * must be replaced with a real, consented value before launch. People's names
 * and photos in particular are never invented here.
 */

import { routes, serviceHref } from "@/lib/routes";
import type { StepIconName } from "@/components/design/StepIcon";

export type IconName =
  | "monitor"
  | "phone"
  | "check"
  | "database"
  | "cloud"
  | "chip"
  | "globe"
  | "shield"
  | "code"
  | "chart"
  | "lock"
  | "file";

/* ------------------------------------------------------------------ shared */

/**
 * The three offices, as the design's location cards describe them. Keep in
 * step with the `offices` in site settings — those carry the full street
 * addresses Google matches against.
 */
export const locations = [
  {
    city: "Atlanta, USA",
    role: "Headquarters",
    body: "Headquarters · Strategic planning, client partnerships, and delivery oversight.",
  },
  {
    city: "Hyderabad, India",
    role: "Engineering Hub",
    body: "Engineering Hub · Core delivery, architecture, and 24/7 monitoring operations.",
  },
  {
    city: "Bengaluru, India",
    role: "Modernization Studio",
    body: "Modernization Studio · Legacy migrations, QA automation, and platform modernization.",
  },
];

/** One-line office list for the contact cards. Keep in step with site settings. */
export const officeLine = "Frisco, Texas · Hyderabad, India · Kovilpatti, India";

/**
 * The footer's Services column. The names are the ones the company lists
 * publicly; each links to the closest service page that exists today, or to
 * the services index where there is no dedicated page yet.
 */
export const footerServices = [
  { label: "Web Application", href: serviceHref("custom-software-development") },
  { label: "Web Designing", href: routes.services },
  { label: "Mobile App Development", href: serviceHref("custom-software-development") },
  { label: "Quality Assurance", href: routes.services },
  { label: "Remote DBA", href: routes.services },
  { label: "Cloud Services", href: serviceHref("cloud-migration-devops") },
  { label: "DevOps", href: serviceHref("cloud-migration-devops") },
];

export const foundedYear = "2011";

/* -------------------------------------------------------------------- home */

export const home = {
  hero: {
    headline: "Every system we build starts as someone else's bottleneck.",
    subhead:
      "Infoane is an engineering partner for companies who've outgrown their own roadmap — data platforms, product teams, and infrastructure rebuilt by people who've shipped them before.",
    primaryCta: { label: "See how we work", href: "#approach" },
    secondaryCta: { label: "Read the client stories", href: routes.caseStudies },
    note: `Working with teams across manufacturing, fintech, and healthcare since ${foundedYear}.`,
  },
  about: {
    eyebrow: "About us",
    title: "A partner built to help software teams move faster.",
    body: "We help product, engineering, and operations teams modernize legacy systems, improve performance, and keep critical applications running smoothly. From strategy to delivery, our team brings hands-on expertise and a practical approach that helps teams ship better software, faster.",
    link: { label: "More about Infoane", href: routes.about },
    statsLabel: "By the numbers",
    stats: [
      { value: "12+", label: "years delivering software" },
      { value: "100+", label: "clients across three continents" },
      { value: "3", label: "offices in the US and India" },
      { value: "24×7", label: "monitoring and support coverage" },
    ],
    statsNote:
      "We partner with growing teams to build reliable products, scale engineering capacity, and keep operations running smoothly around the clock.",
  },
  coldfusion: {
    eyebrow: "Strongest service",
    title: "Become a ColdFusion partner",
    body: "We move complex ColdFusion applications from outdated versions to modern environments with minimal disruption, better security, and a clearer path forward.",
    kicker: "Become a ColdFusion partner",
    primaryCta: { label: "Start a discovery call", href: routes.contact },
    secondaryCta: {
      label: "View migration process",
      href: serviceHref("application-modernization"),
    },
    image: "/images/coldfusion-summit.webp",
    imageAlt: "An Infoane engineer presenting on stage at the Adobe ColdFusion Summit",
    badgeTitle: "Partner-ready service",
    badgeBody:
      "Legacy CF Migration is our strongest service for teams that need a reliable, hands-on migration partner.",
  },
  services: {
    eyebrow: "Our services",
    title: "Accelerate your business with the right technology, expertly delivered",
    cta: { label: "Explore all services", href: routes.services },
    items: [
      {
        icon: "monitor" as IconName,
        title: "ColdFusion Modernization",
        points: ["Scalable, secure architectures", "Built for real business value"],
        href: serviceHref("application-modernization"),
      },
      {
        icon: "phone" as IconName,
        title: "Mobile App Development",
        points: ["Native & cross-platform", "Performance without compromise"],
        href: serviceHref("custom-software-development"),
      },
      {
        icon: "check" as IconName,
        title: "Quality Assurance & Testing",
        points: ["Automated testing pipelines", "Speed, security, reliability"],
        href: routes.services,
      },
      {
        icon: "database" as IconName,
        title: "Database & DBA Services",
        points: ["24×7 monitoring & support", "Built to scale with your data"],
        href: routes.services,
      },
      {
        icon: "cloud" as IconName,
        title: "Cloud & DevOps",
        points: ["Cloud-native infrastructure", "Faster, safer deployments"],
        href: serviceHref("cloud-migration-devops"),
      },
      {
        icon: "chip" as IconName,
        title: "AI Services",
        points: ["Intelligent process automation", "Custom AI/ML & LLM integration"],
        href: routes.ai,
      },
    ],
  },
  ai: {
    eyebrow: "How we use AI",
    title: "AI that works inside your systems, not alongside them.",
    lead: "We don't bolt on a chatbot and call it AI. We integrate models, pipelines, and automation into the workflows your team actually runs.",
    cards: [
      {
        icon: "chip" as IconName,
        title: "ColdFusion Advanced AI Engineering Capabilities",
        body: "Replace brittle rule-based workflows with models that adapt. We build, train, and deploy automation that handles edge cases your current system can't.",
      },
      {
        icon: "database" as IconName,
        title: "LLM & RAG Integration",
        body: "Custom LLM pipelines grounded in your own data. We integrate retrieval-augmented generation into your product so answers come from your knowledge, not hallucination.",
      },
      {
        icon: "chip" as IconName,
        title: "Predictive Analytics",
        body: "Forecast demand, identify churn risk, and surface hidden trends before they impact the business. We turn raw data into clear, actionable signals.",
      },
    ],
    image: "/images/ai-team.webp",
    imageAlt: "Engineers working together at laptops in a bright office",
    footnote:
      "Every AI engagement includes model evaluation, data privacy review, and a production deployment plan.",
    cta: { label: "See our AI capabilities", href: routes.ai },
  },
  approach: {
    eyebrow: "Why choose us",
    title: "We embed, not just deliver.",
    kicker: "Our approach",
    subtitle: "Three ways we show up differently.",
    howEyebrow: "How it works",
    howTitle: "A model built for ownership.",
    howBody:
      "We start with context, then move into delivery with senior engineers who are accountable for the outcome, not just the output.",
    steps: [
      {
        icon: "scan" as StepIconName,
        title: "Understand first",
        body: "Understand the system as it actually runs today, not as the diagram says it does.",
      },
      {
        icon: "team" as StepIconName,
        title: "Embed senior engineers",
        body: "Put senior engineers directly inside your team, from week one.",
      },
      {
        icon: "launch" as StepIconName,
        title: "Ship and hand over",
        body: "Ship in weeks, not quarters, and hand over something your team can actually own.",
      },
    ],
  },
  industries: {
    eyebrow: "Industries",
    title: "Built for the complexity of your industry.",
    lead: "Deep domain knowledge across the sectors where systems can't afford to fail.",
    activeLabel: "Active industry",
    items: [
      {
        name: "Healthcare",
        headline: "Healthcare systems built for regulatory reality.",
        body: "We've rebuilt claims platforms, patient data pipelines, and compliance tooling for mid-size health systems — working within real constraints, not around them.",
        tagline: ["Claims systems.", "Patient data platforms.", "Compliance tooling."],
        points: [
          "Claims processing & adjudication systems",
          "HIPAA-compliant data platforms",
          "EHR integrations & interoperability",
          "Zero-downtime migration & legacy modernization",
        ],
        gradient: "from-[#d9584a] via-[#9e2f3a] to-[#3d1a2a]",
      },
      {
        name: "Fintech",
        headline: "Financial platforms that stay up when the market doesn't.",
        body: "Payment rails, ledgers, and risk engines modernized without pausing the business — with the audit trail regulators expect.",
        tagline: ["Payment rails.", "Ledger systems.", "Risk engines."],
        points: [
          "Core banking & ledger modernization",
          "PCI-DSS-aligned payment platforms",
          "Real-time fraud and risk scoring",
          "Regulatory reporting automation",
        ],
        gradient: "from-[#5b6cf0] via-[#3b3fa8] to-[#1a1c45]",
      },
      {
        name: "Manufacturing",
        headline: "Plant-floor data wired into the decisions above it.",
        body: "MES, ERP, and IoT signals connected into one reliable picture of production — so planners act on what is happening, not last week's export.",
        tagline: ["MES integration.", "IoT pipelines.", "ERP modernization."],
        points: [
          "MES and ERP integration",
          "Industrial IoT data pipelines",
          "Predictive maintenance models",
          "Legacy system modernization",
        ],
        gradient: "from-[#f08a4b] via-[#b8552e] to-[#3f1f14]",
      },
      {
        name: "Logistics",
        headline: "Supply chains that can see around the corner.",
        body: "Tracking, routing, and warehouse systems rebuilt for scale, with the visibility operations teams need when something goes wrong.",
        tagline: ["Shipment tracking.", "Route optimization.", "Warehouse systems."],
        points: [
          "Real-time shipment visibility",
          "Route and load optimization",
          "Warehouse management integrations",
          "Partner EDI and API platforms",
        ],
        gradient: "from-[#2fb3a0] via-[#1c6f6a] to-[#0f2a2c]",
      },
      {
        name: "Energy",
        headline: "Grid-scale systems engineered for uptime.",
        body: "Asset monitoring, metering, and field-operations platforms built for environments where downtime is measured in megawatts.",
        tagline: ["Asset monitoring.", "Smart metering.", "Field operations."],
        points: [
          "SCADA and telemetry data platforms",
          "Smart metering and billing systems",
          "Field workforce applications",
          "24×7 monitoring and incident response",
        ],
        gradient: "from-[#e8b43c] via-[#b0722a] to-[#3b2410]",
      },
    ],
  },
  contact: {
    title: "Tell us what you need built",
    lead: "We reply within one business day.",
    nextLabel: "What happens next",
    steps: [
      {
        when: "Day one",
        title: "A delivery lead reads it",
        body: "Not a form queue. The person who would run the work.",
      },
      {
        when: "Day two",
        title: "Thirty minutes on a call",
        body: "We ask what is running today and what is breaking.",
      },
      {
        when: "Week one",
        title: "An approach and a timeline",
        body: "Written down, including the response times we commit to.",
      },
    ],
  },
};

/* ------------------------------------------------------------------- about */

export const aboutPage = {
  hero: {
    eyebrow: "About us",
    title: "We build systems that keep engineering teams moving.",
    body: `Founded in ${foundedYear} on a simple premise — companies shouldn't have to choose between speed and stability. We embed directly into product teams, clearing roadblocks and scaling architectures so the work never stops.`,
  },
  visionMission: "Vision & mission",
  mission: {
    eyebrow: "Our mission",
    title: "To turn technical debt into operational leverage.",
    body: "We believe the best systems are invisible. Our mission is to embed senior engineers who solve the hardest bottlenecks — so that internal product roadmaps are driven by choice, not by technical limitations.",
    image: "/images/mission-team.webp",
    imageAlt: "Infoane engineers talking around a meeting table",
  },
  vision: {
    eyebrow: "Our vision",
    title: "A world where legacy code never limits product ambition.",
    body: "We envision a standard of technology partnerships where handovers are total, outcomes are measurable, and engineering capability scales elegantly across borders.",
    image: "/images/vision-engineer.webp",
    imageAlt: "An Infoane engineer working on a laptop",
  },
  trusted: {
    eyebrow: "Trusted by",
    title: "Engineering partners to world-class teams.",
    lead: "From healthcare platforms to fintech infrastructure — we've shipped alongside the best.",
    // Naming a client publicly needs their written permission. Confirm each
    // one before launch, and remove any that has not agreed.
    clients: [
      { name: "Infotech", sector: "Healthcare", span: "lg:col-span-3" },
      { name: "JumpstartMD", sector: "Healthcare", span: "lg:col-span-4", warm: true },
      { name: "Knova", sector: "Enterprise Software", span: "lg:col-span-3" },
      { name: "Selectica", sector: "Enterprise Software", span: "lg:col-span-3" },
      { name: "Tagit Solutions", sector: "Logistics", span: "lg:col-span-3" },
      { name: "Trimble", sector: "Manufacturing", span: "lg:col-span-4" },
      { name: "YottaMark", sector: "Supply Chain", span: "lg:col-span-4", warm: true },
      { name: "ZAP", sector: "Fintech", span: "lg:col-span-3" },
      { name: "Bombardier", sector: "Manufacturing", span: "lg:col-span-5" },
    ],
    footnote:
      "and 40+ more companies across healthcare, fintech, logistics and enterprise software",
  },
  expertise: {
    eyebrow: "Our expertise",
    title: "A decade of engineering depth, shipped.",
    image: "/images/expertise-orb.webp",
    items: [
      {
        icon: "phone" as IconName,
        title: "Mobile Development",
        body: "Flutter-powered cross-platform apps with enterprise-grade architecture.",
      },
      {
        icon: "globe" as IconName,
        title: "Web Development",
        body: "ColdFusion modernization and full-stack web systems at scale.",
      },
      {
        icon: "shield" as IconName,
        title: "Quality Assurance",
        body: "Selenium-driven automated testing pipelines with zero regression tolerance.",
      },
    ],
  },
  success: {
    eyebrow: "Client success",
    title: "What engineering teams say about us.",
    stat: { value: "40+", label: "Success Stories" },
    // Quotes are attributed by role and company only. Confirm each client is
    // happy to be quoted before launch — the same consent rule as case studies.
    quotes: [
      {
        quote:
          "Infoane didn't just rebuild our claims platform — they taught our team how to think about it differently. Latency dropped 90% and our roadmap opened up overnight.",
        role: "VP of Engineering",
        company: "[Client company]",
      },
      {
        quote:
          "Our legacy ColdFusion system was a complete bottleneck for Series B scaling. Infoane modernized the platform gracefully, migrating users in cohorts with zero down-time.",
        role: "CTO",
        company: "[Client company]",
      },
      {
        quote:
          "What sets Infoane apart is their willingness to own the outcome. They don't just consult — they ship. Our database architecture is unrecognizable, in the best way.",
        role: "Director of Platform Engineering",
        company: "[Client company]",
      },
    ],
    storyLabel: "Read the full story",
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Accountable for your engineering outcome.",
    lead: "Our leaders are hands-on architects who have shipped major platforms. Direct engineering accountability, no intermediaries.",
    groups: ["Operations", "Delivery"],
  },
  cta: {
    eyebrow: "Get started",
    title: "Ready to clear your roadmap constraints?",
    body: "Connect with our principal architects to diagnose your application bottlenecks and discuss a reliable timeline.",
    primary: { label: "Book a discovery consultation", href: routes.contact },
    secondary: { label: "See how we work", href: "/#approach" },
  },
};

/* ---------------------------------------------------------------------- AI */

export const aiPage = {
  metaTitle: "AI Engineering & Safety",
  metaDescription:
    "Custom retrieval architectures, predictive models and AI-assisted testing — built into your production systems with data isolation and human oversight.",
  hero: {
    eyebrow: "Capabilities",
    title: "Where AI transforms real-world production",
    body: "We don't bolt on generic templates. We build custom retrieval architectures, auto-scaling inference endpoints, and self-correcting testing loops that optimize your workflow natively.",
  },
  capabilities: [
    {
      icon: "chip" as IconName,
      title: "Intelligent Automation",
      body: "Automate edge cases that standard code scripts can't resolve. We train models on your historical system decisions to handle complex routing and exceptions automatically.",
    },
    {
      icon: "code" as IconName,
      title: "AI-Assisted Development",
      body: "Increase developer velocity without losing architectural rigor. We set up isolated code generators trained on your team's strict style guides and documentation.",
    },
    {
      icon: "chart" as IconName,
      title: "Predictive Analytics",
      body: "Forecast server demands, trace churn patterns, and optimize resource allocation. We plug neural models straight into your live databases safely.",
    },
    {
      icon: "shield" as IconName,
      title: "Smart Testing & QA",
      body: "Evolve beyond brittle click-path testing. We deploy autonomous agents that run continuous exploratory testing on your staging builds with complete regression coverage.",
    },
  ],
  framework: {
    eyebrow: "Our framework",
    title: "Responsible AI by design, not as an afterthought",
    image: "/images/ai-globe-hands.webp",
    imageAlt: "Gloved hands holding a glowing circuit-board globe in a server room",
    items: [
      {
        title: "Radical Transparency",
        body: "Every recommendation or model prediction is trace-mapped with clear confidence bounds. No unexplainable black-box models in core system logic.",
      },
      {
        title: "Human Oversight (HITL)",
        body: "Our automated pipelines carry fallback systems that route low-confidence calculations back to expert engineers before any write actions occur.",
      },
      {
        title: "Proactive Bias Prevention",
        body: "We perform strict semantic sanitization on input parameters and train datasets across diversified parameters to enforce neutral, fair outcomes.",
      },
    ],
  },
  isolation: {
    eyebrow: "Zero breach architecture",
    title: "Absolute data isolation. Zero leaks.",
    lead: "We guarantee your code, system logs, and user queries will never enter public training sets. We engineer self-contained runtime boxes that secure every parameter internally.",
    image: "/images/ai-secure-lock.webp",
    imageAlt: "A glowing padlock with a shield, floating in a server corridor",
    cards: [
      {
        icon: "lock" as IconName,
        title: "Strict Data Isolation",
        body: "Every client gets an independent virtual database instance. Models run in secure sandbox pods with strictly zero crossover pipeline risks.",
        tone: "light",
      },
      {
        icon: "database" as IconName,
        title: "End-to-End Cryptography",
        body: "Data is heavily encrypted in transit (TLS 1.3) and at rest (AES-256). Even our operations squads cannot view raw model payload values.",
        tone: "coral",
      },
      {
        icon: "file" as IconName,
        title: "Regulatory Compliance",
        body: "Infoane runs audits against SOC2 Type II and GDPR framework guidelines continuously. Automated pentests verify zero data-breach security.",
        tone: "dark",
      },
      {
        icon: "check" as IconName,
        title: "Continuous Security Audits",
        body: "Automated vulnerability scans and penetration tests run continuously so every model deployment stays hardened against emerging threats.",
        tone: "light",
      },
    ],
  },
  values: {
    eyebrow: "Engineering values",
    title: "Our core commitment to safe code execution",
    items: [
      {
        title: "Privacy by Design",
        body: "We build models directly with privacy-enforcing logic. Parameters are stripped of PII before entering any model pipelines.",
      },
      {
        title: "Continuous Monitoring",
        body: "Real-time anomaly detectors audit drift, semantic errors, and token costs continuously across production models.",
      },
      {
        title: "Human in the Loop",
        body: "System changes are always triggered, observed, or signed off by expert human validation squads.",
      },
      {
        title: "Client Data Sovereignty",
        body: "You retain total ownership of all inputs and model outcomes. No weights are repurposed for other public models.",
      },
      {
        title: "Transparent AI",
        body: "Every system output is query-traceable back to its semantic roots, making system audits highly intuitive.",
      },
      {
        title: "Ethical Governance",
        body: "Our AI systems map tightly to modern safety rules (NIST / EU AI Act framework limits) directly out of the box.",
      },
    ],
  },
  cta: {
    eyebrow: "Get started safely",
    title: "Ready to leverage AI safely?",
    body: "Connect with our principal AI architects to diagnose your legacy system bottlenecks and draft a zero-breach automation timeline.",
    primary: { label: "Book an AI safety consultation", href: routes.contact },
    secondary: { label: "See how we work", href: "/#approach" },
  },
};

/* ----------------------------------------------------------------- careers */

export const careersRedesign = {
  hero: {
    eyebrow: "Careers at Infoane",
    title: "Join our team of builders, architects, and systems engineers.",
    body: "We embed directly with world-class product teams to turn technical debt into operational leverage. No fluff, no endless decks — just clean systems that ship on time.",
    primary: { label: "Explore Openings", href: "#openings" },
    secondary: { label: "Our Philosophy", href: routes.about },
  },
  benefits: {
    eyebrow: "Benefits & culture",
    title: "Built to sustain great engineering.",
    items: [
      {
        title: "Flexible remote-first work",
        body: "Work from anywhere with async clarity, shared documentation, and clear working hours so personal time stays personal.",
        image: "/images/benefit-remote.webp",
      },
      {
        title: "Learning & growth investment",
        body: "A yearly learning budget, certification support, and time set aside every sprint to go deeper on the craft.",
        image: "/images/inside-whiteboard.webp",
      },
      {
        title: "Health & wellness coverage",
        body: "Comprehensive health cover for you and your family, plus wellness days that don't come out of your leave.",
        image: "/images/inside-terrace.webp",
      },
      {
        title: "Competitive compensation & equity",
        body: "Pay benchmarked to the market and reviewed every year, with a clear path to ownership as you grow with us.",
        image: "/images/inside-hackathon.webp",
      },
    ],
  },
  voices: {
    eyebrow: "Team voices",
    title: "What our engineers say.",
    // Real quotes from real team members only, each with their consent.
    items: [
      {
        quote:
          "Infoane gave me ownership from day one. I lead complex migrations, mentor junior engineers, and ship systems that actually move the business forward.",
        name: "[Engineer name]",
        role: "Principal Systems Architect",
      },
      {
        quote:
          "I love how QA is treated as a first-class discipline here. We build test coverage that matters, and the delivery team actually uses it to ship faster.",
        name: "[Engineer name]",
        role: "Senior QA Delivery Lead",
      },
      {
        quote:
          "The infrastructure team is lean, but we move fast. We automate the right things, keep production stable, and actually get to improve the platform every sprint.",
        name: "[Engineer name]",
        role: "DevOps Engineer",
      },
      {
        quote:
          "I joined for the tech stack, but stayed for the team. We solve problems together, and there is always someone willing to help you level up.",
        name: "[Engineer name]",
        role: "Full-Stack Developer",
      },
    ],
  },
  impact: {
    eyebrow: "Our impact",
    title: "Work with purpose.",
    lead: "Be part of creating positive change and making the world better for our people, our clients, and the communities where we live and work.",
    items: [
      {
        image: "/images/impact-agritech.webp",
        alt: "A researcher checking crop data on a tablet in a greenhouse",
        caption: "Sustainable agriculture tech that helps growers make better decisions.",
      },
      {
        image: "/images/impact-craft.webp",
        alt: "Hands stitching a leather notebook at a workbench",
        caption: "Artisan craftsmanship that brings thoughtful design into every detail.",
      },
      {
        image: "/images/impact-datacenter.webp",
        alt: "A long corridor of illuminated server racks",
        caption: "Modern data infrastructure built to move fast and stay reliable.",
      },
    ],
  },
  inside: {
    eyebrow: "Workspace & events",
    title: "Inside Infoane.",
    photos: [
      { src: "/images/inside-whiteboard.webp", alt: "Engineers sketching an architecture on a whiteboard", className: "lg:col-span-2 lg:row-span-2" },
      { src: "/images/inside-desk.webp", alt: "An engineer at a standing desk by the window", className: "" },
      { src: "/images/inside-wall.webp", alt: "A gallery wall of framed circuit boards in the office", className: "" },
      { src: "/images/inside-hackathon.webp", alt: "A team mapping services on a whiteboard during a hackathon", className: "lg:col-span-2 lg:row-span-2" },
      { src: "/images/inside-terrace.webp", alt: "Colleagues having coffee on an office terrace", className: "" },
      { src: "/images/inside-code.webp", alt: "Code on a monitor in a dimly lit workspace", className: "" },
    ],
  },
  openings: {
    eyebrow: "Open positions",
    title: "Find your next role.",
    lead: "If none of these fit but you think you should be here, write to us anyway and say why.",
    applyLabel: "View role",
  },
  cta: {
    eyebrow: "Get started",
    title: "Ready to build something meaningful?",
    body: "Connect directly with our delivery team to learn more about our roadmap ownership model and how we ship better systems.",
    primary: { label: "View Open Positions", href: "#openings" },
    secondary: { label: "See how we work", href: "/#approach" },
  },
};

/* ----------------------------------------------------------------- contact */

export const contactRedesign = {
  eyebrow: "Contact us",
  title: "Let's build something together",
  lead: "Tell us about your technical challenges and we'll connect you with the right engineers.",
  formTitle: "Tell us what you need built",
  formLead: "We reply within one business day with direct engineer consultation.",
  steps: [
    {
      when: "Day one",
      title: "A delivery lead reviews your system state",
      body: "Not an account executive. A principal engineer who maps complex dependencies.",
    },
    {
      when: "Day two",
      title: "Thirty minutes on a technical call",
      body: "No presentation decks. We drill straight into what is running and what is breaking.",
    },
    {
      when: "Week one",
      title: "An operational roadmap proposal",
      body: "Complete with target milestones, resources, and zero-regression SLA commitments.",
    },
  ],
  band: {
    title: `Transforming businesses since ${foundedYear}`,
    body: "From legacy modernization to AI-powered systems, we help teams ship better software with a practical, hands-on approach.",
  },
};
