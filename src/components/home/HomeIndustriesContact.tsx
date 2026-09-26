import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Float, Parallax } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { ContactForm } from "@/components/design/ContactForm";
import { IndustryTabs } from "./IndustryTabs";
import { home, officeLine } from "@/content/redesign";

export function HomeIndustries() {
  const industries = home.industries;
  return (
    <section id="industries" className="py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro eyebrow={industries.eyebrow} title={industries.title} lead={industries.lead} titleClassName="max-w-4xl" />
        </ScrollReveal>
        <ScrollReveal variant="scale" className="mt-12">
          <IndustryTabs items={industries.items} activeLabel={industries.activeLabel} />
        </ScrollReveal>
      </div>
    </section>
  );
}

/** The closing form plus the three-step "what happens next" card. */
export function HomeContact({ email }: { email: string }) {
  const contact = home.contact;
  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 lg:py-28">
      <div className="wash absolute inset-0 -z-20" aria-hidden="true" />
      <Parallax speed={-0.35} className="absolute -left-32 top-1/3 -z-10 h-[28rem] w-[28rem]">
        <div className="h-full w-full rounded-full border-[8px] border-white/60 bg-gradient-to-br from-[#c9c4ff]/50 to-[#ffd1c4]/40" />
      </Parallax>
      <Float className="absolute right-[30%] top-6 -z-10" amount={14}>
        <div className="orb h-14 w-14 opacity-80" />
      </Float>

      <ScrollReveal variant="up" stagger={0.15} className="container-x grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div data-reveal-item className="rounded-[2rem] border border-ink-200/70 bg-white p-8 shadow-xl shadow-ink-900/5 sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">{contact.title}</h2>
          <p className="mt-3 text-base text-ink-600">{contact.lead}</p>
          <div className="mt-10">
            <ContactForm contactEmail={email} />
          </div>
        </div>

        <div data-reveal-item className="rounded-[2rem] border border-ink-200/70 bg-ink-50/95 p-8 shadow-xl shadow-ink-900/5 backdrop-blur sm:p-12">
          <p className="eyebrow">{contact.nextLabel}</p>
          <ol className="mt-10 space-y-10">
            {contact.steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-base font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="eyebrow">{step.when}</p>
                  <h3 className="mt-1.5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-base text-ink-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 border-t border-ink-200 pt-8 text-sm">
            <a href={`mailto:${email}`} className="font-medium text-ink-800 hover:text-brand-600">
              {email}
            </a>
            <p className="mt-2 text-ink-500">{officeLine}</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
