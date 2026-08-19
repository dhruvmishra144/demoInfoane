import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { pageSchema } from "@/lib/schema";
import { routes, serviceHref } from "@/lib/routes";
import { resolveLabels, sectionCopy } from "@/lib/page-sections";
import {
  getItemOrFallback,
  getCollectionOrFallback,
  getSettingsOrFallback,
} from "@/server/content/with-fallback";
import { caseStudyFallback, pageFallback, serviceFallback, settingsFallback, testimonialFallback } from "@/server/content/static-fallback";


export async function generateMetadata(): Promise<Metadata> {
  const caseStudiesPage = await getItemOrFallback("page", "case-studies", pageFallback["case-studies"]);
  return {
    title: caseStudiesPage.metaTitle,
    description: caseStudiesPage.metaDescription,
    alternates: { canonical: routes.caseStudies },
  };
}

export default async function CaseStudiesPage() {
  const caseStudiesPage = await getItemOrFallback("page", "case-studies", pageFallback["case-studies"]);
  const caseStudies = await getCollectionOrFallback("caseStudy", caseStudyFallback);
  const servicePages = await getCollectionOrFallback("service", serviceFallback);
  const testimonials = await getCollectionOrFallback("testimonial", testimonialFallback);
  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.caseStudies,
          name: caseStudiesPage.heading,
          description: caseStudiesPage.metaDescription,
          type: "CollectionPage",
          breadcrumbs: [{ name: "Case Studies", path: routes.caseStudies }],
        })}
      />

      <PageHero
        eyebrow="Our work"
        heading={caseStudiesPage.heading}
        intro={caseStudiesPage.intro}
        breadcrumbs={[]}
      />

      <Section
        id="studies"
        eyebrow="Engagements"
        title="Problem, approach, result"
        lead="No hero narratives. What was broken, what we did about it, and the number that changed."
      >
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className="grid gap-8 rounded-3xl border border-ink-200 bg-white p-8 lg:grid-cols-[2fr_1fr] lg:p-10"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                  {study.industry}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{study.client}</h3>

                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-ink-900">Challenge</dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-600">
                      {study.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-900">What we did</dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-600">
                      {study.outcome}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-ink-950 p-8">
                <span className="block text-4xl font-bold text-white">
                  {study.metric}
                </span>
                <span className="mt-2 block text-sm text-ink-300">
                  {study.metricLabel}
                </span>
              </div>
            </article>
          ))}
        </div>

      </Section>

      <Testimonials
        testimonials={testimonials}
        copy={sectionCopy(caseStudiesPage.sections, "case-studies", "testimonials", settings)}
        labels={resolveLabels(caseStudiesPage.labels, "case-studies", settings)}
      />

      <Section
        id="services-behind"
        tone="muted"
        eyebrow="Services involved"
        title="The work behind these results"
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
        heading="Want to talk to one of these clients?"
        body="We will put you in touch with a reference whose problem resembled yours. Ask them what happened when something went wrong — that is the answer worth having."
        settings={settings}
      />
    </>
  );
}
