import { Reveal } from "../ui/Reveal";
import { site } from "@/config/site";

/** Company facts, in a contained card so the page edges stay clean. */
export function TrustBar() {
  return (
    <section aria-label="Company facts" className="bg-white pb-8">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 gap-6 rounded-4xl border border-ink-200 bg-ink-50 p-8 lg:grid-cols-4 lg:p-10">
            {site.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
