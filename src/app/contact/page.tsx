import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { icons } from "@/components/ui/Icons";
import { pageSchema } from "@/lib/schema";
import { routes, serviceHref } from "@/lib/routes";
import { contactPage } from "@/content/pages";
import { servicePages } from "@/content/services";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  alternates: { canonical: routes.contact },
};

/**
 * The form here has no backend by design: it composes a prefilled email in the
 * visitor's own mail client, so nothing is silently swallowed and no personal
 * data passes through us before a privacy policy exists. Every other route on the
 * page (email, phone per office) works today too. See CONTENT-TODO.md for wiring
 * it to a CRM.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.contact,
          name: contactPage.heading,
          description: contactPage.metaDescription,
          type: "ContactPage",
          breadcrumbs: [{ name: "Contact Us", path: routes.contact }],
        })}
      />

      <PageHero
        eyebrow="Contact Us"
        heading={contactPage.heading}
        intro={contactPage.intro}
        breadcrumbs={[]}
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-400">
          {contactPage.expectations.map((item) => (
            <li key={item} className="inline-flex items-center gap-2">
              <icons.check className="h-4 w-4 text-brand-400" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section
        id="reach-us"
        eyebrow="Direct lines"
        title="How to reach us"
        lead="Email gets the fastest considered answer; the phone gets the fastest answer. Both reach a person who can talk about the work."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-ink-200 bg-white p-8">
            <h3 className="text-lg font-semibold">Talk to us</h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-3 font-medium text-ink-900 hover:text-brand-700"
                >
                  <icons.mail className="h-5 w-5 shrink-0 text-brand-600" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center gap-3 font-medium text-ink-900 hover:text-brand-700"
                >
                  <icons.phone className="h-5 w-5 shrink-0 text-brand-600" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
            </ul>

            <div className="mt-8 border-t border-ink-100 pt-6">
              <h4 className="text-sm font-semibold text-ink-900">
                What to include
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-600">
                {[
                  "The system or process that is causing the problem",
                  "The outcome you need, and any date driving it",
                  "Constraints: stack, compliance, in-house team",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <icons.check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ink-500">
                We use what you send only to answer your enquiry, and nothing is
                shared with third parties. See our{" "}
                <Link
                  href={routes.privacy}
                  className="underline decoration-ink-300 underline-offset-2 hover:text-ink-800"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* ── SLOT: booking widget or CRM form ───────────────────────────────
              The form below composes a prefilled email rather than posting to a
              server, so no lead is ever silently dropped. Swap it for your
              Calendly/HubSpot embed, or point EnquiryForm at a real endpoint. */}
          <div className="rounded-3xl border border-ink-200 bg-ink-50 p-8">
            <h3 className="text-lg font-semibold">Book a consultation</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              A free {site.promises.consultationLength} call with an engineer who
              has shipped work like yours. No sales script, no obligation.
            </p>
            <div className="mt-7">
              <EnquiryForm tone="light" />
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="offices"
        tone="dark"
        eyebrow="Offices"
        title="Where we are"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {site.offices.map((office) => (
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
      </Section>

      <Section
        id="which-service"
        tone="muted"
        eyebrow="Or start with a service"
        title="Know what you need already?"
        lead="Go straight to the relevant service page — each one lists what the engagement involves and what you receive."
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
    </>
  );
}
