import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StepFocus, ZoomImage } from "@/components/motion/effects";
import { Eyebrow } from "@/components/design/blocks";
import { StepIcon, type StepIconName } from "@/components/design/StepIcon";
import { home } from "@/content/redesign";

/** One animated icon per delivery step, in order: Understand to Support & Improve. */
const stepIcons: StepIconName[] = ["scan", "plan", "build", "launch", "support"];

/**
 * "How we work": heading across the top, then three columns — a photo, the
 * approach copy, and the five numbered delivery steps (Understand through
 * Support & Improve) as cards.
 */
export function HomeApproach() {
  const approach = home.approach;

  return (
    <section id="approach" className="border-t border-ink-200/70 bg-[#f8f9fb] pb-20 pt-[92px]">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {approach.title}
          </h2>
        </ScrollReveal>

        {/* Photo and approach copy stay pinned while the steps scroll past;
            the step nearest the middle of the screen is in focus and the rail
            beside them fills as you go. */}
        <div className="mt-14 grid items-start gap-10 md:grid-cols-2 lg:grid-cols-[320px_320px_464px] lg:justify-between lg:gap-12">
          <div className="lg:sticky lg:top-32">
            <ZoomImage className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={approach.image}
                alt={approach.imageAlt}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </ZoomImage>
          </div>

          <ScrollReveal variant="blur" stagger={0.1} className="lg:sticky lg:top-32">
            <p data-reveal-item className="eyebrow">
              {approach.leadLabel}
            </p>
            <p data-reveal-item className="mt-4 text-[15px] leading-6 text-body [text-wrap:wrap]">
              {approach.lead}
            </p>
          </ScrollReveal>

          <StepFocus as="div" className="relative pl-7 md:col-span-2 lg:col-span-1">
            <span className="absolute inset-y-6 left-0 w-0.5 overflow-hidden rounded-full bg-ink-200" aria-hidden="true">
              <span data-rail-fill className="block h-full w-full origin-top rounded-full bg-brand-500" />
            </span>
            <ol className="space-y-5">
            {approach.steps.map((step, index) => (
              <li
                key={step.title}
                data-step
                className="flex gap-5 rounded-2xl border border-ink-200 bg-white px-6 py-[22px] transition-colors duration-300 hover:border-brand-200"
              >
                <span className="relative mt-0.5 inline-flex h-14 w-14 shrink-0" aria-hidden="true">
                  <span data-ping className="absolute inset-0 rounded-2xl bg-brand-500 opacity-0" />
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                    <StepIcon name={stepIcons[index]} />
                  </span>
                </span>
                <div>
                  <h3 className="text-[18px] font-bold leading-6">{step.title}</h3>
                  <p className="mt-1 text-[14px] leading-[22px] text-body">{step.body}</p>
                </div>
              </li>
            ))}
            </ol>
          </StepFocus>
        </div>
      </div>
    </section>
  );
}
