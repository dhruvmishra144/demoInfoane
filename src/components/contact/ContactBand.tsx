import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax } from "@/components/motion/effects";
import { contactRedesign } from "@/content/redesign";

/** Closing statement band with a soft peach halo drifting at the right edge. */
export function ContactBand() {
  const band = contactRedesign.band;
  return (
    <section className="relative isolate overflow-hidden border-t border-ink-200/70 py-24 lg:py-32">
      <Parallax speed={0.25} className="absolute -right-40 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2">
        <div className="h-full w-full rounded-full bg-[radial-gradient(closest-side,#ffe3da,#fff0ea_60%,transparent)] opacity-80" />
      </Parallax>
      <ScrollReveal className="container-x">
        <h2 data-split className="max-w-3xl text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
          {band.title}
        </h2>
        <p data-reveal-item className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-600">
          {band.body}
        </p>
      </ScrollReveal>
    </section>
  );
}
