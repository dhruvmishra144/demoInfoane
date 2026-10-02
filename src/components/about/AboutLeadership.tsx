import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax } from "@/components/motion/effects";
import { SectionIntro } from "@/components/design/blocks";
import { aboutPage } from "@/content/redesign";

type Person = { name: string; role: string; bio: string; linkedin: string };

function initials(name: string) {
  const letters = name
    .replace(/[[\]]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase());
  return (letters[0] ?? "") + (letters.length > 1 ? letters[letters.length - 1] : "");
}

/**
 * Leadership, grouped Operations / Delivery. The CMS has no photo or group
 * field, so every person gets a ringed gradient initials avatar and people are
 * split across the two groups in CMS order.
 */
export function AboutLeadership({ people }: { people: Person[] }) {
  const l = aboutPage.leadership;
  const half = Math.ceil(people.length / 2);
  const groups = [people.slice(0, half), people.slice(half)];

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
                        <span
                          className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-[#8f86f5] text-3xl font-bold text-white sm:h-36 sm:w-36"
                          aria-hidden="true"
                        >
                          {initials(person.name)}
                        </span>
                      </span>
                      <h3 className="mt-6 text-base font-bold">{person.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-brand-600">{person.role}</p>
                      <p className="mt-3 max-w-[16rem] text-xs leading-relaxed text-ink-600">{person.bio}</p>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-xs font-semibold text-brand-700 hover:text-brand-800"
                      >
                        LinkedIn profile
                      </a>
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
