import { GlassBackdrop, SectionIntro } from "@/components/design/blocks";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { webApplications } from "@/content/web-applications";

/** "Our process": five step cards on lavender glass, swinging up in turn. */
export function WaProcess() {
  const process = webApplications.process;

  return (
    <section id="process" className="relative isolate overflow-hidden py-24 lg:py-32">
      <GlassBackdrop />
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dot eyebrow={process.eyebrow} title={process.title} lead={process.lead} titleClassName="max-w-4xl" />
        </ScrollReveal>

        <ScrollReveal
          as="ol"
          variant="tilt"
          stagger={0.12}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {process.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal-item
              className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-bold text-ink-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{step.body}</p>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
