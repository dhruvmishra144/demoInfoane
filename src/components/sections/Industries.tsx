import Link from "next/link";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { icons } from "../ui/Icons";
import { industries } from "@/content/home";
import { routes } from "@/lib/routes";
import { industriesPage } from "@/content/pages";

export function Industries() {
  return (
    <Section
      id="industries"
      align="center"
      eyebrow="Industries"
      title="Domain knowledge, not just engineering"
      lead="Regulated industries do not need developers who learn the domain on your budget. These are the sectors we have shipped in repeatedly."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => {
          // Deep-link to the matching section on the industries page.
          const anchor = industriesPage.detail[index]?.slugId;
          return (
            <Reveal as="li" key={industry.name} delay={(index % 3) * 80}>
              <Link
                href={anchor ? `${routes.industries}#${anchor}` : routes.industries}
                className="group flex h-full items-start gap-4 rounded-3xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-950/8"
              >
                <span
                  className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"
                  aria-hidden="true"
                >
                  <icons.shield className="h-4 w-4" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 text-base font-semibold text-ink-900">
                    {industry.name}
                    <icons.arrow className="h-3.5 w-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-sm text-ink-500">
                    {industry.note}
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
