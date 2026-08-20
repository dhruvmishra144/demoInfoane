import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { site } from "@/config/site";
import { sectionCopy } from "@/lib/page-sections";
import { getItemOrFallback, getSettingsOrFallback } from "@/server/content/with-fallback";
import { pageFallback, settingsFallback } from "@/server/content/static-fallback";

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
 * visitors, the DPDP Act in India, CCPA in California, and so on) — the copy
 * below (editable in admin under Pages → Privacy policy) is a checklist of
 * what such a policy usually has to cover, not legal advice.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getItemOrFallback("page", "privacy-policy", pageFallback["privacy-policy"]);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: routes.privacy },
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getItemOrFallback("page", "privacy-policy", pageFallback["privacy-policy"]);
  const settings = await getSettingsOrFallback(settingsFallback);
  const copy = sectionCopy(page.sections, "privacy-policy", "sections", settings);

  return (
    <>
      <PageHero eyebrow="Legal" heading={page.heading} intro={page.intro} breadcrumbs={[]} />

      <Section id="policy" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead}>
        <div className="mx-auto max-w-3xl space-y-10">
          {page.blocks.map((block) => (
            <article key={block.title}>
              <h3 className="text-lg font-semibold">{block.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{block.body}</p>
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
