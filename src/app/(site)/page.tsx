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
import { site } from "@/config/site";
import {
  getCollectionOrFallback,
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
  settingsFallback,
} from "@/server/content/static-fallback";

/**
 * Homepage metadata. The title leads with the service, not the brand: nobody
 * searches for a company they have not heard of, and Google truncates around 60
 * characters — so the words that earn the click go first.
 */
export const metadata: Metadata = {
  // `absolute` bypasses the layout's "%s | Infotech" template, which would
  // otherwise append the brand name a second time.
  title: {
    absolute: `IT Consulting & Custom Software Development Company | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [
    settings,
    services,
    pillars,
    processSteps,
    techStack,
    engagementModels,
    industries,
    caseStudies,
    testimonials,
    faqs,
  ] = await Promise.all([
    getSettingsOrFallback(settingsFallback),
    getCollectionOrFallback("service", serviceFallback),
    getCollectionOrFallback("pillar", pillarFallback),
    getCollectionOrFallback("process", processFallback),
    getCollectionOrFallback("techStack", techStackFallback),
    getCollectionOrFallback("engagementModel", engagementModelFallback),
    getCollectionOrFallback("industry", industryFallback),
    getCollectionOrFallback("caseStudy", caseStudyFallback),
    getCollectionOrFallback("testimonial", testimonialFallback),
    getCollectionOrFallback("faq", faqFallback),
  ]);

  const homeFaqs = faqs.filter((faq) => faq.placement === "home");
  const [primaryStat, secondaryStat] = [settings.stats[3], settings.stats[0]];

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/",
          name: `${site.name} — ${site.tagline}`,
          description: site.description,
          faqs: homeFaqs,
        })}
      />
      <Hero settings={settings} />
      <PlatformStrip platformStrip={settings.platformStrip} />
      <Showcase />
      <Pillars pillars={pillars} />
      <Services services={services} />
      <Capabilities steps={processSteps} />
      <TechStack techStack={techStack} />
      <EngagementModels
        engagementModels={engagementModels}
        primaryStat={primaryStat}
        secondaryStat={secondaryStat}
      />
      <TrustBar stats={settings.stats} />
      <Industries industries={industries} />
      <CaseStudies caseStudies={caseStudies} />
      <Testimonials testimonials={testimonials} />
      <Faq faqs={homeFaqs} />
      <FinalCta settings={settings} />
    </>
  );
}
