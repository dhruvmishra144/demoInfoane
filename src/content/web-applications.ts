/**
 * Copy for the Web Applications service page, transcribed from the design
 * (web-applications-service-page.png). The page's layout lives in
 * components/web-applications; this file holds only words and links.
 */

import { routes, serviceHref } from "@/lib/routes";

export const webApplications = {
  // SEO title and description from the Web Application Development content draft.
  meta: {
    title: "Web Application Development Services | Infoane Technologies",
    description:
      "Build scalable web applications with Infoane. Get custom development, UX/UI, API integration, cloud-ready architecture, testing, and ongoing support.",
  },

  hero: {
    eyebrow: "Enterprise Engineering",
    headline: "Web Applications That Power Your Business Forward",
    subhead:
      "We build scalable, secure, and resilient web applications that streamline business critical infrastructure. From legacy modernizations to high-performance database-driven portals, our veteran architects deliver outcomes built to last.",
    primaryCta: { label: "Start Your Project", href: routes.contact },
    secondaryCta: { label: "Explore ColdFusion modernization", href: "#coldfusion" },
    card: {
      status: "Production Active",
      uptime: "Uptime 99.99%",
      dashboardTitle: "System Performance Dashboard",
      dataFlowLabel: "Data Flow",
      dataFlowValue: "40% Faster",
      integrationsLabel: "Integrations",
      integrationsValue: "Active",
      chip: {
        title: "API Engine Active",
        lines: ["HTTP/2 POST payload 200 OK", "- latency < 14ms", "- cluster: node-04"],
      },
    },
  },

  build: {
    eyebrow: "What we build",
    title: "Engineered for high performance and continuous scaling",
    lead: "We avoid one-size-fits-all templates. Our team designs custom web application architectures mapped precisely to your business logic, compliance landscape, and payload parameters.",
    cards: [
      {
        key: "portals",
        icon: "globe",
        title: "Enterprise Web Portals",
        body: "Secure, multi-role portals designed to manage complex user flows, high data density, and strict compliance layers in healthcare, finance, and logistics.",
        art: "/images/wa-portal.webp",
      },
      {
        key: "saas",
        icon: "layers",
        title: "SaaS Platforms",
        body: "Multi-tenant cloud platforms constructed with secure workspace isolation, modular billing integrations, and seamless user provisioning engines.",
        art: null,
      },
      {
        key: "ecommerce",
        icon: "cart",
        title: "E-Commerce Solutions",
        body: "Custom transaction pipelines, real-time inventory synchronizations, and custom checkout flows engineered to handle thousands of concurrent queries without failure.",
        art: "/images/wa-ecommerce.webp",
      },
      {
        key: "api",
        icon: "code",
        title: "API-Driven Applications",
        body: "High-availability, headless APIs designed to tie complex microservices together. We guarantee clean integrations and highly optimized JSON exchange pipelines.",
        art: "/images/wa-api.webp",
      },
      {
        key: "internal",
        icon: "gear",
        title: "Internal Business Tools",
        body: "Custom inventory management, database synchronization engines, and administrative back-offices that unlock team efficiency and reduce repetitive manual input.",
        art: null,
      },
      {
        key: "pwa",
        icon: "tablet",
        title: "Progressive Web Apps (PWAs)",
        body: "Fast, dependable cross-device experiences that operate offline and deliver native-like app capabilities directly through standard web platforms.",
        art: null,
      },
    ],
  },

  stats: [
    { value: "500+", label: "Web Apps Delivered" },
    { value: "99.9%", label: "Uptime SLA Guarantee" },
    { value: "15+", label: "Years ColdFusion Expertise" },
    { value: "40%", label: "Avg Performance Increase" },
  ],

  standards: {
    eyebrow: "Why we stand apart",
    title: "Stated standards of architectural durability",
    lead: "Every codebase we deliver represents custom-built logic grounded inside enterprise security parameters and high-performance networks.",
    scalable: {
      title: "Scalable & Resilient Architecture",
      body: "We design web applications for structural growth. Our deployments operate with automatic horizontal scaling and elastic caching layers, ensuring your platform continues running optimally through sudden transaction peaks.",
      bullets: ["Auto-scaling cloud configurations", "Elastic database cluster allocations"],
      diagramLabel: "Scalable cloud configurations",
    },
    security: {
      title: "Security-First Infrastructure",
      body: "Our safety review models map tightly to OWASP Top 10 vulnerabilities directly out of the box. We implement role-based access rules and continuous token encryptions to completely isolate payload data.",
      bullets: [
        "Continuous vulnerability penetration checks",
        "AES-256 data storage and transit encryptions",
      ],
      image: "/images/wa-lock.webp",
      imageAlt: "A glowing padlock at the centre of a circuit board, representing security-first infrastructure",
    },
  },

  coldfusion: {
    eyebrow: "ColdFusion at the core",
    title: "Adobe ColdFusion partner & legacy modernization specialists",
    lead: "Legacy infrastructure shouldn't choke modern progress. We bridge the gap between historic platforms and modern runtime environments safely.",
    body: "For over a decade, we have remained at the absolute forefront of ColdFusion CFML development. We audit, refactor, and migrate complex CF platforms into modern cloud environments with zero operational downtime.",
    note: "Proud attendees and speakers at Adobe ColdFusion Summit, staying at the forefront of ColdFusion innovation to bring the absolute best capabilities directly to your application suite.",
    primaryCta: { label: "Book a CF Modernization Call", href: routes.contact },
    secondaryCta: { label: "See modernization case stories", href: routes.caseStudies },
    from: {
      kicker: "Legacy Database",
      title: "Outdated Versions",
      body: "Complex procedural architectures, fragile routing scripts, high maintenance costs.",
    },
    to: {
      kicker: "Modern Environments",
      title: "Modern CF / Java",
      body: "Secure modular containers, robust microservice handshakes, low latency.",
    },
  },

  // The sections below are from "Infoane Service Page 1: Web Application
  // Development, Content Draft V1" (sections 05 to 10). The draft adds no
  // unsupported company claims.

  technology: {
    eyebrow: "Technology expertise",
    title: "Web Application Development Across Modern and Established Technology Stacks",
    lead: "The right technology depends on your application requirements, existing environment, integration needs, and long-term objectives. Infoane works across established and modern technologies to build, maintain, integrate, and modernize business applications.",
    groups: [
      {
        label: "Technology areas include",
        items: [
          "Adobe ColdFusion",
          "Lucee / CFML",
          "PHP",
          "Python / Django",
          "Java",
          ".NET",
          "Angular",
          "React",
          "Node.js",
          "Database technologies",
          "Cloud technologies",
          "DevOps and automation",
        ],
      },
    ],
    cta: { label: "Explore Our Technology Expertise", href: routes.technology },
  },

  why: {
    eyebrow: "Why Infoane",
    title: "A Practical Approach to Web Application Development",
    lead: "Building an application is only one part of the job. The application also needs to work within your existing technology environment and remain useful after launch.",
    items: [
      {
        title: "Business-First Planning",
        body: "We start with business objectives and requirements before defining the technical approach.",
      },
      {
        title: "Full-Cycle Development",
        body: "Planning, design, development, integration, testing, deployment, and support can be addressed through one delivery team.",
      },
      {
        title: "Performance and Maintainability",
        body: "We consider application performance, maintainability, scalability, and long-term support throughout development.",
      },
      {
        title: "Integration Expertise",
        body: "We connect applications with APIs, third-party platforms, CMS systems, databases, and existing business systems.",
      },
      {
        title: "Modernization Experience",
        body: "For existing applications, we can help improve functionality, architecture, performance, and technology foundations without automatically replacing what already works.",
      },
      {
        title: "Ongoing Support",
        body: "Application development does not have to end at launch. Support and optimization can continue as business requirements evolve.",
      },
    ],
  },

  benefits: {
    eyebrow: "Business benefits",
    title: "What Better Web Applications Can Deliver",
    lead: "A well-designed application should make business operations easier, not add another layer of complexity.",
    items: [
      "More intuitive user experiences",
      "Reduced technical support requirements",
      "Lower operational complexity",
      "Faster application customization",
      "Improved time-to-market",
      "Better application performance",
      "Stronger security and reliability",
      "Lower long-term development and support costs",
      "More consistent user experiences",
      "Applications that can adapt as business needs change",
    ],
  },

  approach: {
    eyebrow: "Our development approach",
    title: "From Requirements to a Production-Ready Application",
    steps: [
      {
        title: "Understand",
        body: "We learn about your business objectives, users, workflows, existing systems, and application requirements.",
      },
      {
        title: "Plan",
        body: "We define priorities, technical requirements, architecture, integrations, and the development approach.",
      },
      {
        title: "Design & Build",
        body: "UX/UI design and application development move forward around the agreed requirements and technical foundation.",
      },
      {
        title: "Integrate & Test",
        body: "We connect required systems and APIs while validating application functionality, performance, and security.",
      },
      {
        title: "Deploy",
        body: "The application is prepared for deployment across the required environment.",
      },
      {
        title: "Support & Improve",
        body: "Post-launch support, maintenance, monitoring, optimization, and enhancements can continue as required.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is web application development?",
        answer:
          "Web application development involves planning, designing, building, testing, deploying, and supporting applications that users access through web browsers.",
      },
      {
        question: "Does Infoane develop custom web applications?",
        answer:
          "Yes. Infoane's web application development approach is based on business requirements, user needs, application architecture, integrations, performance, security, and maintainability.",
      },
      {
        question: "Can Infoane integrate a web application with existing systems?",
        answer:
          "Yes. The service includes system and API integration with CMS platforms, third-party services, custom APIs, and other business systems.",
      },
      {
        question: "Can you modernize an existing web application?",
        answer:
          "Yes. Infoane supports application modernization and can work on existing systems to improve functionality, performance, architecture, integrations, and maintainability.",
      },
      {
        question: "Do you provide ongoing application support?",
        answer:
          "Yes. The service includes continuous optimization and support, including application monitoring, performance optimization, issue resolution, maintenance, and technical support.",
      },
      {
        question: "What technologies does Infoane use for web application development?",
        answer:
          "Infoane works across technologies including Adobe ColdFusion, Lucee/CFML, PHP, Python, Java, .NET, Angular, React, Node.js, databases, cloud technologies, and DevOps tools.",
      },
    ],
  },

  /** The draft's internal links. Pages that do not exist yet point at the services index. */
  related: {
    eyebrow: "Related",
    title: "Explore related services",
    links: [
      { label: "Services", href: routes.services },
      { label: "Mobile App Development", href: routes.mobileApps },
      { label: "QA & Software Testing", href: routes.services },
      { label: "Cloud & DevOps", href: serviceHref("cloud-migration-devops") },
      { label: "Database & Remote DBA", href: routes.services },
      { label: "Legacy Modernization", href: serviceHref("application-modernization") },
      { label: "ColdFusion Development", href: "#coldfusion" },
      { label: "Technology", href: routes.technology },
      { label: "About Infoane", href: routes.about },
    ],
  },

  cta: {
    eyebrow: "Get started",
    title: "Have a Web Application to Build or Improve?",
    body: "Whether you are starting a new application, modernizing an existing system, or connecting your software with other business platforms, Infoane can help you plan the right development approach. Tell us what you are building, what you need to improve, and where you want to go next.",
    primary: { label: "Talk to Our Experts", href: routes.contact },
    secondary: { label: "Contact Infoane", href: routes.contact },
  },
} as const;
