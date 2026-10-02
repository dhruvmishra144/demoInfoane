import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CenterCta } from "@/components/design/blocks";
import { WaBuild } from "@/components/web-applications/WaBuild";
import { WaColdFusion } from "@/components/web-applications/WaColdFusion";
import { WaHero } from "@/components/web-applications/WaHero";
import { WaProcess } from "@/components/web-applications/WaProcess";
import { WaStandards } from "@/components/web-applications/WaStandards";
import { WaStats } from "@/components/web-applications/WaStats";
import { webApplications } from "@/content/web-applications";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

const path = routes.webApplications;

export const metadata: Metadata = {
  title: webApplications.meta.title,
  description: webApplications.meta.description,
  alternates: { canonical: path },
  openGraph: {
    title: webApplications.meta.title,
    description: webApplications.meta.description,
    url: path,
    type: "website",
  },
};

/**
 * Web Applications service page (2026 redesign). A static route, so it takes
 * precedence over services/[slug]. No FAQ section, hence no FAQPage JSON-LD.
 */
export default function WebApplicationsPage() {
  const { cta } = webApplications;

  return (
    <>
      <JsonLd
        data={pageSchema({
          path,
          name: "Web Applications That Power Your Business Forward",
          description: webApplications.meta.description,
          breadcrumbs: [
            { name: "Services", path: routes.services },
            { name: "Web Applications", path },
          ],
          service: {
            title: "Web Applications",
            metaDescription: webApplications.meta.description,
            deliverables: webApplications.build.cards.map((card) => card.title),
          },
        })}
      />
      <WaHero />
      <WaBuild />
      <WaStats />
      <WaStandards />
      <WaColdFusion />
      <WaProcess />
      <CenterCta eyebrow={cta.eyebrow} title={cta.title} body={cta.body} primary={cta.primary} secondary={cta.secondary} />
    </>
  );
}
