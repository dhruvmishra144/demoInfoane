import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission, AboutVision } from "@/components/about/AboutVisionMission";
import { AboutTrusted } from "@/components/about/AboutTrusted";
import { AboutExpertise } from "@/components/about/AboutExpertise";
import { AboutSuccess } from "@/components/about/AboutSuccess";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { CenterCta, Locations } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { getItemOrFallback } from "@/server/content/with-fallback";
import { pageFallback } from "@/server/content/static-fallback";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getItemOrFallback("page", "about", pageFallback["about"]);
  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: { canonical: routes.about },
  };
}

export default async function AboutPage() {
  // Sequential on purpose: one D1 round trip at a time, no Promise.all.
  const about = await getItemOrFallback("page", "about", pageFallback["about"]);

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

      <AboutHero />
      <AboutMission />
      <AboutVision />
      <AboutTrusted />
      <AboutExpertise />
      <AboutSuccess />
      <AboutLeadership />
      <Locations
        globe="/images/globe-dark.webp"
        lead="Three offices across the United States and India, connected by a shared standard of engineering delivery."
      />
      <CenterCta {...aboutPage.cta} />
    </>
  );
}
