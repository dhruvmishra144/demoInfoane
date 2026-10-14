import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow, GlassBackdrop } from "@/components/design/blocks";
import { ContactForm } from "@/components/design/ContactForm";
import { IndustryTabs } from "./IndustryTabs";
import { home, officeLine } from "@/content/redesign";

/**
 * Industries: a segmented tab bar over a two-panel card (gradient tagline
 * panel, then headline, copy and points), with the CTA beneath.
 */
export function HomeIndustries() {
  const industries = home.industries;
  return (
    <section id="industries" className="py-20">
      <div className="container-x">
        <ScrollReveal>
          <div data-reveal-item>
            <Eyebrow>{industries.eyebrow}</Eyebrow>
          </div>
          <h2 data-split className="mt-[17px] max-w-[760px] text-[36px] font-bold leading-[40px] [text-wrap:wrap]">
            {industries.title}
          </h2>
          <p data-reveal-item className="mt-[17px] max-w-[820px] text-[16px] leading-[26px] text-body">
            {industries.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale" className="mt-10">
          <IndustryTabs items={industries.items} activeLabel={industries.activeLabel} />
        </ScrollReveal>

        <div className="mt-10">
          <Button href={industries.cta.href} variant="outline" withChip className="!py-3 !text-[14px] !leading-5 !ring-ink-900">
            {industries.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * The closing form (500px) beside the three-step "what happens next" card
 * (652px), on the glass backdrop.
 */
export function HomeContact({ email }: { email: string }) {
  const contact = home.contact;
  return (
    <section id="contact" className="relative isolate overflow-hidden pb-[82px] pt-20">
      <GlassBackdrop />

      <ScrollReveal
        variant="up"
        stagger={0.15}
        className="container-x grid items-start gap-8 lg:grid-cols-[500px_652px] lg:justify-between"
      >
        <div data-reveal-item className="rounded-[32px] border border-ink-200/70 bg-white p-8 shadow-xl shadow-ink-900/5 sm:p-14">
          <h2 className="text-[32px] font-bold leading-[36px] [text-wrap:balance]">{contact.title}</h2>
          <p className="mt-3 text-[15px] leading-6 text-body">{contact.lead}</p>
          <div className="mt-8">
            <ContactForm contactEmail={email} />
          </div>
        </div>

        <div data-reveal-item className="rounded-[32px] border border-ink-200/70 bg-[#f9fafb] p-8 shadow-xl shadow-ink-900/5 sm:px-12 sm:pb-14 sm:pt-14">
          <p className="eyebrow">{contact.nextLabel}</p>
          <ol className="mt-8 space-y-[30px]">
            {contact.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[13px] font-bold uppercase leading-5 tracking-[0.14em] text-brand-500">{step.when}</p>
                  <h3 className="text-[16.6px] font-bold leading-6">{step.title}</h3>
                  <p className="mt-0.5 text-[14px] leading-[22px] text-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-[31px] border-t border-ink-200 pt-6 text-[13px] leading-5">
            <a href={`mailto:${email}`} className="font-medium text-ink-800 hover:text-brand-600">
              {email}
            </a>
            <p className="mt-2 text-ink-400">{officeLine}</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
