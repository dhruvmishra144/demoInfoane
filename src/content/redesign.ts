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
    city: "Frisco, USA",
    role: "Headquarters",
    body: "Headquarters · Strategic planning, client partnerships, and delivery oversight.",
  },
  {
    city: "Hyderabad, India",
    role: "Engineering Hub",
    body: "Engineering Hub · Core delivery, architecture, and 24/7 monitoring operations.",
  },
  {
    city: "Kovilpatti, India",
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
  { label: "Web Application", href: routes.webApplications },
  { label: "Web Designing", href: routes.services },
  { label: "Mobile App Development", href: routes.mobileApps },
  { label: "Quality Assurance", href: routes.services },
  { label: "Remote DBA", href: routes.services },
  { label: "Cloud Services", href: serviceHref("cloud-migration-devops") },
  { label: "DevOps", href: serviceHref("cloud-migration-devops") },
];

export const foundedYear = "2011";

/* -------------------------------------------------------------------- home */

export const home = {
  hero: {
    eyebrow: "Software Development & IT Services",
    headline: "Software Development & IT Services That Move Your Business Forward",
    subhead:
      "Build, modernize, and support the software and systems your business depends on. Infoane Technologies helps startups, growing businesses, and enterprises with custom software development, web and mobile applications, cloud, DevOps, data engineering, quality assurance, database services, and legacy modernization.",
    primaryCta: { label: "Talk to Our Experts", href: routes.contact },
    secondaryCta: { label: "Explore Our Services", href: routes.services },
    stats: [
      { value: "12+", label: "Years of Experience" },
      { value: "100+", label: "Clients Worldwide" },
      { value: "End-to-End", label: "Software & IT Capabilities" },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "A Software Development Company Built Around Your Business Needs",
    entity:
      "Infoane Technologies is a software development and IT services company with 12+ years of experience, serving businesses worldwide from locations in the United States and India.",
    paragraphs: [
      "Technology decisions have a direct impact on how your business operates, grows, and serves its customers. Infoane helps organizations build new software, improve existing applications, modernize legacy systems, and manage the infrastructure and data behind them.",
      "Our capabilities span custom software development, web and mobile applications, cloud and DevOps, data engineering, database administration, quality assurance, cybersecurity, and legacy modernization.",
      "From project planning and development to deployment and ongoing support, we work with business and technology teams to turn requirements into practical, maintainable solutions.",
    ],
    link: { label: "Learn More About Infoane", href: routes.about },
    cards: [
      {
        label: "Embedded delivery",
        caption: "Engineers who plan and build alongside your product and operations teams.",
        image: "/images/inside-whiteboard.webp",
        alt: "Three Infoane engineers sketching a system architecture on a glass whiteboard",
      },
      {
        label: "Always-on operations",
        caption: "Infrastructure, databases, and monitoring that keep critical systems running.",
        image: "/images/ai-globe-hands.webp",
        alt: "Gloved hands holding a glowing globe in front of a server rack",
      },
      {
        label: "Practical engineering",
        caption: "Clean, maintainable code across modern stacks and legacy platforms alike.",
        image: "/images/inside-code.webp",
        alt: "A developer typing at a keyboard with code on the monitor behind",
      },
    ],
    numbersLabel: "By the numbers",
    numbers: [
      { value: "12+", label: "Years delivering software" },
      { value: "100+", label: "Clients across industries" },
      { value: "3", label: "Offices in the US and India" },
      { value: "24×7", label: "Monitoring and support coverage" },
    ],
  },
  services: {
    eyebrow: "Software development & IT services",
    title: "Software Development and IT Services for Every Stage of Your Business",
    lead: "Whether you are building a new application, improving an existing platform, or modernizing a legacy environment, Infoane brings together software engineering and IT capabilities across the technology lifecycle.",
    cta: { label: "View All Services", href: routes.services },
    items: [
      {
        icon: "monitor" as IconName,
        title: "Web Application Development",
        body: "Build custom web applications around business requirements, users, integrations, performance needs, security considerations, and long-term maintainability.",
        href: routes.webApplications,
      },
      {
        icon: "phone" as IconName,
        title: "Mobile App Development",
        body: "Develop native and cross-platform mobile applications with a focus on usability, performance, quality, and ongoing application support.",
        href: routes.mobileApps,
      },
      {
        icon: "check" as IconName,
        title: "QA & Software Testing",
        body: "Validate applications through manual, automation, functional, performance, and other testing practices designed to improve quality and reduce release risk.",
        href: routes.services,
      },
      {
        icon: "database" as IconName,
        title: "Database & Remote DBA Services",
        body: "Keep critical databases running with administration, monitoring, performance tuning, backup, security, migration, upgrades, and production support.",
        href: routes.services,
      },
      {
        icon: "cloud" as IconName,
        title: "Cloud & DevOps",
        body: "Modernize infrastructure, automate software delivery, improve observability, and manage cloud and hybrid environments across the application lifecycle.",
        href: serviceHref("cloud-migration-devops"),
      },
      {
        icon: "chart" as IconName,
        title: "Data Engineering & Analytics",
        body: "Build data pipelines, integrations, warehouses, lakes, and analytics-ready environments that support reporting, business intelligence, advanced analytics, and AI-ready data initiatives.",
        href: serviceHref("data-engineering-analytics"),
      },
      {
        icon: "code" as IconName,
        title: "Legacy Application Modernization",
        body: "Modernize existing applications and technology environments while preserving the business processes and investments that continue to deliver value.",
        href: serviceHref("application-modernization"),
      },
      {
        icon: "shield" as IconName,
        title: "Cybersecurity",
        body: "Strengthen applications, infrastructure, identity, access, and data protection with security practices aligned to business and operational requirements.",
        href: routes.services,
      },
    ],
  },
  why: {
    eyebrow: "Why Infoane",
    title: "Engineering Expertise Backed by Practical Delivery",
    lead: "Technology projects need more than development skills. They need an understanding of business requirements, existing systems, technical constraints, and what it takes to keep applications running after deployment. Infoane brings software development and IT capabilities together to support projects from planning and development through modernization and ongoing support.",
    items: [
      {
        title: "Established Technology Expertise",
        body: "Work across established and modern technologies including Adobe ColdFusion, PHP, Python, Java, Angular, React, Node.js, cloud platforms, and DevOps technologies.",
      },
      {
        title: "ColdFusion Expertise",
        body: "Support and modernize business-critical ColdFusion applications with capabilities spanning development, maintenance, upgrades, migration, optimization, integrations, and cloud environments.",
      },
      {
        title: "End-to-End Delivery",
        body: "Bring development, testing, deployment, infrastructure, databases, modernization, and ongoing technical support together across the application lifecycle.",
      },
      {
        title: "Business-Focused Engineering",
        body: "Build solutions around practical requirements such as application performance, maintainability, operational efficiency, scalability, and long-term support.",
      },
      {
        title: "Flexible Engagement",
        body: "Choose an engagement approach that fits your project, including project-based development, dedicated teams, staff augmentation, and ongoing managed support where applicable.",
      },
      {
        title: "Global Client Experience",
        body: "Support businesses across different industries and geographies with software development and IT services designed around their technology and operational requirements.",
      },
    ],
  },
  coldfusion: {
    eyebrow: "ColdFusion spotlight",
    title: "ColdFusion Development and Modernization for Business-Critical Applications",
    paragraphs: [
      "Many organizations continue to rely on ColdFusion applications that support important business processes. Replacing these systems is not always the right first step.",
      "Infoane provides ColdFusion development and support for organizations that need to maintain, improve, modernize, or migrate existing applications.",
      "Whether you need ongoing application support or are planning a move to a modern platform, our ColdFusion capabilities cover the application lifecycle.",
    ],
    capabilities: [
      { title: "ColdFusion Application Development", body: "Build and extend applications using ColdFusion and CFML." },
      {
        title: "Legacy ColdFusion Support",
        body: "Maintain and support existing applications while addressing technical issues and evolving business requirements.",
      },
      {
        title: "ColdFusion Upgrades & Migration",
        body: "Upgrade ColdFusion environments or plan migration paths for applications that need a more modern foundation.",
      },
      {
        title: "ColdFusion to Lucee Migration",
        body: "Support migration from Adobe ColdFusion to Lucee within the CFML ecosystem.",
      },
      {
        title: "Performance Optimization",
        body: "Identify and address application performance issues to improve responsiveness and maintainability.",
      },
      {
        title: "API & System Integration",
        body: "Connect ColdFusion applications with APIs, third-party systems, and other enterprise applications.",
      },
      {
        title: "Cloud Migration & Hosting",
        body: "Move ColdFusion workloads toward cloud environments, including AWS and Azure-based infrastructure where applicable.",
      },
    ],
    cta: { label: "Explore ColdFusion Services", href: serviceHref("application-modernization") },
    image: "/images/coldfusion-summit.webp",
    imageAlt: "An Infoane engineer presenting on stage at the Adobe ColdFusion Summit",
    badgeTitle: "Partner-ready service",
    badgeBody:
      "Legacy CF Migration is our strongest service for teams that need a reliable, hands-on migration partner.",
  },
  ai: {
    eyebrow: "AI technology",
    title: "AI Technology for the Next Generation of Software and Data",
    lead: "AI is becoming part of modern software, data environments, and technology operations. Infoane explores practical ways to apply AI alongside its established capabilities in software development, data engineering, cloud, automation, and modernization.",
    focusTitle: "Our technology focus",
    focusBody:
      "Our technology focus includes areas such as AI-assisted development, AI-ready data, intelligent automation, generative AI, and AI-enabled applications.",
    areas: [
      "AI-Assisted Development",
      "AI-Ready Data",
      "Generative AI",
      "Intelligent Automation",
      "AI + Cloud",
      "AI-Enabled Applications",
    ],
    goalTitle: "The goal is practical application",
    goalBody:
      "Using the right data, software architecture, and technology foundation to identify where AI can add meaningful value.",
    image: "/images/ai-team.webp",
    imageAlt: "Engineers working together at laptops in a bright office",
    cta: { label: "Explore AI Technology", href: routes.ai },
  },
  industries: {
    eyebrow: "Industries",
    title: "Software and IT Solutions for Industry-Specific Needs",
    lead: "Different industries operate with different workflows, data requirements, security considerations, customer expectations, and technology environments. Infoane applies its software development and IT capabilities to the needs of different business environments.",
    cta: { label: "Explore Industries", href: routes.industries },
    items: [
      { name: "IT & Technology", body: "Software applications, infrastructure, databases, and technology support." },
      { name: "Banking & Financial Services", body: "Software and data solutions for financial and business operations." },
      { name: "Healthcare", body: "Technology solutions supporting healthcare applications and digital operations." },
      { name: "Travel & Hospitality", body: "Web and mobile applications for travel, hospitality, and related businesses." },
      {
        name: "Telecommunications",
        body: "Application and technology solutions for communication-driven environments.",
      },
      { name: "Retail & E-commerce", body: "Web, mobile, and digital solutions for customer-facing commerce." },
      { name: "Manufacturing", body: "Software and technology support for operational environments." },
      { name: "Logistics", body: "Applications and data capabilities supporting logistics operations." },
      { name: "Energy & Utilities", body: "Technology solutions for business processes and operational environments." },
    ],
  },
  approach: {
    eyebrow: "How we work",
    title: "From Business Requirements to Ongoing Support",
    lead: "Every project starts with understanding what the business needs, what already exists, and what success looks like. Our delivery approach connects planning, engineering, testing, deployment, and ongoing support.",
    steps: [
      {
        title: "Understand",
        body: "Learn about your business, users, existing systems, challenges, requirements, and goals.",
      },
      {
        title: "Plan",
        body: "Define priorities, solution requirements, technical approach, integrations, and delivery needs.",
      },
      {
        title: "Build",
        body: "Design, develop, integrate, and test the solution with quality, performance, and security in mind.",
      },
      {
        title: "Deploy",
        body: "Prepare and support implementation across the required environments.",
      },
      {
        title: "Support & Improve",
        body: "Provide ongoing maintenance, monitoring, technical support, optimization, and improvements as required.",
      },
    ],
  },
  technology: {
    eyebrow: "Technology",
    title: "Technologies That Power Our Software and IT Services",
    lead: "The right technology depends on the application, business requirements, existing environment, and long-term goals. Infoane works across established and modern technology stacks to build, maintain, integrate, and modernize business applications.",
    items: [
      "Adobe ColdFusion",
      "Lucee / CFML",
      "PHP",
      "Python / Django",
      ".NET",
      "Java",
      "Angular",
      "Node.js",
      "React",
      "Flutter",
      "Cloud Technologies",
      "DevOps & Automation",
      "Database Technologies",
    ],
    cta: { label: "Explore Our Technology Expertise", href: routes.technology },
  },
  trust: {
    eyebrow: "Trust & credibility",
    title: "Experience You Can Build On",
    lead: "For technology projects, credibility comes from experience, delivery capability, and the ability to support applications beyond the initial implementation.",
    items: [
      { title: "12+ Years", body: "Experience in software development and IT services." },
      { title: "100+ Clients", body: "Businesses served across global markets." },
      {
        title: "Global Delivery",
        body: "Technology services supporting businesses across different industries and geographies.",
      },
      {
        title: "Established Expertise",
        body: "Application development, ColdFusion, cloud, DevOps, databases, data engineering, QA, and modernization.",
      },
    ],
    testimonialLabel: "Client testimonial",
    quote: "Infoane has been a great partner for almost four years now. Their team provides excellent technical service and expertise.",
    // Replace with the client's name once written permission to publish is confirmed.
    author: "[CLIENT NAME]",
    authorRole: "VP Technology, Trimble",
  },
  careers: {
    eyebrow: "Careers",
    title: "Build Technology. Build Your Career.",
    paragraphs: [
      "Great software is built by people who are curious, willing to learn, and ready to solve real business problems.",
      "At Infoane, opportunities span software development, cloud, data, QA, DevOps, modernization, databases, and emerging technologies.",
      "Whether you are starting your career or bringing years of experience, explore opportunities to work on technology that supports real businesses.",
    ],
    primaryCta: { label: "Explore Careers", href: routes.careers },
    secondaryCta: { label: "View Current Openings", href: routes.openings },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What services does Infoane Technologies offer?",
        answer:
          "Infoane provides software development and IT services including web and mobile application development, QA and software testing, database and Remote DBA services, cloud and DevOps, data engineering, legacy modernization, cybersecurity, and related technology support.",
      },
      {
        question: "Does Infoane support and maintain legacy ColdFusion applications?",
        answer:
          "Yes. Infoane's ColdFusion capabilities include application development, legacy application support and maintenance, upgrades, migration, performance optimization, integrations, security, and cloud migration.",
      },
      {
        question: "Can Infoane migrate Adobe ColdFusion applications to Lucee?",
        answer:
          "Yes. Infoane's ColdFusion capabilities include Adobe ColdFusion-to-Lucee migration and support across the CFML ecosystem.",
      },
      {
        question: "What engagement models does Infoane offer?",
        answer:
          "Depending on the service and project requirements, Infoane supports project-based services, staff augmentation, dedicated teams, and ongoing managed support.",
      },
      {
        question: "Which industries does Infoane serve?",
        answer:
          "Infoane works across industries including IT and technology, banking and financial services, healthcare, travel and hospitality, telecommunications, retail and e-commerce, manufacturing, logistics, and energy and utilities.",
      },
      {
        question: "Where is Infoane based?",
        answer: "Infoane has locations in Frisco, Texas, and in Hyderabad and Kovilpatti, India, and serves clients globally.",
      },
    ],
  },
  contact: {
    title: "Have a Software or Technology Challenge to Solve?",
    lead: "Whether you are building a new application, modernizing a legacy system, moving to the cloud, improving your data environment, or looking for ongoing technology support, let's discuss what you need. Tell us about your goals, current environment, and challenges. We'll start with the right conversation.",
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
      // `size` is the tile's desktop width and height as drawn (1200px container).
      { name: "Infotech", sector: "Healthcare", size: "lg:basis-[217px] lg:h-[111px]" },
      { name: "JumpstartMD", sector: "Healthcare", size: "lg:basis-[259px] lg:h-[151px]", warm: true },
      { name: "Knova", sector: "Enterprise Software", size: "lg:basis-[200px] lg:h-[111px]" },
      { name: "Selectica", sector: "Enterprise Software", size: "lg:basis-[240px] lg:h-[111px]" },
      { name: "Tagit Solutions", sector: "Logistics", size: "lg:basis-[220px] lg:h-[151px]" },
      { name: "Trimble", sector: "Manufacturing", size: "lg:basis-[279px] lg:h-[99px]" },
      { name: "YottaMark", sector: "Supply Chain", size: "lg:basis-[257px] lg:h-[135px]", warm: true },
      { name: "ZAP", sector: "Fintech", size: "lg:basis-[219px] lg:h-[99px]" },
      { name: "Bombardier", sector: "Manufacturing", size: "lg:basis-[397px] lg:h-[99px]" },
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
    // Names, roles and photos as supplied with the design.
    people: [
      {
        group: 0,
        name: "Mohan Duggi",
        role: "CEO",
        bio: "Ph.D. in distributed databases. Directly manages our 24/7 monitoring and core delivery squads across Hyderabad.",
        photo: "/images/leader-mohan-duggi.webp",
      },
      {
        group: 0,
        name: "Steve Goldner",
        role: "Head of USA Operations",
        bio: "Legacy systems expert who has guided 50+ CF and database transitions without a single minute of unexpected downtime.",
        photo: "/images/leader-steve-goldner.webp",
      },
      {
        group: 1,
        name: "Rohit Uppaluri",
        role: "Delivery",
        bio: "Former platform lead with 18+ years in systems infrastructure. Built Infoane from an independent consultancy to a global partner.",
        photo: "/images/leader-rohit-uppaluri.webp",
      },
      {
        group: 1,
        name: "Archana Nagarajan",
        role: "Delivery",
        bio: "Delivery specialist with deep expertise in cross-functional team coordination and on-time engineering execution across global programs.",
        photo: "/images/leader-archana-nagarajan.webp",
      },
    ],
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
    primary: { label: "Explore Openings", href: routes.openings },
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
    primary: { label: "View Open Positions", href: routes.openings },
    secondary: { label: "See how we work", href: "/#approach" },
  },
  heroPlaceholder: {
    title: "Team photo placeholder",
    body: "Your team photo here",
    hint: "Recommended size: 800 × 400px",
  },
  /** /careers/openings */
  openingsPage: {
    eyebrow: "Careers at Infoane",
    title: "Current Openings",
    lead: "Join a high-performance team building the next generation of robust software architectures. We value builders who take pride in system craft.",
    filters: {
      search: "Search jobs",
      searchPlaceholder: "Search by role or keywords...",
      category: "Job category",
      allCategories: "All Categories",
      type: "Job type",
      allTypes: "All Types",
      location: "Job location",
      allLocations: "All Locations",
    },
    moreDetails: "More Details",
    loadMore: "Load More Positions",
    empty: "No positions match those filters. Try clearing a filter, or send us a general application.",
    join: {
      eyebrow: "Join our team",
      title: "Be part of our amazing team",
      body: "Don't see a role that fits your profile perfectly? We are always on the lookout for talented, passionate architects, engineers, and designers. Shoot us your resume and let's discuss.",
      cta: { label: "Send Your Resume", href: routes.apply },
      image: "/images/openings-team.webp",
      imageAlt: "Engineers gathered around a desk with curved monitors, discussing an architecture diagram",
    },
  },
  /** /careers/apply */
  applyPage: {
    eyebrow: "Careers at Infoane",
    title: "Don't see your role? Let's talk.",
    body: "We are builders, systems engineers, and systems architects. Even when we don't have a formal vacancy open, we're always looking to meet exceptional minds who want to turn technical debt into operational leverage.",
    whyLabel: "Why apply speculatively?",
    why: [
      {
        icon: "chart" as IconName,
        title: "We're always growing",
        body: "We operate lean, high-performing structures, meaning we adapt to demand quickly. A great candidate always creates their own necessity.",
      },
      {
        icon: "code" as IconName,
        title: "Your skills might shape a new role",
        body: "If you bring unique capabilities across DevOps, QA Automation, or Product Delivery, we structure the position around your expertise.",
      },
      {
        icon: "globe" as IconName,
        title: "Join our talent pipeline",
        body: "Get on our radar. When high-priority client modernizations ramp up, we go directly to our curated pipeline before going public.",
      },
      {
        icon: "check" as IconName,
        title: "Get priority when roles open",
        body: "Speculative applications demonstrate initiative and proactive builder mentalities. You're already one step ahead of public candidates.",
      },
    ],
    form: {
      title: "Submit an open application",
      lead: "Tell us what you're passionate about building. Our technical directors review speculative applications weekly.",
    },
    expertise: [
      "Software engineering",
      "Quality assurance & test automation",
      "DevOps & infrastructure",
      "Data & databases",
      "Architecture",
      "Project & program management",
      "Talent acquisition",
      "Sales & account management",
      "Other",
    ],
  },
  /** /careers/[slug] */
  jobPage: {
    eyebrow: "Careers at Infoane",
    responsibilities: "Responsibilities",
    skills: "Required Skills",
    formTitle: "Apply for this position",
    back: "All openings",
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
