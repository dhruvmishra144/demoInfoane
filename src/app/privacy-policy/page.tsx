import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { site } from "@/config/site";

/**
 * NOINDEXED ON PURPOSE.
 *
 * This is a structural skeleton, not a privacy policy. It stays out of the index
 * until a real one is in place — a placeholder policy in search results is a
 * credibility and compliance problem. Remove the `robots` block below once the
 * final text is reviewed.
 *
 * A privacy policy is a legal document. Have it drafted or reviewed by a
 * qualified professional for the jurisdictions you operate in (GDPR for EU
 * visitors, the DPDP Act in India, CCPA in California, and so on) — the headings
 * below are a checklist of what such a policy usually has to cover, not legal
 * advice.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  alternates: { canonical: routes.privacy },
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "Who we are",
    body: "[Legal entity name, registered address, and the contact details of the person or team responsible for data protection enquiries. Name your Data Protection Officer if you are required to have one.]",
  },
  {
    heading: "What information we collect",
    body: "[List each category: information submitted through forms or email, information collected automatically such as IP address and browser type, and anything collected via cookies or analytics. Be specific — vague categories are the most common weakness in a policy.]",
  },
  {
    heading: "Why we collect it and our lawful basis",
    body: "[For each purpose — answering enquiries, delivering services, recruitment, marketing — state the purpose and the lawful basis you rely on (consent, contract, legitimate interests, legal obligation).]",
  },
  {
    heading: "Cookies and analytics",
    body: "[Which cookies you set, which are strictly necessary, and which require consent. Name your analytics provider and link its policy. If you deploy anything beyond strictly necessary cookies, you need a consent banner before it loads — the site does not have one yet.]",
  },
  {
    heading: "Who we share information with",
    body: "[Named categories of processors: hosting, email, CRM, analytics. State whether data is transferred outside its country of origin and what safeguards apply.]",
  },
  {
    heading: "How long we keep it",
    body: "[Retention period per category, and what triggers deletion.]",
  },
  {
    heading: "Your rights",
    body: "[Access, correction, deletion, portability, objection, and withdrawal of consent — plus how to exercise them, how quickly you will respond, and which regulator a visitor can complain to.]",
  },
  {
    heading: "Security",
    body: "[The measures you actually take: encryption in transit and at rest, access control, staff training, breach notification process. Do not describe controls you do not have.]",
  },
  {
    heading: "Changes to this policy",
    body: "[How you notify people about changes, and the date this version took effect.]",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading="Privacy Policy"
        intro={[
          "This page is a placeholder structure and is excluded from search engines until the final text is in place.",
        ]}
        breadcrumbs={[]}
      />

      <Section
        id="policy"
        eyebrow="Draft structure"
        title="Sections this policy needs to cover"
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
            Contact for privacy enquiries:{" "}
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
