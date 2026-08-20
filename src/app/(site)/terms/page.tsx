import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { site } from "@/config/site";
import { sectionCopy } from "@/lib/page-sections";
import { getItemOrFallback, getSettingsOrFallback } from "@/server/content/with-fallback";
import { pageFallback, settingsFallback } from "@/server/content/static-fallback";

/**
 * NOINDEXED ON PURPOSE — same reasoning as the privacy policy. Remove the
 * `robots` block once the final text is reviewed.
 *
 * These are website terms of use, which are separate from the master services
 * agreement you sign with clients. Both should be drafted or reviewed by a
 * qualified professional; the copy below (editable in admin under Pages →
 * Terms of service) is a checklist, not legal advice.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getItemOrFallback("page", "terms", pageFallback["terms"]);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: routes.terms },
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage() {
  const page = await getItemOrFallback("page", "terms", pageFallback["terms"]);
  const settings = await getSettingsOrFallback(settingsFallback);
  const copy = sectionCopy(page.sections, "terms", "sections", settings);

  return (
    <>
      <PageHero eyebrow="Legal" heading={page.heading} intro={page.intro} breadcrumbs={[]} />

      <Section id="terms" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead}>
        <div className="mx-auto max-w-3xl space-y-10">
          {page.blocks.map((block) => (
            <article key={block.title}>
              <h3 className="text-lg font-semibold">{block.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{block.body}</p>
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
