import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

/**
 * Leadership, grouped Operations / Delivery, each with a ringed circular
 * portrait. Names, roles, bios and photos live in `aboutPage.leadership.people`.
 */
export function AboutLeadership() {
  const l = aboutPage.leadership;
  const groups = l.groups.map((_, gi) => l.people.filter((person) => person.group === gi));

  return (
    <section id="leadership" className="relative isolate overflow-hidden py-20 lg:py-[100px]">
      <Parallax speed={0.3} className="halo absolute -left-48 top-1/3 -z-10 h-[32rem] w-[32rem]" />
      <div className="container-x">
        <ScrollReveal className="grid items-end gap-6 lg:grid-cols-[1.3fr_1fr]">
          <SectionIntro dot eyebrow={l.eyebrow} title={l.title} titleClassName="max-w-[28rem]" />
          <p data-reveal-item className="max-w-[20.5rem] text-[14px] leading-6 text-ink-600 lg:justify-self-end lg:pb-2">
            {l.lead}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-0">
          {groups.map((group, gi) =>
            group.length === 0 ? null : (
              <div
                key={l.groups[gi]}
                className={gi === 1 ? "lg:border-l lg:border-ink-200 lg:pl-10" : "lg:pr-10"}
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
                  <p className="eyebrow text-[10px]">{l.groups[gi]}</p>
                  <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
                </div>
                <ScrollReveal as="ul" variant="scale" stagger={0.14} className="grid gap-12 sm:grid-cols-2 sm:gap-6">
                  {group.map((person, pi) => (
                    <li key={`${person.role}-${pi}`} data-reveal-item className="flex flex-col items-center text-center">
                      <span className="rounded-full p-[7px] shadow-[0_0_50px_-8px_rgba(255,107,74,0.45)] ring-[1.5px] ring-brand-500/50">
                        <Image
                          src={person.photo}
                          alt={`Portrait of ${person.name}`}
                          width={400}
                          height={400}
                          sizes="200px"
                          className="h-40 w-40 rounded-full object-cover lg:h-[200px] lg:w-[200px]"
                        />
                      </span>
                      <h3 className="mt-6 text-[15px] font-bold leading-5">{person.name}</h3>
                      <p className="mt-1 text-[12px] font-semibold leading-4 text-brand-600">{person.role}</p>
                      <p className="mt-3 max-w-[16.5rem] text-[12px] leading-5 text-ink-600">{person.bio}</p>
                    </li>
                  ))}
                </ScrollReveal>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
