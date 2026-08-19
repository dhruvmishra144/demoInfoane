import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";
import { Process } from "@/components/sections/Process";
import { pageSchema } from "@/lib/schema";
import { routes, serviceHref } from "@/lib/routes";
import {
  getCollectionOrFallback,
  getSettingsOrFallback,
} from "@/server/content/with-fallback";
import {
  serviceFallback,
  processFallback,
  settingsFallback,
} from "@/server/content/static-fallback";

export const metadata: Metadata = {
  title: "IT Services & Software Development Services",
  description:
    "Our services: custom software development, cloud migration and DevOps, legacy modernization, data engineering, AI automation and dedicated development teams.",
  alternates: { canonical: routes.services },
};

export default async function ServicesIndexPage() {
  const servicePages = await getCollectionOrFallback("service", serviceFallback);
  const processSteps = await getCollectionOrFallback("process", processFallback);
  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.services,
          name: "IT Services & Software Development Services",
          description: metadata.description as string,
          // CollectionPage tells search engines this is an index of the
          // service pages rather than a service page in its own right.
          type: "CollectionPage",
          breadcrumbs: [{ name: "Services", path: routes.services }],
        })}
      />

      <PageHero
        eyebrow="Services"
        heading="What we do"
        intro={[
          "Six practices covering the full lifecycle of a system — from the first architecture decision to running it at scale in production.",
          "Most clients start with one and expand. If you are not sure which applies, describe the problem and we will tell you, including when the answer is that you do not need us.",
        ]}
        breadcrumbs={[]}
      />

      <Section
        id="all-services"
        eyebrow="Our practices"
        title="Services in detail"
        lead="Each page covers the symptoms that lead clients here, how we approach the work, what you receive, and the technologies involved."
      >
        <ul className="grid gap-6 md:grid-cols-2">
          {servicePages.map((service) => (
            <li key={service.slug}>
              <article className="group flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
                <h3 className="text-xl font-semibold">
                  <Link
                    href={serviceHref(service.slug)}
                    className="text-ink-900 hover:text-brand-700"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
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
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {/* Descriptive anchor text, not "Learn more" — the link
                        text is a ranking signal for the page it points at. */}
                    Explore {service.title.toLowerCase()}
                    <icons.arrow className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Process steps={processSteps} />

      <CtaBand
        heading="Not sure which service you need?"
        body="Describe the problem rather than the solution. We will tell you which of these applies — or that configuration solves it and you should keep your budget."
        settings={settings}
      />
    </>
  );
}
