import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeAi, HomeServices } from "@/components/home/HomeServices";
import { HomeApproach } from "@/components/home/HomeApproach";
import { HomeContact, HomeIndustries } from "@/components/home/HomeIndustriesContact";
import { HomeColdFusion, HomeWhy } from "@/components/home/HomeWhyColdFusion";
import { HomeFaq, HomeTechnology } from "@/components/home/HomeMore";
import { home as homeCopy } from "@/content/redesign";
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
 * Homepage. Section order follows the approved page mockup: hero, About,
 * ColdFusion spotlight, services, technology, AI, how we work, why Infoane,
 * industries, client reviews, FAQ and the closing contact form. Copy is "Home Page Content
 * Draft V3": no hero metrics, and no Trust or Careers sections.
 *
 * The FAQ is visible on the page, so its FAQPage structured data is valid —
 * that markup must only ever describe questions a visitor can actually see.
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
          name: `${settings.name} | ${settings.tagline}`,
          description: home.metaDescription,
          faqs: homeCopy.faq.items,
        })}
      />
      <HomeHero />
      <HomeAbout />
      <HomeColdFusion />
      <HomeServices />
      <HomeTechnology />
      <HomeAi />
      <HomeApproach />
      <HomeWhy />
      <HomeIndustries />
      <HomeFaq />
      <HomeContact email={settings.contact.email} />
    </>
  );
}
