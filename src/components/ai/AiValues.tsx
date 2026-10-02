import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExpandPanel } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { aiPage } from "@/content/redesign";

/** Dark full-bleed panel that expands to the viewport edges, with six checkmark rows. */
export function AiValues() {
  const values = aiPage.values;
  return (
    <ExpandPanel className="bg-ink-900 py-24 text-white lg:py-28">
      <div className="container-x">
        <ScrollReveal>
          <SectionIntro dark eyebrow={values.eyebrow} title={values.title} titleClassName="max-w-3xl" />
        </ScrollReveal>
        <ScrollReveal as="ul" variant="up" stagger={0.08} className="mt-14 grid gap-x-16 md:grid-cols-2">
          {values.items.map((item) => (
            <li key={item.title} data-reveal-item className="flex gap-4 border-b border-white/10 py-6">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
              <div>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{item.body}</p>
              </div>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </ExpandPanel>
  );
}
