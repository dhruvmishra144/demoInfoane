import { Intro } from "@/components/motion/Intro";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassBackdrop, Eyebrow } from "@/components/design/blocks";
import { ContactForm } from "@/components/design/ContactForm";
import { contactRedesign } from "@/content/redesign";

/** Centered hero on the glass backdrop with the form card and next-steps card overlapping it. */
export function ContactHero({ email }: { email: string }) {
  const c = contactRedesign;
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-20 lg:pb-32 lg:pt-24">
      <GlassBackdrop />
      <Intro className="container-x text-center">
        <div data-intro className="flex justify-center">
          <Eyebrow>{c.eyebrow}</Eyebrow>
        </div>
        <h1
          data-intro="lines"
          className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
        >
          {c.title}
        </h1>
        <p data-intro className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          {c.lead}
        </p>
      </Intro>

      <ScrollReveal
        variant="tilt"
        stagger={0.15}
        start="top 92%"
        className="container-x mt-14 grid max-w-6xl items-start gap-6 lg:grid-cols-2"
      >
        <div
          data-reveal-item
          className="rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-2xl shadow-ink-900/10 backdrop-blur sm:p-12"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">{c.formTitle}</h2>
          <p className="mt-3 text-base text-ink-600">{c.formLead}</p>
          <div className="mt-9">
            <ContactForm
              contactEmail={email}
              fullWidthButton
              helpPlaceholder="Describe your technical challenges or legacy platform..."
            />
          </div>
        </div>

        <div
          data-reveal-item
          className="rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-2xl shadow-ink-900/10 backdrop-blur sm:p-12"
        >
          <Eyebrow dot>What happens next</Eyebrow>
          <ol className="mt-10 space-y-9">
            {c.steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-base font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <Eyebrow dot>{step.when}</Eyebrow>
                  <h3 className="mt-1.5 text-lg font-bold leading-snug">{step.title}</h3>
                  <p className="mt-1.5 text-base text-ink-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>
    </section>
  );
}
