import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { icons } from "@/components/ui/Icons";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { careersPage as careersPageFallback } from "@/content/pages";
import { getItemOrFallback, getSettingsOrFallback } from "@/server/content/with-fallback";
import { settingsFallback } from "@/server/content/static-fallback";

const pageFallback = {
  metaTitle: careersPageFallback.metaTitle,
  metaDescription: careersPageFallback.metaDescription,
  heading: careersPageFallback.heading,
  intro: careersPageFallback.intro,
  blocks: [],
  principles: [],
  leadership: [],
  milestones: [],
  benefits: careersPageFallback.benefits,
  hiringProcess: careersPageFallback.hiringProcess,
  openings: careersPageFallback.openings,
  techGroups: [],
  expectations: [],
  slug: "careers",
};

export async function generateMetadata(): Promise<Metadata> {
  const careersPage = await getItemOrFallback("page", "careers", pageFallback);
  return {
    title: careersPage.metaTitle,
    description: careersPage.metaDescription,
    alternates: { canonical: routes.careers },
  };
}

/**
 * Note: no JobPosting structured data yet, on purpose. JobPosting markup with
 * placeholder titles, no salary and no valid `datePosted` would be invalid, and
 * Google removes listings it cannot verify. Add it per role once the openings
 * are real — see CONTENT-TODO.md.
 */
export default async function CareersPage() {
  const careersPage = await getItemOrFallback("page", "careers", pageFallback);
  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.careers,
          name: careersPage.heading,
          description: careersPage.metaDescription,
          breadcrumbs: [{ name: "Careers", path: routes.careers }],
        })}
      />

      <PageHero
        eyebrow="Careers"
        heading={careersPage.heading}
        intro={careersPage.intro}
        breadcrumbs={[]}
      >
        <Button href={`mailto:${settings.contact.email}`}>
          Send us your CV
        </Button>
      </PageHero>

      <Section
        id="openings"
        eyebrow="Open roles"
        title="Where we are hiring"
        lead="If none of these fit but you think you should be here, write to us anyway and say why."
      >
        <ul className="space-y-4">
          {careersPage.openings.map((opening, index) => (
            <li key={index}>
              <article className="flex flex-col gap-5 rounded-3xl border border-ink-200 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{opening.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {opening.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
                    <li className="inline-flex items-center gap-1.5">
                      <icons.pin className="h-4 w-4 text-brand-500" />
                      {opening.location}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <icons.check className="h-4 w-4 text-brand-500" />
                      {opening.type}
                    </li>
                  </ul>
                </div>
                <Button
                  href={`mailto:${settings.contact.email}?subject=${encodeURIComponent(
                    `Application: ${opening.title}`,
                  )}`}
                  variant="light"
                  
                  className="shrink-0"
                >
                  Apply
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="benefits"
        tone="muted"
        eyebrow="What we offer"
        title="The practical details"
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careersPage.benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-3xl border border-ink-200 bg-white p-7"
            >
              <h3 className="text-base font-semibold">{benefit.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {benefit.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="hiring-process"
        eyebrow="Hiring process"
        title="What to expect, in order"
        lead="Four steps, and you hear back at each one. We know what it is like to be left waiting."
      >
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {careersPage.hiringProcess.map((step) => (
            <li
              key={step.step}
              className="rounded-3xl border border-ink-200 bg-white p-7"
            >
              <span className="text-sm font-bold text-brand-600" aria-hidden="true">
                {step.step}
              </span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        heading="Not seeing your role?"
        body="Tell us what you want to work on and what you have shipped. We read every application, and we reply either way."
        settings={settings}
      />
    </>
  );
}
