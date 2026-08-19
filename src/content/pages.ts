/**
 * Copy for the non-service pages: About, Industries, Technology, Case Studies,
 * Careers and Contact.
 *
 * Each page has its own metaTitle/metaDescription written for a different search
 * intent — duplicated or near-duplicated metadata across pages is one of the most
 * common reasons a multipage site underperforms a single page.
 */

/* ---------------------------------------------------------------- About ---- */

export const about = {
  metaTitle: "About Us",
  metaDescription:
    "Infoane is an IT consulting and software development company. Meet the team, how we work, and the principles we hold to on every engagement.",
  heading: "An engineering firm, not a body shop",
  intro: [
    "Infoane was founded in [YYYY] to do consulting work the way its founders wanted to be treated as clients: senior people on the engagement, an honest opinion when the brief is wrong, and a system the client can run without us.",
    "Today we are [XX] engineers, QA specialists and DevOps practitioners working with [industries you serve] across [regions you serve]. We are large enough to staff a full delivery team and small enough that the people who scope your project are the people who build it.",
  ],
  principles: [
    {
      title: "The senior people are on the work",
      body: "The engineer who scopes your project is on the delivery team. We do not win work with architects and staff it with juniors.",
    },
    {
      title: "We will tell you not to build it",
      body: "If configuration solves it, or if the honest answer is that the project is not worth its cost, you will hear that from us before you spend the budget.",
    },
    {
      title: "You own everything",
      body: "Code, infrastructure and documentation live in your accounts from the first commit, and IP transfers on payment. No dependency on us by design.",
    },
    {
      title: "Estimates are evidence-based",
      body: "Numbers come out of a discovery phase, not out of a sales meeting. When we are uncertain we give you a range and tell you what would narrow it.",
    },
    {
      title: "Bad news travels fast",
      body: "Slippage and risk surface in the next status update, not at the deadline. There is no version of this that improves with delay.",
    },
    {
      title: "We optimise for handover",
      body: "Documentation, tests and pairing are part of delivery. If you take the system in-house afterwards, we did our job.",
    },
  ],
  /**
   * PLACEHOLDER. Leadership bios are the strongest E-E-A-T signal an agency has —
   * real names, real backgrounds, linked LinkedIn profiles. Do not publish
   * invented people.
   */
  leadership: [
    {
      name: "[Full name]",
      role: "[Founder & CEO]",
      bio: "[Two sentences: relevant background, years in the field, what they own here. Link the LinkedIn profile.]",
      linkedin: "https://www.linkedin.com/in/[handle]",
    },
    {
      name: "[Full name]",
      role: "[CTO / Head of Delivery]",
      bio: "[Two sentences of real background.]",
      linkedin: "https://www.linkedin.com/in/[handle]",
    },
    {
      name: "[Full name]",
      role: "[Head of Engineering]",
      bio: "[Two sentences of real background.]",
      linkedin: "https://www.linkedin.com/in/[handle]",
    },
  ],
  milestones: [
    { year: "[YYYY]", event: "[Company founded in [city]]" },
    { year: "[YYYY]", event: "[First enterprise client / first office opened]" },
    { year: "[YYYY]", event: "[ISO 27001 certification achieved]" },
    { year: "[YYYY]", event: "[Team reached [XX] engineers]" },
  ],
};

/* ----------------------------------------------------------- Industries ---- */

export const industriesPage = {
  metaTitle: "Industries We Serve",
  // 156 characters — long enough to be useful, short enough not to be truncated.
  metaDescription:
    "IT consulting and software development for financial services, healthcare, manufacturing, logistics, retail, SaaS and energy — with the compliance context.",
  heading: "Industries we serve",
  intro: [
    "Regulated industries do not need engineers who learn the domain on the client's budget. These are the sectors where we have shipped repeatedly and already know which constraints are real.",
  ],
  detail: [
    {
      name: "Financial Services",
      slugId: "financial-services",
      body: "Payments, lending, and regulatory reporting, where an audit trail is a functional requirement and downtime has a per-minute cost. We work with PCI-DSS scope reduction, idempotent transaction handling, and reconciliation that does not depend on someone's spreadsheet.",
      focus: ["Payments and reconciliation", "Lending and origination platforms", "Regulatory and risk reporting"],
    },
    {
      name: "Healthcare & Life Sciences",
      slugId: "healthcare",
      body: "Patient-facing platforms and clinical data systems, where privacy rules shape architecture rather than decorate it. We have delivered under [HIPAA / GDPR] requirements with data minimisation, consent tracking and audit logging designed in from the start.",
      focus: ["Patient portals and scheduling", "Clinical and claims data integration", "Consent and audit trails"],
    },
    {
      name: "Manufacturing & Logistics",
      slugId: "manufacturing-logistics",
      body: "Supply chain visibility, warehouse and shop-floor systems, where the software has to keep working when the network does not. Offline-tolerant clients, integration with legacy machinery and ERP, and event pipelines that survive a burst.",
      focus: ["Supply chain visibility", "Warehouse and shop-floor systems", "ERP and machine integration"],
    },
    {
      name: "Retail & eCommerce",
      slugId: "retail-ecommerce",
      body: "Storefronts, order management and fulfilment, where peak traffic is a known date and a checkout outage is measured in lost revenue. Load-tested paths, inventory consistency across channels, and integrations that fail gracefully.",
      focus: ["Storefront performance", "Order and inventory management", "Marketplace and 3PL integration"],
    },
    {
      name: "SaaS & Technology",
      slugId: "saas-technology",
      body: "Product engineering and platform scale-up for software companies, including the unglamorous parts: multi-tenancy, entitlements, usage metering and the migration off the architecture that got you to your first thousand customers.",
      focus: ["Multi-tenant architecture", "Usage metering and billing", "Platform scale-up and cost control"],
    },
    {
      name: "Energy & Utilities",
      slugId: "energy-utilities",
      body: "Field operations and asset monitoring, where data arrives from equipment that was not designed to be on a network. Time-series ingestion, edge-to-cloud pipelines, and interfaces engineers can use with gloves on.",
      focus: ["Asset and telemetry monitoring", "Field service applications", "Time-series data platforms"],
    },
  ],
};

/* ----------------------------------------------------------- Technology ---- */

export const technologyPage = {
  metaTitle: "Our Technology Stack",
  metaDescription:
    "The technologies we build with: React, Next.js, .NET, Node.js, Python, AWS, Azure, Kubernetes, Snowflake, dbt and more — and how we choose between them.",
  heading: "Technology we build with",
  intro: [
    "We pick the boring, proven tool unless there is a specific reason not to. A stack you can still hire for in five years matters more than one that is exciting this quarter — you inherit the maintenance, not us.",
    "Below is what we work in most. If your stack is not listed, ask: the list reflects what clients run, not the limit of what we will work on.",
  ],
  groups: [
    {
      group: "Frontend",
      body: "Component-driven interfaces with server rendering where SEO or first-load performance matters.",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Flutter"],
    },
    {
      group: "Backend",
      body: "Long-lived server platforms chosen to match your team's existing skills wherever possible.",
      items: [".NET", "Node.js", "Java", "Python", "Go", "FastAPI"],
    },
    {
      group: "Cloud & DevOps",
      body: "Infrastructure as code, reproducible environments and pipelines that deploy on merge.",
      items: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "Docker", "GitHub Actions"],
    },
    {
      group: "Data",
      body: "Warehouses and pipelines with tested, version-controlled metric definitions.",
      items: ["Snowflake", "Databricks", "BigQuery", "PostgreSQL", "SQL Server", "dbt", "Airflow", "Kafka"],
    },
    {
      group: "AI",
      body: "Retrieval, evaluation and human-in-the-loop review around frontier and self-hosted models.",
      items: ["Claude", "OpenAI", "LangChain", "pgvector", "Pinecone"],
    },
    {
      group: "Quality & Observability",
      body: "Automated testing and production visibility, treated as delivery scope rather than an extra.",
      items: ["Playwright", "Jest", "xUnit", "pytest", "Prometheus", "Grafana", "OpenTelemetry"],
    },
  ],
  principles: [
    {
      title: "Managed over self-hosted",
      body: "We run a database or a cluster yourself only when there is a cost, latency or compliance reason. Undifferentiated operations work is not a good use of your budget.",
    },
    {
      title: "Your team's stack wins ties",
      body: "Where two options are close, we pick the one your engineers already know. Handover is part of the design.",
    },
    {
      title: "No framework of the month",
      body: "New dependencies need a reason beyond novelty, and anything load-bearing has to have a maintained release history.",
    },
  ],
};

/* --------------------------------------------------------- Case studies ---- */

export const caseStudiesPage = {
  metaTitle: "Case Studies & Client Results",
  metaDescription:
    "How we helped clients modernize legacy systems, migrate to the cloud and ship faster — the problem, the approach and the measurable outcome in each case.",
  heading: "Case studies",
  intro: [
    "Each of these is described the way we would describe it to your board: what was broken, what we did, and what changed as a result. Where a client cannot be named, the sector and the numbers are still real.",
  ],
};

/* -------------------------------------------------------------- Careers ---- */

export const careersPage = {
  metaTitle: "Careers",
  metaDescription:
    "Work at Infoane. Open engineering, QA and DevOps roles, how our hiring process works, and what to expect from working here.",
  heading: "Build systems that stay built",
  intro: [
    "We hire people who want to own outcomes rather than tickets. That means talking to clients, disagreeing with a brief when it is wrong, and writing the documentation you would want to inherit.",
  ],
  benefits: [
    { title: "[Remote-first / hybrid]", body: "[Describe the actual working model, including office expectations.]" },
    { title: "[Learning budget]", body: "[Annual amount and what it covers.]" },
    { title: "[Health cover]", body: "[What is covered, and for whom.]" },
    { title: "[Paid leave]", body: "[Days per year, plus policy on public holidays.]" },
  ],
  hiringProcess: [
    { step: "01", title: "Application review", body: "A person reads it. You hear back either way within [one week]." },
    { step: "02", title: "Intro conversation", body: "[30] minutes on your background and what you want next." },
    { step: "03", title: "Technical conversation", body: "A discussion of real problems — no whiteboard algorithm puzzles." },
    { step: "04", title: "Offer", body: "Written offer with the salary band stated up front." },
  ],
  /**
   * PLACEHOLDER. Replace with real openings, and remove the section entirely if
   * you are not hiring — an empty or stale careers page costs you credibility.
   * Real openings should also carry JobPosting structured data; see
   * CONTENT-TODO.md.
   */
  openings: [
    {
      title: "[Senior Full-Stack Engineer]",
      location: "[City / Remote]",
      type: "[Full-time]",
      summary: "[Two lines on the role and the stack.]",
    },
    {
      title: "[DevOps / Platform Engineer]",
      location: "[City / Remote]",
      type: "[Full-time]",
      summary: "[Two lines on the role and the stack.]",
    },
    {
      title: "[QA Automation Engineer]",
      location: "[City / Remote]",
      type: "[Full-time]",
      summary: "[Two lines on the role and the stack.]",
    },
  ],
};

/* -------------------------------------------------------------- Contact ---- */

export const contactPage = {
  metaTitle: "Contact Us",
  metaDescription:
    "Talk to an engineer, not an account manager. Email or call Infoane to book a free consultation about your software, cloud or data project.",
  heading: "Tell us what is slowing your systems down",
  intro: [
    "Book a free consultation and you will speak to an engineer who has shipped work like yours. You will leave with a concrete opinion on your options, whether or not you hire us.",
  ],
  expectations: [
    "A reply within [one business day]",
    "An NDA before you share anything sensitive, on request",
    "No obligation, and no sales sequence afterwards",
  ],
};

/* ----------------------------------------------------------------- Home ---- */

export const homePage = {
  metaTitle: "IT Consulting & Custom Software Development Company",
  metaDescription:
    "Infoane is an IT consulting and custom software development company helping enterprises modernize legacy systems, move to the cloud, and ship software faster.",
  heading: "IT consulting and custom software for modern enterprises",
  intro: [
    "We modernise the systems your business runs on, move them to the cloud, and build the software your competitors cannot buy off-the-shelf. Senior engineers, honest scoping, and a working demo every two weeks.",
  ],
};

/* ------------------------------------------------------------- Services ---- */

export const servicesPage = {
  metaTitle: "IT Services & Software Development Services",
  metaDescription:
    "Our services: custom software development, cloud migration and DevOps, legacy modernization, data engineering, AI automation and dedicated development teams.",
  heading: "What we do",
  intro: [
    "Six practices covering the full lifecycle of a system — from the first architecture decision to running it at scale in production.",
    "Most clients start with one and expand. If you are not sure which applies, describe the problem and we will tell you, including when the answer is that you do not need us.",
  ],
};

/* ---------------------------------------------------------------- Legal ---- */

/**
 * The bracketed bodies are a checklist of what each document has to cover, not
 * drafted text — both pages stay noindexed until a qualified professional has
 * reviewed real copy. Editors can now replace them without a deploy.
 */
export const privacyPage = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Infoane collects, uses and protects personal information submitted through this website.",
  heading: "Privacy Policy",
  intro: [
    "This page is a placeholder structure and is excluded from search engines until the final text is in place.",
  ],
  blocks: [
    {
      title: "Who we are",
      body: "[Legal entity name, registered address, and the contact details of the person or team responsible for data protection enquiries. Name your Data Protection Officer if you are required to have one.]",
    },
    {
      title: "What information we collect",
      body: "[List each category: information submitted through forms or email, information collected automatically such as IP address and browser type, and anything collected via cookies or analytics. Be specific — vague categories are the most common weakness in a policy.]",
    },
    {
      title: "Why we collect it and our lawful basis",
      body: "[For each purpose — answering enquiries, delivering services, recruitment, marketing — state the purpose and the lawful basis you rely on (consent, contract, legitimate interests, legal obligation).]",
    },
    {
      title: "Cookies and analytics",
      body: "[Which cookies you set, which are strictly necessary, and which require consent. Name your analytics provider and link its policy. If you deploy anything beyond strictly necessary cookies, you need a consent banner before it loads — the site does not have one yet.]",
    },
    {
      title: "Who we share information with",
      body: "[Named categories of processors: hosting, email, CRM, analytics. State whether data is transferred outside its country of origin and what safeguards apply.]",
    },
    {
      title: "How long we keep it",
      body: "[Retention period per category, and what triggers deletion.]",
    },
    {
      title: "Your rights",
      body: "[Access, correction, deletion, portability, objection, and withdrawal of consent — plus how to exercise them, how quickly you will respond, and which regulator a visitor can complain to.]",
    },
    {
      title: "Security",
      body: "[The measures you actually take: encryption in transit and at rest, access control, staff training, breach notification process. Do not describe controls you do not have.]",
    },
    {
      title: "Changes to this policy",
      body: "[How you notify people about changes, and the date this version took effect.]",
    },
  ],
};

export const termsPage = {
  metaTitle: "Terms of Service",
  metaDescription:
    "Terms governing use of the Infoane website, including permitted use, intellectual property and limitation of liability.",
  heading: "Terms of Service",
  intro: [
    "This page is a placeholder structure and is excluded from search engines until the final text is in place.",
  ],
  blocks: [
    {
      title: "Acceptance of terms",
      body: "[State that using the site constitutes acceptance, and how you notify visitors of changes.]",
    },
    {
      title: "Use of this website",
      body: "[Permitted and prohibited use: no scraping beyond what robots.txt allows, no attempts to disrupt the service, no misuse of contact channels.]",
    },
    {
      title: "Intellectual property",
      body: "[Who owns the site content, trade marks and logos, and what visitors may quote or reproduce. Note separately that client project IP transfers to the client under your services agreement.]",
    },
    {
      title: "Content accuracy",
      body: "[Site content is informational; nothing on it is an offer or a professional recommendation for a specific situation.]",
    },
    {
      title: "Third-party links",
      body: "[You are not responsible for the content or practices of sites you link to.]",
    },
    {
      title: "Limitation of liability",
      body: "[The limitation you and your counsel decide on, within what the applicable jurisdiction permits.]",
    },
    {
      title: "Governing law",
      body: "[Which jurisdiction's law applies and where disputes are heard.]",
    },
    {
      title: "Contact",
      body: "[Where to send questions about these terms.]",
    },
  ],
};

/* ------------------------------------------------------------------ 404 ---- */

export const notFoundPage = {
  metaTitle: "Page not found",
  metaDescription:
    "The page you are looking for does not exist or has moved. Browse our services or get in touch instead.",
  heading: "We cannot find that page",
  intro: ["The link may be out of date, or the page may have moved. Here is the way back."],
};
