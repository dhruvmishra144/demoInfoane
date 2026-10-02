"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { jobHref } from "@/lib/routes";
import type { Job } from "@/content/jobs";
import type { careersRedesign } from "@/content/redesign";

type Copy = (typeof careersRedesign)["openingsPage"];

const PAGE_SIZE = 8;

const chevron =
  "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236e7180%22 stroke-width=%222.2%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat";

const control =
  "mt-2 block h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm text-ink-900 transition-colors duration-300 hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25";

/** Cities a job is listed in: "Kochi / Trivandrum" -> ["Kochi", "Trivandrum"]. */
const cities = (job: Job) => job.location.split("/").map((city) => city.trim());

/**
 * Search, filters and card grid for /careers/openings.
 *
 * Filtering is client-side over the checked-in job list (the page passes it in
 * as props). New cards rise in with a short stagger on first paint, after a
 * filter change and after "Load more" — cards already on screen stay put.
 */
export function OpeningsBrowser({ jobs, copy }: { jobs: Job[]; copy: Copy }) {
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const gridRef = useRef<HTMLUListElement>(null);
  const seen = useRef(new Set<string>());

  const categories = useMemo(() => Array.from(new Set(jobs.map((job) => job.category))).sort(), [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs.map((job) => job.type))).sort(), [jobs]);
  const locations = useMemo(() => Array.from(new Set(jobs.flatMap(cities))).sort(), [jobs]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (category && job.category !== category) return false;
      if (type && job.type !== type) return false;
      if (location && !cities(job).includes(location)) return false;
      if (!needle) return true;
      return [job.title, job.category, job.location, job.summary].join(" ").toLowerCase().includes(needle);
    });
  }, [jobs, query, category, type, location]);

  const shown = filtered.slice(0, visible);
  const shownKey = shown.map((job) => job.slug).join("|");

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const fresh = Array.from(grid.querySelectorAll<HTMLElement>("[data-job]")).filter(
      (card) => !seen.current.has(card.dataset.job ?? ""),
    );
    fresh.forEach((card) => seen.current.add(card.dataset.job ?? ""));
    if (!fresh.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureGsapRegistered();
    const tween = gsap.fromTo(
      fresh,
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: "expo.out",
        clearProps: "transform,opacity",
      },
    );
    return () => {
      tween.progress(1).kill();
    };
  }, [shownKey]);

  function onFilter<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setVisible(PAGE_SIZE);
    };
  }
  const setQ = onFilter(setQuery);
  const setCat = onFilter(setCategory);
  const setTyp = onFilter(setType);
  const setLoc = onFilter(setLocation);

  const f = copy.filters;
  const label = "block text-xs font-semibold uppercase tracking-[0.08em] text-ink-600";

  return (
    <div>
      <div
        role="search"
        className="grid gap-5 rounded-3xl border border-ink-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6 lg:grid-cols-4"
      >
        <div>
          <label htmlFor={`${baseId}-q`} className={label}>
            {f.search}
          </label>
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-ink-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id={`${baseId}-q`}
              type="search"
              value={query}
              onChange={(event) => setQ(event.target.value)}
              placeholder={f.searchPlaceholder}
              className={`${control} pl-11 placeholder:text-ink-400`}
            />
          </div>
        </div>

        {(
          [
            { key: "cat", text: f.category, all: f.allCategories, value: category, set: setCat, options: categories },
            { key: "type", text: f.type, all: f.allTypes, value: type, set: setTyp, options: types },
            { key: "loc", text: f.location, all: f.allLocations, value: location, set: setLoc, options: locations },
          ] as const
        ).map((select) => (
          <div key={select.key}>
            <label htmlFor={`${baseId}-${select.key}`} className={label}>
              {select.text}
            </label>
            <select
              id={`${baseId}-${select.key}`}
              value={select.value}
              onChange={(event) => select.set(event.target.value)}
              className={`${control} appearance-none pr-10 ${chevron}`}
            >
              <option value="">{select.all}</option>
              {select.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "position" : "positions"} found
      </p>

      {shown.length > 0 ? (
        <ul ref={gridRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((job) => (
            <li key={job.slug} data-job={job.slug} className="flex">
              <Link
                href={jobHref(job.slug)}
                className="group flex w-full flex-col justify-between rounded-xl border border-brand-400/80 border-l-[5px] border-l-brand-500 bg-white p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
              >
                <div>
                  <span className="inline-block rounded bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {job.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug">{job.title}</h3>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex min-w-0 items-center gap-1.5 text-ink-600">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    <span className="truncate">{job.location}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-600">
                    {copy.moreDetails}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h13M12 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 rounded-3xl border border-dashed border-ink-300 p-10 text-center text-base text-ink-600">
          {copy.empty}
        </p>
      )}

      {filtered.length > visible && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 transition-all duration-300 hover:-translate-y-px hover:ring-ink-300"
          >
            {copy.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
