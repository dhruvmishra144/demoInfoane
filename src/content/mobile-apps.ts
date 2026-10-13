/**
 * Copy for the Mobile App Development service page, from "Infoane Service
 * Page 2: Mobile App Development, Content Draft V1". The draft states that no
 * statistics, client names, certifications, ratings, app counts or performance
 * metrics were added, so none belong here. The layout lives in
 * components/services; this file holds only words and links.
 */

import type { IconName } from "@/content/redesign";
import { routes, serviceHref } from "@/lib/routes";

export const mobileApps = {
  meta: {
    title: "Mobile App Development Services | Infoane Technologies",
    description:
      "Build reliable mobile applications with Infoane. Get custom iOS, Android, Flutter, React Native, cross-platform development, testing, and support.",
  },

  hero: {
    eyebrow: "Mobile App Development",
    headline: "Mobile App Development Services Built for Your Business",
    subhead:
      "Build mobile applications that combine intuitive design, reliable performance, and the flexibility to support your business as it grows.",
    body: "Infoane develops mobile applications for iOS, Android, and cross-platform environments. From discovery and UI design to development, testing, deployment, and ongoing support, we build applications around your business objectives, user needs, and technical requirements.",
    primaryCta: { label: "Talk to Our Mobile App Experts", href: routes.contact },
    secondaryCta: { label: "Start Your Project", href: routes.contact },
    chips: ["iOS", "Android", "Flutter", "React Native"],
  },

  intro: {
    eyebrow: "Introduction",
    title: "Mobile Applications Designed Around Your Users and Business Goals",
    paragraphs: [
      "A successful mobile application needs to do more than work across devices. It should be easy to use, responsive, reliable, and aligned with the way your business operates.",
      "Infoane provides mobile application development services covering discovery, design, development, testing, deployment, maintenance, and technical support. We work across native, hybrid, and cross-platform development, including Flutter and React Native, to build applications that meet defined business and technical requirements.",
      "Whether you are building a new application or improving an existing one, our approach focuses on usability, performance, quality, and long-term maintainability.",
    ],
    cta: { label: "Discuss Your Mobile App Requirements", href: routes.contact },
  },

  services: {
    eyebrow: "Our services",
    title: "Our Mobile App Development Services",
    items: [
      {
        icon: "phone" as IconName,
        title: "Flutter App Development",
        body: "Build applications for iOS, Android, and cross-platform environments using Flutter, with consistent functionality and design from a single codebase.",
      },
      {
        icon: "code" as IconName,
        title: "React Native Development",
        body: "Develop cross-platform mobile applications using React Native, supporting efficient development and long-term maintenance across iOS and Android.",
      },
      {
        icon: "chip" as IconName,
        title: "Custom Mobile App Development",
        body: "Design and build mobile applications from the ground up based on your specifications, business requirements, and user needs.",
      },
      {
        icon: "monitor" as IconName,
        title: "Native & Hybrid App Development",
        body: "Choose the right development approach based on application requirements, performance expectations, functionality, and project considerations.",
      },
      {
        icon: "globe" as IconName,
        title: "UI Design & Mobile Experience",
        body: "Create intuitive mobile interfaces with thoughtful navigation, onboarding, layouts, and interaction patterns designed around the user experience.",
      },
      {
        icon: "check" as IconName,
        title: "Quality-Assured App Delivery",
        body: "Applications undergo internal review and testing to validate functionality, usability, responsiveness, and overall application quality before delivery.",
      },
      {
        icon: "shield" as IconName,
        title: "Application Maintenance & Support",
        body: "Keep applications current and stable after launch through ongoing customization, technical support, maintenance, and performance improvements.",
      },
      {
        icon: "chart" as IconName,
        title: "Performance Optimization",
        body: "Improve application responsiveness, stability, and efficient resource usage across supported devices and platforms.",
      },
    ],
  },

  capabilities: {
    eyebrow: "Capabilities",
    title: "Mobile Application Capabilities",
    items: [
      {
        title: "iOS & Android Development",
        body: "Develop applications for major mobile platforms while maintaining consistent functionality and user experience.",
      },
      {
        title: "Cross-Platform Development",
        body: "Build applications using Flutter and React Native to support multiple platforms with efficient development and maintenance.",
      },
      {
        title: "Responsive Mobile Experiences",
        body: "Design interfaces that adapt effectively to different device sizes, screen resolutions, and usage scenarios.",
      },
      {
        title: "Performance-Focused Architecture",
        body: "Apply appropriate application architecture and development practices to support responsiveness, stability, and efficient resource usage.",
      },
      {
        title: "Full-Cycle Development",
        body: "Support the complete application lifecycle from discovery and design through development, testing, deployment, and maintenance.",
      },
      {
        title: "Ongoing Application Support",
        body: "Continue improving and maintaining applications after launch as business requirements, platforms, and user expectations evolve.",
      },
    ],
  },

  technology: {
    eyebrow: "Technology expertise",
    title: "Mobile Technologies for Modern Application Development",
    lead: "The right mobile technology depends on your application requirements, target platforms, functionality, performance expectations, and long-term maintenance needs.",
    groups: [
      {
        label: "Mobile development technologies",
        items: [
          "Flutter",
          "React Native",
          "iOS Development",
          "Android Development",
          "Native Application Development",
          "Hybrid Application Development",
          "Cross-Platform Application Development",
        ],
      },
      {
        label: "Supporting capabilities",
        items: [
          "Mobile UI/UX",
          "Responsive Layouts",
          "API Integration",
          "Application Testing",
          "Performance Optimization",
          "Application Maintenance",
          "Technical Support",
        ],
      },
    ],
    cta: { label: "Explore Our Technology Expertise", href: routes.technology },
  },

  why: {
    eyebrow: "Why Infoane",
    title: "Why Choose Infoane for Mobile App Development",
    items: [
      {
        title: "Business-Focused Development",
        body: "We start with your application requirements and business objectives so development stays aligned with what the application needs to achieve.",
      },
      {
        title: "Full-Cycle Support",
        body: "From discovery and design to development, testing, deployment, and support, Infoane can support the complete application lifecycle.",
      },
      {
        title: "Cross-Platform Expertise",
        body: "Our mobile development capabilities include Flutter and React Native alongside native and hybrid application approaches.",
      },
      {
        title: "User-Centered Design",
        body: "Navigation, layouts, onboarding, and interface elements are developed with usability and the user experience in mind.",
      },
      {
        title: "Quality-Focused Delivery",
        body: "Applications are reviewed and tested before delivery to help identify functional and usability issues early.",
      },
      {
        title: "Long-Term Support",
        body: "Our involvement can continue beyond launch with customization, maintenance, technical support, and performance optimization.",
      },
    ],
  },

  benefits: {
    eyebrow: "Business benefits",
    title: "What Better Mobile Applications Can Deliver",
    items: [
      "Consistent experiences across supported mobile platforms",
      "More intuitive application navigation and usability",
      "Better application responsiveness and stability",
      "Faster deployment across multiple platforms",
      "Reduced effort involved in maintaining separate applications",
      "Flexible application development based on business requirements",
      "Improved accessibility for users across devices",
      "Ongoing application improvements after launch",
      "Better alignment between application functionality and business objectives",
      "A mobile experience that can evolve with changing business needs",
    ],
  },

  approach: {
    eyebrow: "Our approach",
    title: "From App Idea to Production and Beyond",
    steps: [
      {
        title: "Discover",
        body: "Understand your business objectives, users, application requirements, and technical expectations.",
      },
      {
        title: "Plan",
        body: "Define the application scope, platform requirements, functionality, technology approach, and development priorities.",
      },
      {
        title: "Design",
        body: "Create the application experience, navigation, layouts, and interface elements around user needs.",
      },
      {
        title: "Develop",
        body: "Build the application using the appropriate native, hybrid, or cross-platform technology.",
      },
      {
        title: "Test",
        body: "Validate functionality, usability, performance, responsiveness, and application quality across supported environments.",
      },
      {
        title: "Deploy",
        body: "Prepare and release the application for the required platforms.",
      },
      {
        title: "Support & Improve",
        body: "Provide ongoing maintenance, customization, technical support, and performance improvements.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is mobile app development?",
        answer:
          "Mobile app development involves designing, building, testing, and deploying applications for mobile platforms such as iOS and Android.",
      },
      {
        question: "Does Infoane develop both native and cross-platform mobile applications?",
        answer:
          "Yes. Infoane's mobile development capabilities include native, hybrid, and cross-platform application development, including Flutter and React Native.",
      },
      {
        question: "Does Infoane develop Flutter applications?",
        answer:
          "Yes. Infoane provides Flutter application development for iOS, Android, and cross-platform environments.",
      },
      {
        question: "Can Infoane develop React Native applications?",
        answer: "Yes. Infoane develops cross-platform mobile applications using React Native for iOS and Android.",
      },
      {
        question: "Can Infoane build a mobile application from scratch?",
        answer:
          "Yes. Infoane provides custom mobile application development based on client-defined specifications, business requirements, and application objectives.",
      },
      {
        question: "Do you provide mobile application maintenance and support?",
        answer:
          "Yes. Support can include ongoing customization, technical maintenance, application support, and performance optimization after launch.",
      },
      {
        question: "Can Infoane help improve an existing mobile application?",
        answer:
          "Yes. Existing applications can be supported through maintenance, customization, performance optimization, and ongoing technical improvements.",
      },
    ],
  },

  /** The draft's recommended internal links. Pages that do not exist yet point at the services index. */
  related: {
    eyebrow: "Related",
    title: "Explore related services",
    links: [
      { label: "Web Application Development", href: routes.webApplications },
      { label: "QA & Software Testing", href: routes.services },
      { label: "Cloud & DevOps", href: serviceHref("cloud-migration-devops") },
      { label: "Data Engineering & Analytics", href: serviceHref("data-engineering-analytics") },
      { label: "Cybersecurity", href: routes.services },
      { label: "Legacy Application Modernization", href: serviceHref("application-modernization") },
      { label: "Technology", href: routes.technology },
      { label: "About Infoane", href: routes.about },
    ],
  },

  cta: {
    eyebrow: "Get started",
    title: "Have a Mobile App to Build or Improve?",
    body: "Whether you are starting a new mobile application, expanding an existing product, or looking for ongoing application support, Infoane can help you plan, build, test, and maintain the right solution for your business.",
    primary: { label: "Talk to Our Mobile App Experts", href: routes.contact },
    secondary: { label: "Contact Infoane", href: routes.contact },
  },
} as const;
