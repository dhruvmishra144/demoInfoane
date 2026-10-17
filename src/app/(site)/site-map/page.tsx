import type { Metadata } from "next";
import Link from "next/link";
import { jobs } from "@/content/jobs";
import { jobHref, routes, serviceHref } from "@/lib/routes";
import { getCollectionOrFallback } from "@/server/content/with-fallback";
import { serviceFallback } from "@/server/content/static-fallback";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "A list of every page on the Infoane website.",
  alternates: { canonical: "/site-map" },
};

/**
 * The page behind the footer's "Sitemap" link: the same pages the XML sitemap
 * lists (that file is for search engines and shows as raw markup in a browser),
 * as a readable list for people.
 */
export default async function SiteMapPage() {
  const services = await getCollectionOrFallback("service", serviceFallback);

  const groups = [
    {
      title: "Company",
      links: [
        { label: "Home", href: routes.home },
        { label: "About", href: routes.about },
        { label: "Industries", href: routes.industries },
        { label: "Technology", href: routes.technology },
        { label: "AI", href: routes.ai },
        { label: "Case studies", href: routes.caseStudies },
        { label: "Contact", href: routes.contact },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "All services", href: routes.services },
        { label: "Web Application Development", href: routes.webApplications },
        { label: "Mobile App Development", href: routes.mobileApps },
        ...services.map((service) => ({ label: service.title, href: serviceHref(service.slug) })),
      ],
    },
    {
      title: "Careers",
      links: [
        { label: "Careers", href: routes.careers },
        { label: "Current openings", href: routes.openings },
        { label: "Apply", href: routes.apply },
        ...jobs.map((job) => ({ label: job.title, href: jobHref(job.slug) })),
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: routes.privacy },
        { label: "Terms", href: routes.terms },
      ],
    },
  ];

  return (
    <div className="container-x pb-24 pt-[calc(6rem+84px)]">
      <h1 className="text-[40px] font-bold leading-[48px]">Sitemap</h1>
      <p className="mt-3 max-w-xl text-[16px] leading-[26px] text-body">Every page on the Infoane website.</p>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="eyebrow">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] leading-6 text-ink-700 transition-colors hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
