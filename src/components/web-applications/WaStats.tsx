import { CountUp } from "@/components/motion/effects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { webApplications } from "@/content/web-applications";

/** Dark numbers band; each figure counts up as it arrives. */
export function WaStats() {
  return (
    <section className="bg-night py-16 lg:py-20" aria-label="Web application results">
      <ScrollReveal as="ul" variant="up" stagger={0.12} className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {webApplications.stats.map((stat) => (
          <li key={stat.label} data-reveal-item>
            <CountUp value={stat.value} className="block text-5xl font-bold tracking-tight text-brand-500 lg:text-6xl" />
            <p className="mt-3 text-sm text-ink-400">{stat.label}</p>
          </li>
        ))}
      </ScrollReveal>
    </section>
  );
}
