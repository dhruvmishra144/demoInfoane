import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { industriesPage } from "@/content/pages";

export const metadata: Metadata = {
  title: industriesPage.metaTitle,
  description: industriesPage.metaDescription,
  alternates: { canonical: routes.industries },
};

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.industries,
          name: industriesPage.heading,
          description: industriesPage.metaDescription,
          breadcrumbs: [{ name: "Industries", path: routes.industries }],
        })}
      />

      <PageHero
        eyebrow="Industries"
        heading={industriesPage.heading}
        intro={industriesPage.intro}
        breadcrumbs={[]}
      />

      <Section
        id="sectors"
        eyebrow="Sector experience"
        title="Where we have delivered"
        lead="Each of these carries constraints that shape architecture rather than decorate it — regulatory scope, uptime expectations, and the systems you cannot replace."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {industriesPage.detail.map((industry) => (
            <article
              key={industry.slugId}
              id={industry.slugId}
              className="scroll-mt-28 rounded-3xl border border-ink-200 bg-white p-8"
            >
              <h3 className="text-xl font-semibold">{industry.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {industry.body}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-ink-100 pt-5">
                {industry.focus.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-600">
                    <icons.check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="Your sector not listed?"
        body="Domain knowledge transfers further than most agencies admit — the constraints that matter are usually regulatory, data-shaped or uptime-driven rather than industry-specific. Describe yours and we will tell you honestly whether we are a fit."
      />
    </>
  );
}
