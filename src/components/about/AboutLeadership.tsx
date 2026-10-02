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
    <section id="leadership" className="relative isolate overflow-hidden py-20 lg:py-28">
      <Parallax speed={0.3} className="halo absolute -left-48 top-1/3 -z-10 h-[32rem] w-[32rem]" />
      <div className="container-x">
        <ScrollReveal className="grid items-end gap-6 lg:grid-cols-[1.3fr_1fr]">
          <SectionIntro dot eyebrow={l.eyebrow} title={l.title} titleClassName="max-w-xl" />
          <p data-reveal-item className="max-w-sm text-base leading-relaxed text-ink-600 lg:justify-self-end">
            {l.lead}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-0">
          {groups.map((group, gi) =>
            group.length === 0 ? null : (
              <div
                key={l.groups[gi]}
                className={gi === 1 ? "lg:border-l lg:border-ink-200 lg:pl-10" : "lg:pr-10"}
              >
                <p className="eyebrow mb-10 text-center">{l.groups[gi]}</p>
                <ScrollReveal as="ul" variant="scale" stagger={0.14} className="grid gap-12 sm:grid-cols-2">
                  {group.map((person, pi) => (
                    <li key={`${person.role}-${pi}`} data-reveal-item className="flex flex-col items-center text-center">
                      <span className="rounded-full p-1.5 shadow-[0_0_50px_-8px_rgba(255,107,74,0.45)] ring-2 ring-brand-500/50">
                        <Image
                          src={person.photo}
                          alt={`Portrait of ${person.name}`}
                          width={160}
                          height={160}
                          sizes="144px"
                          className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
                        />
                      </span>
                      <h3 className="mt-6 text-base font-bold">{person.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-brand-600">{person.role}</p>
                      <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-600">{person.bio}</p>
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
