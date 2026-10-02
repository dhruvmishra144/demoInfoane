import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Intro } from "@/components/motion/Intro";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Float } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { IconTile } from "@/components/design/DesignIcon";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { careersRedesign } from "@/content/redesign";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { getSettingsOrFallback } from "@/server/content/with-fallback";
import { settingsFallback } from "@/server/content/static-fallback";

const copy = careersRedesign.applyPage;
const description =
  "No formal vacancy that fits? Send Infoane an open application and join our talent pipeline for engineering, QA, DevOps and delivery roles.";

export const metadata: Metadata = {
  title: "General Application",
  description,
  alternates: { canonical: routes.apply },
};

export default async function ApplyPage() {
  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.apply,
          name: "General application",
          description,
          breadcrumbs: [
            { name: "Careers", path: routes.careers },
            { name: "General application", path: routes.apply },
          ],
        })}
      />

      <section className="relative isolate overflow-hidden py-16 lg:py-24">
        <Float className="absolute left-[44%] top-24 -z-10 hidden lg:block" amount={14}>
          <div className="orb h-12 w-12 opacity-70" />
        </Float>
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Intro>
              <div data-intro>
                <Eyebrow dot>{copy.eyebrow}</Eyebrow>
              </div>
              <h1
                data-intro="lines"
                className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]"
              >
                {copy.title}
              </h1>
              <p data-intro className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600">
                {copy.body}
              </p>
            </Intro>

            <ScrollReveal className="mt-14 lg:mt-16">
              <p data-reveal-item className="inline-block border-b border-ink-300 pb-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-600">
                {copy.whyLabel}
              </p>
              <ul className="mt-8">
                {copy.why.map((item) => (
                  <li
                    key={item.title}
                    data-reveal-item
                    className="flex gap-5 border-b border-ink-200 py-6 first:pt-0 last:border-0"
                  >
                    <span className="shrink-0">
                      <IconTile name={item.icon} />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="mt-1.5 text-base leading-relaxed text-ink-600">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="scale" start="top 95%" className="lg:sticky lg:top-28">
            <ApplicationForm
              variant="general"
              contactEmail={settings.contact.email}
              title={copy.form.title}
              lead={copy.form.lead}
              expertise={copy.expertise}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
