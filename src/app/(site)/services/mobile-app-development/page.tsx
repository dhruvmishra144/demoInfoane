import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CenterCta } from "@/components/design/blocks";
import { MobileHero } from "@/components/mobile-apps/MobileHero";
import {
  ServiceApproach,
  ServiceBenefits,
  ServiceCapabilities,
  ServiceCards,
  ServiceFaq,
  ServiceIntro,
  ServiceRelated,
  ServiceTechnology,
  ServiceWhy,
} from "@/components/services/ServiceSections";
import { mobileApps } from "@/content/mobile-apps";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

const path = routes.mobileApps;

export const metadata: Metadata = {
  title: { absolute: mobileApps.meta.title },
  description: mobileApps.meta.description,
  alternates: { canonical: path },
  openGraph: {
    title: mobileApps.meta.title,
    description: mobileApps.meta.description,
    url: path,
    type: "website",
  },
};

/**
 * Mobile App Development service page. A static route, so it takes precedence
 * over services/[slug]. The FAQ is on the page, so the FAQPage structured data
 * is emitted from the same list that renders it.
 */
export default function MobileAppDevelopmentPage() {
  const m = mobileApps;

  return (
    <>
      <JsonLd
        data={pageSchema({
          path,
          name: m.hero.headline,
          description: m.meta.description,
          breadcrumbs: [
            { name: "Services", path: routes.services },
            { name: "Mobile App Development", path },
          ],
          faqs: [...m.faq.items],
          service: {
            title: "Mobile App Development",
            metaDescription: m.meta.description,
            deliverables: m.services.items.map((item) => item.title),
          },
        })}
      />
      <MobileHero />
      <ServiceIntro {...m.intro} />
      <ServiceCards {...m.services} />
      <ServiceCapabilities {...m.capabilities} />
      <ServiceTechnology {...m.technology} />
      <ServiceWhy {...m.why} />
      <ServiceBenefits {...m.benefits} />
      <ServiceApproach {...m.approach} />
      <ServiceFaq {...m.faq} />
      <ServiceRelated {...m.related} />
      <CenterCta plain {...m.cta} />
    </>
  );
}
