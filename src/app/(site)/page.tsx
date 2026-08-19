import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { Showcase } from "@/components/sections/Showcase";
import { Pillars } from "@/components/sections/Pillars";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import { TechStack } from "@/components/sections/TechStack";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { TrustBar } from "@/components/sections/TrustBar";
import { Industries } from "@/components/sections/Industries";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageSchema } from "@/lib/schema";
import {
  resolveHero,
  resolveLabels,
  sectionCopy,
  splitHeadline,
} from "@/lib/page-sections";
import {
  getCollectionOrFallback,
  getItemOrFallback,
  getSettingsOrFallback,
} from "@/server/content/with-fallback";
import {
  serviceFallback,
  industryFallback,
  caseStudyFallback,
  testimonialFallback,
  faqFallback,
  pillarFallback,
  processFallback,
  techStackFallback,
  engagementModelFallback,
  pageFallback,
  settingsFallback,
} from "@/server/content/static-fallback";

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

export default async function HomePage() {
  // Sequential, not Promise.all: D1's remote connection during static
  // generation only tolerates one session at a time — ten concurrent reads
  // against the same database threw SQLITE_BUSY on the real Cloudflare build.
  // This only costs build time, not request latency (these reads are cached
  // per-collection and served from the incremental cache afterward).
  const settings = await getSettingsOrFallback(settingsFallback);
  const home = await getItemOrFallback("page", "home", pageFallback.home);
  const services = await getCollectionOrFallback("service", serviceFallback);
  const pillars = await getCollectionOrFallback("pillar", pillarFallback);
  const processSteps = await getCollectionOrFallback("process", processFallback);
  const techStack = await getCollectionOrFallback("techStack", techStackFallback);
  const engagementModels = await getCollectionOrFallback(
    "engagementModel",
    engagementModelFallback,
  );
  const industries = await getCollectionOrFallback("industry", industryFallback);
  const caseStudies = await getCollectionOrFallback("caseStudy", caseStudyFallback);
  const testimonials = await getCollectionOrFallback("testimonial", testimonialFallback);
  const faqs = await getCollectionOrFallback("faq", faqFallback);

  const homeFaqs = faqs.filter((faq) => faq.placement === "home");
  const [primaryStat, secondaryStat] = [settings.stats[3], settings.stats[0]];

  const copy = (key: string) => sectionCopy(home.sections, "home", key, settings);
  const labels = resolveLabels(home.labels, "home", settings);
  const hero = resolveHero(home.hero, settings);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/",
          name: `${settings.name} — ${settings.tagline}`,
          description: home.metaDescription,
          faqs: homeFaqs,
        })}
      />
      <Hero
        settings={settings}
        hero={hero}
        headline={splitHeadline(hero.headline, hero.highlight)}
        labels={labels}
      />
      <PlatformStrip platformStrip={settings.platformStrip} copy={copy("platforms")} />
      <Showcase />
      <Pillars pillars={pillars} copy={copy("pillars")} />
      <Services services={services} copy={copy("services")} labels={labels} />
      <Capabilities steps={processSteps} copy={copy("process")} labels={labels} />
      <TechStack techStack={techStack} copy={copy("technologies")} labels={labels} />
      <EngagementModels
        engagementModels={engagementModels}
        primaryStat={primaryStat}
        secondaryStat={secondaryStat}
        copy={copy("engagement")}
        labels={labels}
      />
      <TrustBar stats={settings.stats} />
      <Industries industries={industries} copy={copy("industries")} />
      <CaseStudies caseStudies={caseStudies} copy={copy("work")} labels={labels} />
      <Testimonials testimonials={testimonials} copy={copy("testimonials")} labels={labels} />
      <Faq faqs={homeFaqs} copy={copy("faq")} />
      <FinalCta settings={settings} copy={copy("contact")} labels={labels} />
    </>
  );
}
