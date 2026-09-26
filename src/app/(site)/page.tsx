import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeAi, HomeServices } from "@/components/home/HomeServices";
import { HomeApproach } from "@/components/home/HomeApproach";
import { HomeContact, HomeIndustries } from "@/components/home/HomeIndustriesContact";
import { pageSchema } from "@/lib/schema";
import { getItemOrFallback, getSettingsOrFallback } from "@/server/content/with-fallback";
import { pageFallback, settingsFallback } from "@/server/content/static-fallback";

/**
 * Homepage metadata. The title leads with the service, not the brand: nobody
 * searches for a company they have not heard of, and Google truncates around 60
 * characters — so the words that earn the click go first.
 */
export async function generateMetadata(): Promise<Metadata> {
  const home = await getItemOrFallback("page", "home", pageFallback.home);
  const settings = await getSettingsOrFallback(settingsFallback);
  return {
    // `absolute` bypasses the layout's "%s | Infoane" template, which would
    // otherwise append the brand name a second time.
    title: { absolute: `${home.metaTitle} | ${settings.name}` },
    description: home.metaDescription,
    alternates: { canonical: "/" },
  };
}

/**
 * Homepage (2026 redesign). Section order follows the mockup: hero, about +
 * numbers + ColdFusion card, services, AI, approach, industries, contact.
 *
 * The previous homepage sections still live in components/sections, where the
 * inner pages use them. The FAQ is no longer on this page, so neither is its
 * FAQPage structured data — that markup is only valid for visible questions.
 */
export default async function HomePage() {
  // Sequential, not Promise.all: D1's remote connection during static
  // generation only tolerates one session at a time.
  const settings = await getSettingsOrFallback(settingsFallback);
  const home = await getItemOrFallback("page", "home", pageFallback.home);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/",
          name: `${settings.name} — ${settings.tagline}`,
          description: home.metaDescription,
        })}
      />
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeAi />
      <HomeApproach />
      <HomeIndustries />
      <HomeContact email={settings.contact.email} />
    </>
  );
}
