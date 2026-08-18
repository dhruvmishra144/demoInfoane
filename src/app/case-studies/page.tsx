import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { pageSchema } from "@/lib/schema";
import { routes, serviceHref } from "@/lib/routes";
import { caseStudiesPage } from "@/content/pages";
import { caseStudies } from "@/content/home";
import { servicePages } from "@/content/services";

export const metadata: Metadata = {
  title: caseStudiesPage.metaTitle,
  description: caseStudiesPage.metaDescription,
  alternates: { canonical: routes.caseStudies },
};

export default function CaseStudiesPage() {
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
          {caseStudies.map((study, index) => (
            <article
              key={index}
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

        {/* Reminder for whoever fills this in — delete once real studies land. */}
        <p className="mt-8 text-sm text-ink-400">
          Each of these will become its own page once the write-ups are approved;
          detail pages rank for the problem a prospect is searching for, which a
          summary card cannot.
        </p>
      </Section>

      <Testimonials />

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
      />
    </>
  );
}
