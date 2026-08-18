import { Section } from "../ui/Section";
import { process } from "@/content/home";

export function Process() {
  return (
    <Section
      id="process"
      tone="muted"
      eyebrow="How we work"
      title="A delivery process you can hold us to"
      lead="Most failed projects fail in the first month, on assumptions nobody wrote down. This is the sequence we use to make sure that does not happen."
    >
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {process.map((item) => (
          <li
            key={item.step}
            className="relative rounded-3xl border border-ink-200 bg-white p-7"
          >
            <span
              className="text-sm font-bold text-brand-600"
              aria-hidden="true"
            >
              {item.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
