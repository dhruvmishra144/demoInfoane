import Link from "next/link";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { icons } from "../ui/Icons";
import { routes, serviceHref } from "@/lib/routes";
import type { SectionCopy } from "@/lib/page-sections";
import type { CollectionData } from "@/server/content/schemas";

type Service = CollectionData["service"] & { slug: string };

export function Services({
  services,
  copy,
  labels,
}: {
  services: Service[];
  copy: SectionCopy;
  labels: Record<string, string>;
}) {
  return (
    <Section
      id="services"
      align="center"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.iconName];
          return (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 90}>
              <article className="group flex h-full flex-col rounded-4xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-950/8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-6 text-lg font-semibold">
                  <Link
                    href={serviceHref(service.slug)}
                    className="text-ink-900 transition-colors hover:text-brand-700"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-ink-100 pt-5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm text-ink-600">
                      <icons.check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href={serviceHref(service.slug)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    {/* Descriptive anchor text, not "Learn more" — the link text
                        is a ranking signal for the page it points at. */}
                    {labels["services.itemCta"]} {service.title.toLowerCase()}
                    <icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={200} className="mt-10 flex justify-center">
        <Button href={routes.services} variant="light">
          {copy.ctaLabel}
        </Button>
      </Reveal>
    </Section>
  );
}
