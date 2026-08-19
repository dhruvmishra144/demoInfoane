import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { getItemOrFallback, getSettingsOrFallback } from "@/server/content/with-fallback";
import { pageFallback, settingsFallback } from "@/server/content/static-fallback";


export async function generateMetadata(): Promise<Metadata> {
  const about = await getItemOrFallback("page", "about", pageFallback["about"]);
  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: { canonical: routes.about },
  };
}

export default async function AboutPage() {
  const about = await getItemOrFallback("page", "about", pageFallback["about"]);
  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.about,
          name: about.heading,
          description: about.metaDescription,
          type: "AboutPage",
          breadcrumbs: [{ name: "About Us", path: routes.about }],
        })}
      />

      <PageHero
        eyebrow="About Us"
        heading={about.heading}
        intro={about.intro}
        breadcrumbs={[]}
      />

      <section aria-label="Company facts" className="border-b border-ink-100 bg-white">
        <div className="container-x py-12">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {settings.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold text-ink-900 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-500">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section
        id="principles"
        eyebrow="How we operate"
        title="Six things we hold to"
        lead="These are commitments, not values on a wall. Hold us to them — and tell us when we slip."
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {about.principles.map((principle) => (
            <li
              key={principle.title}
              className="rounded-3xl border border-ink-200 bg-white p-7"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <icons.check className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{principle.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {principle.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Named leadership with real backgrounds is the strongest experience and
          trust signal an agency has. Placeholder until you send bios. */}
      <Section
        id="leadership"
        tone="muted"
        eyebrow="Leadership"
        title="Who you will actually be working with"
        lead="The people who scope your engagement stay on it. No handoff to a delivery team you have never met."
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {about.leadership.map((person) => (
            <li key={person.role}>
              <article className="flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-7">
                <div
                  className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-base font-semibold">{person.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-700">
                  {person.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                  {person.bio}
                </p>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  LinkedIn profile
                  <icons.arrow className="h-4 w-4" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="milestones"
        eyebrow="Timeline"
        title="How we got here"
      >
        <ol className="mx-auto max-w-2xl">
          {about.milestones.map((milestone, index) => (
            <li
              key={index}
              className="relative flex gap-6 border-l border-ink-200 pb-8 pl-8 last:border-transparent last:pb-0"
            >
              <span
                className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-600"
                aria-hidden="true"
              />
              <div>
                <span className="text-sm font-bold text-brand-600">
                  {milestone.year}
                </span>
                <p className="mt-1 text-base text-ink-700">{milestone.event}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="offices"
        tone="dark"
        eyebrow="Where we are"
        title="Our offices"
        lead="Delivery teams work with an overlap to your business hours — the location matters less than the overlap, and we staff for the overlap."
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {settings.offices.map((office) => (
            <li
              key={office.label}
              className="rounded-3xl bg-white/5 p-7 ring-1 ring-inset ring-white/10"
            >
              <p className="flex items-center gap-2 text-base font-semibold text-white">
                <icons.pin className="h-5 w-5 shrink-0 text-brand-400" />
                {office.label}
                {office.isHeadquarters && (
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-300">
                    HQ
                  </span>
                )}
              </p>
              <address className="mt-3 not-italic text-sm leading-relaxed text-ink-300">
                {office.street}
                <br />
                {office.city}, {office.region} {office.postalCode}
                <br />
                <a
                  href={`tel:${office.phone}`}
                  className="text-brand-200 hover:text-brand-400"
                >
                  {office.phoneDisplay}
                </a>
              </address>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-ink-400">
          Hiring at the moment — see{" "}
          <Link
            href={routes.careers}
            className="font-medium text-brand-200 underline decoration-brand-200/40 underline-offset-4 hover:text-brand-400"
          >
            open roles
          </Link>
          .
        </p>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
