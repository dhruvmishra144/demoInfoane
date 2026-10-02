import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Intro } from "@/components/motion/Intro";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { OpeningsBrowser } from "@/components/careers/OpeningsBrowser";
import { careersRedesign } from "@/content/redesign";
import { jobs } from "@/content/jobs";
import { pageSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

const copy = careersRedesign.openingsPage;
const description =
  "Browse current openings at Infoane across engineering, quality assurance, infrastructure, project management and talent acquisition.";

export const metadata: Metadata = {
  title: "Current Openings",
  description,
  alternates: { canonical: routes.openings },
};

/**
 * Current Openings. Cards come from src/content/jobs.ts — see the note at the
 * top of that file: most entries are copied from the design mockup and must be
 * confirmed as real before launch. No JobPosting structured data for the same
 * reason as on /careers.
 */
export default function OpeningsPage() {
  const join = copy.join;

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: routes.openings,
          name: copy.title,
          description,
          type: "CollectionPage",
          breadcrumbs: [
            { name: "Careers", path: routes.careers },
            { name: copy.title, path: routes.openings },
          ],
        })}
      />

      <section className="relative isolate overflow-hidden pb-24 pt-16 lg:pb-28 lg:pt-24">
        <Parallax speed={0.3} className="halo absolute left-1/2 top-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/2" />
        <div className="container-x">
          <Intro className="mx-auto max-w-3xl text-center">
            <div data-intro>
              <Eyebrow dot className="justify-center">
                {copy.eyebrow}
              </Eyebrow>
            </div>
            <h1
              data-intro="lines"
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              {copy.title}
            </h1>
            <p data-intro className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
              {copy.lead}
            </p>
          </Intro>

          <ScrollReveal variant="up" start="top 95%" className="mt-14">
            <OpeningsBrowser jobs={jobs} copy={copy} />
          </ScrollReveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-night py-20 lg:py-28">
        <div className="accent-glow absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <ZoomImage className="relative aspect-[7/5] overflow-hidden rounded-3xl">
            <Image
              src={join.image}
              alt={join.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </ZoomImage>
          <ScrollReveal stagger={0.12}>
            <div data-reveal-item>
              <Eyebrow dot>{join.eyebrow}</Eyebrow>
            </div>
            <h2 data-split className="mt-5 text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem]">
              {join.title}
            </h2>
            <p data-reveal-item className="mt-6 max-w-xl text-base leading-relaxed text-ink-300">
              {join.body}
            </p>
            <div data-reveal-item className="mt-9">
              <Button href={join.cta.href} variant="coral">
                {join.cta.label}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
