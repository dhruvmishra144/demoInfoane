import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { site } from "@/config/site";

/**
 * NOINDEXED ON PURPOSE — same reasoning as the privacy policy. Remove the
 * `robots` block once the final text is reviewed.
 *
 * These are website terms of use, which are separate from the master services
 * agreement you sign with clients. Both should be drafted or reviewed by a
 * qualified professional; the headings below are a checklist, not legal advice.
 */
export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${site.name} website.`,
  alternates: { canonical: routes.terms },
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "Acceptance of terms",
    body: "[State that using the site constitutes acceptance, and how you notify visitors of changes.]",
  },
  {
    heading: "Use of this website",
    body: "[Permitted and prohibited use: no scraping beyond what robots.txt allows, no attempts to disrupt the service, no misuse of contact channels.]",
  },
  {
    heading: "Intellectual property",
    body: "[Who owns the site content, trade marks and logos, and what visitors may quote or reproduce. Note separately that client project IP transfers to the client under your services agreement.]",
  },
  {
    heading: "Content accuracy",
    body: "[Site content is informational; nothing on it is an offer or a professional recommendation for a specific situation.]",
  },
  {
    heading: "Third-party links",
    body: "[You are not responsible for the content or practices of sites you link to.]",
  },
  {
    heading: "Limitation of liability",
    body: "[The limitation you and your counsel decide on, within what the applicable jurisdiction permits.]",
  },
  {
    heading: "Governing law",
    body: "[Which jurisdiction's law applies and where disputes are heard.]",
  },
  {
    heading: "Contact",
    body: "[Where to send questions about these terms.]",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading="Terms of Service"
        intro={[
          "This page is a placeholder structure and is excluded from search engines until the final text is in place.",
        ]}
        breadcrumbs={[]}
      />

      <Section
        id="terms"
        eyebrow="Draft structure"
        title="Sections these terms need to cover"
        lead="Last updated: [date]. Replace every bracketed section below with reviewed text."
      >
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <article key={section.heading}>
              <h3 className="text-lg font-semibold">{section.heading}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{section.body}</p>
            </article>
          ))}

          <p className="rounded-2xl border border-ink-200 bg-ink-50 p-6 text-sm leading-relaxed text-ink-600">
            Questions about these terms:{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-brand-700 hover:text-brand-800"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
