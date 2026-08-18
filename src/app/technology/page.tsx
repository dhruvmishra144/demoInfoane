import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { pageSchema } from "@/lib/schema";
import { routes, serviceHref } from "@/lib/routes";
import { technologyPage } from "@/content/pages";
import { servicePages } from "@/content/services";

export const metadata: Metadata = {
  title: technologyPage.metaTitle,
  description: technologyPage.metaDescription,
  alternates: { canonical: routes.technology },
};

export default function TechnologyPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.technology,
          name: technologyPage.heading,
          description: technologyPage.metaDescription,
          breadcrumbs: [{ name: "Technology", path: routes.technology }],
        })}
      />

      <PageHero
        eyebrow="Technology"
        heading={technologyPage.heading}
        intro={technologyPage.intro}
        breadcrumbs={[]}
      />

      <Section
        id="stack"
        eyebrow="Our stack"
        title="What we build with"
        lead="Grouped by layer, with a note on when each one earns its place."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologyPage.groups.map((group) => (
            <article
              key={group.group}
              className="flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-7"
            >
              <h3 className="text-lg font-semibold">{group.group}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {group.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-ink-100 pt-5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="how-we-choose"
        tone="dark"
        eyebrow="Selection criteria"
        title="How we choose between them"
        lead="Technology choices outlive the people who make them. These are the tie-breakers we apply."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {technologyPage.principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-3xl bg-white/5 p-7 ring-1 ring-inset ring-white/10"
            >
              <h3 className="text-base font-semibold text-white">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="services-using-stack"
        tone="muted"
        eyebrow="Put to work"
        title="Where we apply it"
        lead="Each service page lists the specific technologies that engagement typically involves."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service.slug)}
                className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
              >
                <span className="text-base font-semibold text-ink-900">
                  {service.title}
                </span>
                <span className="mt-2 text-sm text-ink-500">
                  {service.navDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        heading="Working in a stack we have not listed?"
        body="Ask. The list reflects what our clients run, not the limit of what we will work on — and we would rather tell you we are not the right fit than learn your platform on your budget."
      />
    </>
  );
}
