import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CenterCta } from "@/components/design/blocks";
import { AiHero } from "@/components/ai/AiHero";
import { AiFramework } from "@/components/ai/AiFramework";
import { AiIsolation } from "@/components/ai/AiIsolation";
import { AiValues } from "@/components/ai/AiValues";
import { aiPage } from "@/content/redesign";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: aiPage.metaTitle,
  description: aiPage.metaDescription,
  alternates: { canonical: routes.ai },
};

export default function AiPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.ai,
          name: aiPage.hero.title,
          description: aiPage.metaDescription,
          breadcrumbs: [{ name: "AI & Safety", path: routes.ai }],
        })}
      />
      <AiHero />
      <AiFramework />
      <AiIsolation />
      <AiValues />
      <CenterCta {...aiPage.cta} />
    </>
  );
}
