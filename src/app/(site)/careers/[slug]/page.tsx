import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Intro } from "@/components/motion/Intro";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/design/blocks";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { careersRedesign } from "@/content/redesign";
import { findJob, jobs, type Job } from "@/content/jobs";
import { pageSchema } from "@/lib/schema";
import { jobHref, routes } from "@/lib/routes";
import { getSettingsOrFallback } from "@/server/content/with-fallback";
import { settingsFallback } from "@/server/content/static-fallback";

const copy = careersRedesign.jobPage;

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

type Params = { params: Promise<{ slug: string }> };

function metaDescription(job: Job) {
  return `${job.title} (${job.type}, ${job.location}) at Infoane. ${job.summary}`;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = findJob(slug);
  if (!job) return {};
  return {
    title: `${job.title} — Careers`,
    description: metaDescription(job),
    alternates: { canonical: jobHref(job.slug) },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-base leading-relaxed text-ink-700">
          <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * No JobPosting structured data — see the note on /careers. Every listing here
 * must be confirmed as a real open role first (src/content/jobs.ts).
 */
export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = findJob(slug);
  if (!job) notFound();

  const settings = await getSettingsOrFallback(settingsFallback);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: jobHref(job.slug),
          name: job.title,
          description: metaDescription(job),
          breadcrumbs: [
            { name: "Careers", path: routes.careers },
            { name: "Current Openings", path: routes.openings },
            { name: job.title, path: jobHref(job.slug) },
          ],
        })}
      />

      <section className="py-14 lg:py-20">
        <div className="container-x">
          <Intro>
            <Link
              data-intro
              href={routes.openings}
              className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-brand-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H6M12 6l-6 6 6 6" />
              </svg>
              {copy.back}
            </Link>
            <div data-intro>
              <Eyebrow dot>{copy.eyebrow}</Eyebrow>
            </div>
            <h1
              data-intro="lines"
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl"
            >
              {job.title}
            </h1>
            <div data-intro className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-md bg-brand-50 px-3 py-1 font-semibold text-brand-600">
                {job.location}
              </span>
              <span className="text-ink-600">{job.type}</span>
              <span className="text-ink-300" aria-hidden="true">
                ·
              </span>
              <span className="text-ink-600">{job.category}</span>
            </div>
          </Intro>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
            <div className="max-w-3xl">
              <ScrollReveal stagger={0.1} start="top 95%" className="space-y-5">
                {job.description.map((paragraph) => (
                  <p key={paragraph} data-reveal-item className="text-lg leading-relaxed text-ink-700">
                    {paragraph}
                  </p>
                ))}
              </ScrollReveal>

              <ScrollReveal className="mt-14">
                <h2 data-split className="text-2xl font-bold">
                  {copy.responsibilities}
                </h2>
                <div data-reveal-item>
                  <BulletList items={job.responsibilities} />
                </div>
              </ScrollReveal>

              <ScrollReveal className="mt-14">
                <h2 data-split className="text-2xl font-bold">
                  {copy.skills}
                </h2>
                <div data-reveal-item>
                  <BulletList items={job.skills} />
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="scale" start="top 95%" className="lg:sticky lg:top-28">
              <ApplicationForm
                variant="job"
                contactEmail={settings.contact.email}
                jobTitle={job.title}
                title={copy.formTitle}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
