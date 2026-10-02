import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CareersHero } from "@/components/careers/CareersHero";
import {
  CareersBenefits,
  CareersImpact,
  CareersInside,
  CareersVoices,
} from "@/components/careers/CareersSections";
import { CenterCta, Locations } from "@/components/design/blocks";
import { careersRedesign } from "@/content/redesign";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { getItemOrFallback } from "@/server/content/with-fallback";
import { pageFallback } from "@/server/content/static-fallback";

export async function generateMetadata(): Promise<Metadata> {
  const careersPage = await getItemOrFallback("page", "careers", pageFallback["careers"]);
  return {
    title: careersPage.metaTitle,
    description: careersPage.metaDescription,
    alternates: { canonical: routes.careers },
  };
}

/**
 * Careers landing (2026 redesign). Section order follows the mockup: hero,
 * benefits tabs, team voices, the dark impact panel, the Inside Infoane
 * gallery, locations and a closing call to action. The openings themselves
 * live at /careers/openings.
 *
 * Note: no JobPosting structured data yet, on purpose. JobPosting markup with
 * placeholder titles, no salary and no valid `datePosted` would be invalid, and
 * Google removes listings it cannot verify. Add it per role once the openings
 * are real — see CONTENT-TODO.md.
 */
export default async function CareersPage() {
  const careersPage = await getItemOrFallback("page", "careers", pageFallback["careers"]);
  const cta = careersRedesign.cta;

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.careers,
          name: careersPage.heading,
          description: careersPage.metaDescription,
          breadcrumbs: [{ name: "Careers", path: routes.careers }],
        })}
      />

      <CareersHero />
      <CareersBenefits />
      <CareersVoices />
      <CareersImpact />
      <CareersInside />
      <Locations lead="Three offices across the United States and India, connected by a shared standard of engineering delivery." />
      <CenterCta eyebrow={cta.eyebrow} title={cta.title} body={cta.body} primary={cta.primary} secondary={cta.secondary} />
    </>
  );
}
