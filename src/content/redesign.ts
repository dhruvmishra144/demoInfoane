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
  | "file"
  | "terminal"
  | "zap"
  | "layers"
  | "triangle"
  | "server"
  | "branch";

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
      "Build, modernize, and support the software and systems your business depends on. Infoane Technologies helps businesses develop applications, improve existing platforms, and manage the technology behind their operations.",
    primaryCta: { label: "Talk to Our Experts", href: routes.contact },
    secondaryCta: { label: "Explore Our Services", href: routes.services },
  },
  about: {
    eyebrow: "About us",
    title: "A Software Development Company Built Around Your Business Needs",
    entity:
      "Infoane Technologies is a software development and IT services company serving businesses in the United States, India, and other markets.",
    paragraphs: [
      "Technology decisions affect how a business operates, grows, and serves its customers. Infoane helps organizations build new software, improve existing applications, modernize legacy systems, and manage the infrastructure and data behind them.",
      "Our capabilities span custom software development, web and mobile applications, cloud and DevOps, data engineering, database administration, quality assurance, cybersecurity, and legacy modernization. From planning and development to deployment and ongoing support, we help teams turn requirements into practical, maintainable solutions.",
    ],
    link: { label: "Learn More About Infoane", href: routes.about },
    cards: [
      {
        label: "Embedded Delivery",
        caption: "Engineers work alongside your product and operations teams to plan, build, and improve business systems.",
        image: "/images/inside-whiteboard.webp",
        alt: "Three Infoane engineers sketching a system architecture on a glass whiteboard",
      },
      {
        label: "Always-On Operations",
        caption: "Infrastructure, databases, and monitoring help keep critical systems running reliably.",
        image: "/images/impact-datacenter.webp",
        alt: "A long aisle of server racks lit in blue",
      },
      {
        label: "Practical Engineering",
        caption: "Maintainable code and considered technical choices across modern stacks and legacy platforms.",
        image: "/images/ai-globe-hands.webp",
        alt: "Gloved hands holding a glowing globe in front of a server rack",
      },
    ],
    numbersLabel: "By the numbers",
    // Keep the figures only while the company-approved source confirms them.
    numbers: [
      { value: "12+", title: "Years", label: "Experience in software development and IT services." },
      { value: "100+", title: "Clients", label: "Clients served across multiple markets." },
      { value: "3", title: "Offices", label: "Locations in the United States and India." },
      { value: "24×7", title: "Support", label: "Monitoring and support coverage, where applicable." },
    ],
  },
  services: {
    eyebrow: "Software development & IT services",
    title: "Software Development and IT Services for Every Stage of Your Business",
    lead: "From new applications to legacy modernization, Infoane brings software engineering and IT capabilities together across the technology lifecycle.",
    cta: { label: "View All Services", href: routes.services },
    items: [
      {
        icon: "monitor" as IconName,
        title: "Web Application Development",
        points: [
          "Custom web applications",
          "Business requirements, users, and integrations",
          "Performance, security, and maintainability",
        ],
        href: routes.webApplications,
      },
      {
        icon: "phone" as IconName,
        title: "Mobile App Development",
        points: ["Native and cross-platform apps", "Usability and performance", "Quality and ongoing application support"],
        href: routes.mobileApps,
      },
      {
        icon: "check" as IconName,
        title: "QA & Software Testing",
        points: [
          "Manual and automated testing",
          "Functional and performance validation",
          "Quality improvement and release-risk reduction",
        ],
        href: routes.services,
      },
      {
        icon: "database" as IconName,
        title: "Database & Remote DBA Services",
        points: [
          "Database administration and monitoring",
          "Performance tuning, backup, and security",
          "Migration, upgrades, and production support",
        ],
        href: routes.services,
      },
      {
        icon: "cloud" as IconName,
        title: "Cloud & DevOps",
        points: [
          "Cloud and hybrid infrastructure",
          "Software delivery automation and observability",
          "Deployment and application-lifecycle support",
        ],
        href: serviceHref("cloud-migration-devops"),
      },
      {
        icon: "chart" as IconName,
        title: "Data Engineering & Analytics",
        points: [
          "Data pipelines and integrations",
          "Warehouses, lakes, and analytics-ready environments",
          "Reporting, business intelligence, and AI-ready data initiatives",
        ],
        href: serviceHref("data-engineering-analytics"),
      },
      {
        icon: "code" as IconName,
        title: "Legacy Application Modernization",
        points: [
          "Modernize existing applications and technology environments",
          "Preserve useful business processes and technology investments",
          "Improve maintainability and support ongoing change",
        ],
        href: serviceHref("application-modernization"),
      },
      {
        icon: "shield" as IconName,
        title: "Cybersecurity",
        points: [
          "Application and infrastructure security",
          "Identity, access, and data protection",
          "Security practices aligned with business and operational requirements",
        ],
        href: routes.services,
      },
    ],
  },
  why: {
    eyebrow: "Why Infoane",
    title: "Engineering Expertise Backed by Practical Delivery",
    lead: "Infoane brings software development and IT capabilities together to build, modernize, and support business-critical systems.",
    // `tab` is the shorter label the design's tab list uses.
    items: [
      {
        tab: "Established Technology",
        title: "Established Technology Expertise",
        points: [
          "Adobe ColdFusion, PHP, Python, Java, Angular, React, and Node.js",
          "Cloud platforms and DevOps technologies",
        ],
        image: "/images/openings-team.webp",
        alt: "Engineers gathered around two monitors of code in an open-plan office",
      },
      {
        tab: "ColdFusion Expertise",
        title: "ColdFusion Expertise",
        points: [
          "Application development and maintenance",
          "Upgrades, migration, optimization, and integrations",
          "Cloud environments where applicable",
        ],
        image: "/images/expertise-orb.webp",
        alt: "A glass orb ringed by ColdFusion, Flutter and Selenium logos",
      },
      {
        tab: "End-to-End Delivery",
        title: "End-to-End Delivery",
        points: [
          "Development, testing, and deployment",
          "Infrastructure and database support",
          "Modernization and ongoing technical support",
        ],
        image: "/images/wa-architecture.webp",
        alt: "An isometric diagram of a scalable cloud configuration",
      },
      {
        tab: "Business-Focused",
        title: "Business-Focused Engineering",
        points: [
          "Application performance and maintainability",
          "Operational efficiency and scalability",
          "Long-term support requirements",
        ],
        image: "/images/mission-team.webp",
        alt: "Colleagues talking around a meeting table beneath a sign reading Good Ideas Better Together",
      },
      {
        tab: "Flexible Engagement",
        title: "Flexible Engagement",
        points: [
          "Project-based development",
          "Dedicated teams and staff augmentation",
          "Managed support where applicable",
        ],
        image: "/images/benefit-remote.webp",
        alt: "A team working through documents together at a long table",
      },
      {
        tab: "Global Client Experience",
        title: "Global Client Experience",
        points: [
          "Support for businesses across industries and geographies",
          "Software and IT services aligned with technology and operational requirements",
        ],
        image: "/images/globe.webp",
        alt: "A glowing globe with light trails connecting the Americas to India",
      },
    ],
  },
  coldfusion: {
    eyebrow: "ColdFusion spotlight",
    title: "ColdFusion Development and Modernization for Business-Critical Applications",
    paragraphs: [
      "Infoane provides ColdFusion development and support to help businesses maintain, improve, and modernize existing applications. From ongoing maintenance and performance improvements to platform migration, we help organizations keep business-critical systems reliable and aligned with changing needs.",
    ],
    capabilitiesLabel: "What we do",
    progressLabel: "ColdFusion capabilities",
    capabilities: [
      {
        icon: "code" as IconName,
        title: "ColdFusion Application Development",
        body: "Build and extend applications using ColdFusion and CFML.",
      },
      {
        icon: "shield" as IconName,
        title: "Legacy ColdFusion Support",
        body: "Maintain existing applications and address technical issues and changing requirements.",
      },
      {
        icon: "layers" as IconName,
        title: "ColdFusion Upgrades & Migration",
        body: "Upgrade environments or plan migration paths for applications that need a more modern foundation.",
      },
      {
        icon: "branch" as IconName,
        title: "ColdFusion to Lucee Migration",
        body: "Support migration from Adobe ColdFusion to Lucee within the CFML ecosystem.",
      },
      {
        icon: "zap" as IconName,
        title: "Performance Optimization",
        body: "Identify and address application performance issues to improve responsiveness and maintainability.",
      },
      {
        icon: "server" as IconName,
        title: "API & System Integration",
        body: "Connect ColdFusion applications with APIs, third-party systems, and enterprise applications.",
      },
      {
        icon: "cloud" as IconName,
        title: "Cloud Migration & Hosting",
        body: "Move ColdFusion workloads toward cloud environments, including AWS- and Azure-based infrastructure where applicable.",
      },
    ],
    // The design's coral button opens the conversation; the draft's link to the
    // service page sits beside it as the text link.
    primaryCta: { label: "Start a discovery call", href: "#contact" },
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
    // Describes areas of technology interest, not standalone AI services.
    goal: "The focus is on practical application: using the right data, software architecture, and technology foundation to identify where AI may add value.",
    areas: [
      { title: "AI-Assisted Development", body: "Explore ways AI tools may support software development workflows." },
      { title: "AI-Ready Data", body: "Prepare and connect data environments that can support AI-related initiatives." },
      {
        title: "Generative AI",
        body: "Consider relevant generative AI use cases within broader software and data contexts.",
      },
      {
        title: "Intelligent Automation",
        body: "Identify workflows where automation may reduce repetitive work.",
      },
      { title: "AI + Cloud", body: "Consider AI-related needs alongside cloud infrastructure and application architecture." },
      {
        title: "AI-Enabled Applications",
        body: "Explore where AI capabilities may fit into software applications when requirements support them.",
      },
    ],
    image: "/images/ai-team.webp",
    imageAlt: "Engineers working together at laptops in a bright office",
    cta: { label: "Explore AI Technology", href: routes.ai },
  },
  industries: {
    eyebrow: "Industries",
    title: "Built for the Complexity of Your Industry",
    lead: "Industry workflows, data needs, security considerations, and technology environments differ. Infoane applies its software development and IT capabilities to the needs of each business environment.",
    cta: { label: "Explore Industries", href: routes.industries },
    activeLabel: "Active industry",
    // Capability-led descriptions from the V3 draft; refine with client-approved
    // industry examples or case studies when available.
    items: [
      {
        tab: "Healthcare",
        name: "Healthcare",
        body: "Healthcare systems need dependable applications, secure data handling, and connected workflows.",
        points: [
          "Support healthcare applications and digital operations.",
          "Connect systems and data where integration is required.",
          "Consider privacy, security, reliability, and continuity requirements.",
        ],
        gradient: "from-[#d9584a] via-[#9e2f3a] to-[#3d1a2a]",
      },
      {
        tab: "Fintech",
        name: "Fintech / Banking & Financial Services",
        body: "Financial environments depend on reliable software, controlled access, and consistent data processing.",
        points: [
          "Develop and maintain applications supporting financial and business operations.",
          "Support database, integration, and infrastructure needs.",
          "Account for security, availability, and operational requirements.",
        ],
        gradient: "from-[#5b6cf0] via-[#3b3fa8] to-[#1a1c45]",
      },
      {
        tab: "Manufacturing",
        name: "Manufacturing",
        body: "Manufacturing operations rely on systems that support business processes, data, and day-to-day coordination.",
        points: [
          "Build and maintain applications used in operational environments.",
          "Connect systems and data to support visibility across workflows.",
          "Modernize legacy applications while preserving essential business processes.",
        ],
        gradient: "from-[#f08a4b] via-[#b8552e] to-[#3f1f14]",
      },
      {
        tab: "Logistics",
        name: "Logistics",
        body: "Logistics teams need systems and data that support coordination, operational visibility, and changing requirements.",
        points: [
          "Support applications and data capabilities for logistics operations.",
          "Integrate relevant systems and databases.",
          "Maintain and improve software as workflows evolve.",
        ],
        gradient: "from-[#2fb3a0] via-[#1c6f6a] to-[#0f2a2c]",
      },
      {
        tab: "Energy",
        name: "Energy & Utilities",
        body: "Energy and utilities environments depend on reliable technology and operational systems.",
        points: [
          "Support business applications and operational technology environments.",
          "Maintain databases, infrastructure, and integrations.",
          "Improve existing applications with attention to reliability and maintainability.",
        ],
        gradient: "from-[#e8b43c] via-[#b0722a] to-[#3b2410]",
      },
    ],
  },
  approach: {
    eyebrow: "How we work",
    title: "From Business Requirements to Ongoing Support",
    lead: "We begin by understanding what the business needs, what already exists, and what success looks like. Our approach connects planning, engineering, testing, deployment, and ongoing support.",
    leadLabel: "Our approach",
    image: "/images/vision-engineer.webp",
    imageAlt: "An Infoane engineer working at a laptop in the office",
    steps: [
      {
        title: "Understand",
        body: "Review business goals, users, existing systems, challenges, and requirements.",
      },
      {
        title: "Plan",
        body: "Define priorities, solution requirements, technical approach, integrations, and delivery needs.",
      },
      {
        title: "Build",
        body: "Design, develop, integrate, and test with quality, performance, and security in mind.",
      },
      {
        title: "Deploy",
        body: "Prepare and support implementation across the required environments.",
      },
      {
        title: "Support & Improve",
        body: "Provide maintenance, monitoring, technical support, optimization, and improvements as required.",
      },
    ],
  },
  technology: {
    eyebrow: "Technology stack",
    // One headline, split where the design turns the second line coral.
    title: "Technologies That Power Our",
    titleAccent: "Software and IT Services",
    lead: "The right technology depends on the application, business requirements, existing environment, and long-term goals. Infoane works across established and modern technology stacks to build, maintain, integrate, and modernize business applications.",
    cta: { label: "Explore Our Technology Expertise", href: routes.technology },
    // Logos are files in /public/logos (from Devicon, MIT — see
    // LICENSE-devicon.txt there). Devicon has no ColdFusion or Lucee mark, so
    // those two show a monogram until official logo files are supplied. The
    // category cards' tool lines name only tools the Technology page lists.
    groups: [
      {
        label: "Languages & Frameworks",
        items: [
          { name: "Adobe ColdFusion", monogram: "CF" },
          { name: "Lucee / CFML", monogram: "Lu" },
          { name: "PHP", logos: ["php"] },
          { name: "Python / Django", logos: ["python", "django"] },
          { name: ".NET", logos: ["dotnet"] },
          { name: "Java", logos: ["java"] },
        ],
      },
      {
        label: "Frontend & Mobile",
        items: [
          { name: "Angular", logos: ["angular"] },
          { name: "Node.js", logos: ["nodejs"] },
          { name: "React", logos: ["react"] },
          { name: "Flutter", logos: ["flutter"] },
        ],
      },
      {
        label: "Infrastructure & Delivery",
        items: [
          { name: "Cloud technologies", detail: "AWS · Azure · Google Cloud", logos: ["aws", "azure", "googlecloud"] },
          {
            name: "DevOps and automation",
            detail: "Docker · Kubernetes · Terraform · GitHub Actions",
            logos: ["docker", "kubernetes", "terraform", "githubactions"],
          },
          { name: "Database technologies", detail: "PostgreSQL · SQL Server", logos: ["postgresql", "sqlserver"] },
        ],
      },
    ],
  },
  // Three client reviews supplied by the client. Names, companies and the
  // leader's name are placeholders here: fill them from the approved review
  // document, with each reviewer's written permission to publish.
  reviews: {
    eyebrow: "Client reviews",
    title: "What Our Clients Say",
    items: [
      {
        quote:
          "Infoane has earned our complete trust. In five years of partnership with [COMPANY], they have never let us down. They consistently deliver quality results, stand behind their work, and follow through on their commitments. When the work matters and we need a team we can count on, Infoane is who we trust. We wouldn't put that responsibility in anyone else's hands. They are an invaluable partner, and they have our strongest recommendation.",
        author: "[CLIENT NAME]",
        role: "[TITLE], [COMPANY]",
      },
      {
        quote:
          "I have used Infoane for Oracle/SQL Database and Production application support for over six years as the Director of IT at [COMPANY]. Infoane continuously went above and beyond my expectations, delivering top-of-the-notch 24/7 support to our Production environment. [LEADER NAME] and his team made us feel as if we were their most important customer. I am happy to see that they have expanded their services and would leverage Infoane's services if the need arises.",
        author: "[CLIENT NAME]",
        role: "[TITLE], [COMPANY]",
      },
      {
        quote:
          "Infoane has been a great partner for almost four years now. Their team provides excellent technical service and expertise and a great business relationship, with the flexibility we need and consistency in our contact points. Regularly, they go beyond their support hours and weekends to continue to provide excellent service. I would certainly recommend them to anyone.",
        author: "[CLIENT NAME]",
        role: "[TITLE], [COMPANY]",
      },
    ],
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
          "Yes. Infoane's ColdFusion capabilities include application development, legacy application support and maintenance, upgrades, migration, performance optimization, integrations, and cloud migration.",
      },
      {
        question: "Can Infoane migrate Adobe ColdFusion applications to Lucee?",
        answer:
          "Infoane supports Adobe ColdFusion-to-Lucee migration and work across the CFML ecosystem.",
      },
      {
        question: "What engagement models does Infoane offer?",
        answer:
          "Depending on service and project requirements, Infoane supports project-based services, staff augmentation, dedicated teams, and ongoing managed support.",
      },
      {
        question: "Which industries does Infoane serve?",
        answer:
          "Infoane's capabilities can support organizations in healthcare, fintech and financial services, manufacturing, logistics, energy and utilities, and other technology-dependent sectors.",
      },
      {
        question: "Where is Infoane based?",
        answer: "Infoane has locations in the United States and India, and serves businesses in other markets.",
      },
    ],
  },
  contact: {
    title: "Have a Software or Technology Challenge to Solve?",
    lead: "Whether you are building a new application, modernizing a legacy system, moving to the cloud, improving your data environment, or looking for ongoing technology support, let's discuss what you need. Tell us about your goals, current environment, and challenges. We'll start with a conversation about the right next step.",
    submitLabel: "Start a Conversation",
    secondaryCta: { label: "Contact Infoane", href: routes.contact },
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
    body: `Founded in ${foundedYear} on a simple premise: companies shouldn't have to choose between speed and stability. We embed directly into product teams, clearing roadblocks and scaling architectures so the work never stops.`,
  },
  visionMission: "Vision & mission",
  mission: {
    eyebrow: "Our mission",
    title: "To turn technical debt into operational leverage.",
    body: "We believe the best systems are invisible. Our mission is to embed senior engineers who solve the hardest bottlenecks, so that internal product roadmaps are driven by choice, not by technical limitations.",
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
    lead: "From healthcare platforms to fintech infrastructure: we've shipped alongside the best.",
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
          "Infoane didn't just rebuild our claims platform: they taught our team how to think about it differently. Latency dropped 90% and our roadmap opened up overnight.",
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
          "What sets Infoane apart is their willingness to own the outcome. They don't just consult: they ship. Our database architecture is unrecognizable, in the best way.",
        role: "Director of Platform Engineering",
        company: "[Client company]",
      },
    ],
    storyLabel: "Read the full story",
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Technical leadership behind our delivery.",
    lead: "Technical expertise across databases, legacy systems, infrastructure, and delivery.",
    groups: ["Operations", "Delivery"],
    // Names, roles and photos as supplied with the design.
    people: [
      {
        group: 0,
        name: "Mohan Duggi",
        role: "CEO",
        bio: "Ph.D. in distributed databases. Oversees 24/7 monitoring and core delivery teams in Hyderabad.",
        photo: "/images/leader-mohan-duggi.webp",
      },
      {
        group: 0,
        name: "Steve Goldner",
        role: "Head of USA Operations",
        bio: "Legacy systems expertise across ColdFusion and database transitions.",
        photo: "/images/leader-steve-goldner.webp",
      },
      {
        group: 1,
        name: "Rohit Uppaluri",
        role: "Delivery",
        bio: "18+ years of experience in systems infrastructure and platform engineering.",
        photo: "/images/leader-rohit-uppaluri.webp",
      },
      {
        group: 1,
        name: "Archana Nagarajan",
        role: "Delivery",
        bio: "Delivery expertise in cross-functional team coordination and engineering execution across global programs.",
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
    "Custom retrieval architectures, predictive models and AI-assisted testing, built into your production systems with data isolation and human oversight.",
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
    body: "We embed directly with world-class product teams to turn technical debt into operational leverage. No fluff, no endless decks, just clean systems that ship on time.",
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
