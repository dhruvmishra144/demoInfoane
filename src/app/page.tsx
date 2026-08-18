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
import { faqs } from "@/content/home";
import { site } from "@/config/site";

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

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/",
          name: `${site.name} — ${site.tagline}`,
          description: site.description,
          faqs,
        })}
      />
      <Hero />
      <PlatformStrip />
      <Showcase />
      <Pillars />
      <Services />
      <Capabilities />
      <TechStack />
      <EngagementModels />
      <TrustBar />
      <Industries />
      <CaseStudies />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
