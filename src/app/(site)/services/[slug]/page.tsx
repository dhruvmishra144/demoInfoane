import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { icons } from "@/components/ui/Icons";
import { pageSchema } from "@/lib/schema";
import { routes, serviceHref } from "@/lib/routes";
import { getServiceBySlug, servicePages } from "@/content/services";

/**
 * One statically generated page per service.
 *
 * `generateStaticParams` prerenders all six at build time, and
 * `dynamicParams = false` makes any other slug a 404 rather than an on-demand
 * render — so the set of live URLs exactly matches the sitemap.
 */
export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const path = serviceHref(service.slug);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const path = serviceHref(service.slug);
  const related = service.related
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={pageSchema({
          path,
          name: service.heading,
          description: service.metaDescription,
          breadcrumbs: [
            { name: "Services", path: routes.services },
            { name: service.title, path },
          ],
          faqs: service.faqs,
          service,
        })}
      />

      <PageHero
        eyebrow="Services"
        heading={service.heading}
        intro={service.intro}
        breadcrumbs={[{ name: "Services", path: routes.services }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href={routes.contact}>
            Enquire Now
          </Button>
          <Button href="#deliverables" variant="onDark">
            What you receive
          </Button>
        </div>
      </PageHero>

      {/* Symptoms — buyers self-identify here before they read the offering. */}
      <Section
        id="signals"
        tone="muted"
        eyebrow="When to call us"
        title="You probably need this if…"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {service.signals.map((signal) => (
            <li
              key={signal}
              className="flex items-start gap-3.5 rounded-2xl border border-ink-200 bg-white p-6"
            >
              <icons.check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <span className="text-sm leading-relaxed text-ink-700">{signal}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="approach"
        eyebrow="How we work"
        title={`Our approach to ${service.title.toLowerCase()}`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {service.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-ink-200 bg-white p-8"
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="deliverables"
        tone="dark"
        eyebrow="Deliverables"
        title="What you actually receive"
        lead="Artefacts, not activity. Everything here is something you keep, and something you could hand to another supplier."
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {service.deliverables.map((deliverable) => (
            <li
              key={deliverable}
              className="flex items-start gap-3.5 rounded-2xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
            >
              <icons.check className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <span className="text-sm leading-relaxed text-ink-200">
                {deliverable}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <h3 className="text-sm font-semibold text-white">
            Technologies we use for this
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-ink-200 ring-1 ring-inset ring-white/10"
              >
                {technology}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-400">
            More on how we choose between them on our{" "}
            <Link
              href={routes.technology}
              className="font-medium text-brand-200 underline decoration-brand-200/40 underline-offset-4 hover:text-brand-400"
            >
              technology stack page
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="faq"
        tone="muted"
        eyebrow="FAQ"
        title={`${service.title}: common questions`}
      >
        <div className="mx-auto max-w-3xl divide-y divide-ink-200 border-y border-ink-200">
          {service.faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex items-start justify-between gap-6 text-left">
                <h3 className="text-base font-semibold text-ink-900">
                  {faq.question}
                </h3>
                <icons.chevron className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Related services keep crawlers moving between sibling pages and give
          buyers the adjacent service they usually need next. */}
      <Section
        id="related"
        eyebrow="Related services"
        title="Often needed alongside this"
      >
        <ul className="grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug}>
              <article className="flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-8">
                <h3 className="text-lg font-semibold">
                  <Link
                    href={serviceHref(item.slug)}
                    className="text-ink-900 hover:text-brand-700"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {item.summary}
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href={serviceHref(item.slug)}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Explore {item.title.toLowerCase()}
                    <icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand heading={`Talk to us about ${service.title.toLowerCase()}`} />
    </>
  );
}
