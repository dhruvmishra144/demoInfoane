"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { careersRedesign } from "@/content/redesign";

type Voice = (typeof careersRedesign)["voices"]["items"][number];

/**
 * Team-voices carousel: a native scroll-snap track (so touch swiping, trackpads
 * and keyboard scrolling all just work) with prev/next buttons and mouse
 * drag-to-scroll on top. Avatars are neutral placeholders until real, consented
 * photos exist — no people are invented.
 */
export function VoicesCarousel({ items }: { items: Voice[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const [edge, setEdge] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  function step(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const amount = (card?.offsetWidth ?? 320) + 24;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * amount, behavior: reduce ? "auto" : "smooth" });
  }

  function onPointerDown(event: React.PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: event.clientX, startLeft: el.scrollLeft, moved: false };
  }
  function onPointerMove(event: React.PointerEvent<HTMLUListElement>) {
    const state = drag.current;
    const el = trackRef.current;
    if (!state.down || !el) return;
    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) > 5) {
      state.moved = true;
      setDragging(true);
    }
    if (state.moved) el.scrollLeft = state.startLeft - dx;
  }
  function endDrag() {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
  }

  const btn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        tabIndex={0}
        aria-label="Team voices"
        className={`-mx-1 flex gap-6 overflow-x-auto px-1 pb-8 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"
        }`}
      >
        {items.map((voice, index) => (
          <li
            key={index}
            className="w-[85%] shrink-0 snap-start sm:w-[22rem] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <figure className="flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-6 shadow-lg shadow-ink-900/5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M9.5 6C6.5 6.8 4.5 9.3 4.5 12.8V18h5.3v-5.3H7.4c.1-2 1.1-3.3 3-3.8L9.5 6Zm9 0c-3 .8-5 3.3-5 6.8V18h5.3v-5.3h-2.4c.1-2 1.1-3.3 3-3.8L18.5 6Z" />
                </svg>
              </span>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink-800">
                {voice.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-200 pt-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-400" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8.5" r="3.5" />
                    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">{voice.name}</span>
                  <span className="block text-sm text-ink-500">{voice.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={edge.start}
          aria-label="Previous voices"
          className={`${btn} bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-ink-300`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={edge.end}
          aria-label="Next voices"
          className={`${btn} bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
