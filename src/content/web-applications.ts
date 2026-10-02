/**
 * Copy for the Web Applications service page, transcribed from the design
 * (web-applications-service-page.png). The page's layout lives in
 * components/web-applications; this file holds only words and links.
 */

import { routes } from "@/lib/routes";

export const webApplications = {
  meta: {
    title: "Web Application Development & ColdFusion Modernization",
    description:
      "Scalable, secure, and resilient web applications: enterprise portals, SaaS platforms, e-commerce, APIs and PWAs, plus Adobe ColdFusion legacy modernization.",
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
        art: "portal",
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
        art: "commerce",
      },
      {
        key: "api",
        icon: "code",
        title: "API-Driven Applications",
        body: "High-availability, headless APIs designed to tie complex microservices together. We guarantee clean integrations and highly optimized JSON exchange pipelines.",
        art: "api",
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
      image: "/images/ai-secure-lock.webp",
      imageAlt: "A glowing padlock at the centre of a circuit board, representing security-first infrastructure",
    },
  },

  coldfusion: {
    eyebrow: "ColdFusion at the core",
    title: "Adobe ColdFusion partner & legacy modernization specialists",
    lead: "Legacy infrastructure shouldn't choke modern progress. We bridge the gap between historic platforms and modern runtime environments safely.",
    body: "For over a decade, we have remained at the absolute forefront of ColdFusion CFML development. We audit, refactor, and migrate complex CF platforms into modern cloud environments with zero operational downtime.",
    note: "Proud attendees and speakers at Adobe ColdFusion Summit — staying at the forefront of ColdFusion innovation to bring the absolute best capabilities directly to your application suite.",
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

  process: {
    eyebrow: "Our process",
    title: "A methodical journey from context to execution",
    lead: "We do not jump blindly into code. We follow a highly structured delivery framework to guarantee predictable outcomes on time.",
    steps: [
      {
        title: "Discovery & Planning",
        body: "We evaluate your historical platforms, system nodes, and database realities thoroughly.",
      },
      {
        title: "Architecture & Design",
        body: "Our architects map exact microservices, container models, and load limits before writing code.",
      },
      {
        title: "Development & QA",
        body: "Senior engineers implement logic, backed by automated Selenium and security testing pipelines.",
      },
      {
        title: "Deployment & Tune",
        body: "Your system goes live with phased cohort rollouts and continuous real-time latency audits.",
      },
      {
        title: "Ongoing Support",
        body: "24/7 technical monitoring guarantees absolute stability and modular extension choices.",
      },
    ],
  },

  cta: {
    eyebrow: "Get started",
    title: "Ready to build your next web application?",
    body: "Connect with our principal architects to diagnose your application bottlenecks, evaluate security compliance, and plan a robust timeline.",
    primary: { label: "Book a free consultation", href: routes.contact },
    secondary: { label: "Learn our integration models", href: routes.technology },
  },
} as const;
