"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routes, type NavItem } from "@/lib/routes";

/**
 * Primary navigation: a desktop mega menu plus the mobile drawer. The only
 * client component in the tree — every page section renders on the server.
 *
 * Accessibility behaviour worth keeping if you restyle this:
 *  - Each mega trigger is a real <button> with aria-expanded/aria-controls, so it
 *    is operable by keyboard and announced correctly. Hover opens the panel as a
 *    convenience for mouse users; hover is never the only way in.
 *  - A short close delay on mouse-leave means the diagonal travel from trigger to
 *    panel does not dismiss it.
 *  - Escape closes and returns focus to the trigger; a click outside closes.
 *  - The current page carries aria-current="page", not just a colour.
 */
export function SiteNav({ items, ctaLabel }: { items: NavItem[]; ctaLabel: string }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    function onPointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [openMenu]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (openMenu) {
        triggerRefs.current[openMenu]?.focus();
        setOpenMenu(null);
      }
      setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu]);

  // Stop the page behind the mobile drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLLIElement>(null);
  // `slide` is false when the pill appears from hidden, so it fades in on the
  // hovered link instead of sweeping across from wherever it last was.
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean; slide: boolean }>({
    left: 0,
    width: 0,
    visible: false,
    slide: false,
  });

  function movePill(target: HTMLElement) {
    const base = pillRef.current?.offsetParent;
    if (!base) return;
    const a = target.getBoundingClientRect();
    const b = base.getBoundingClientRect();
    setPill((prev) => ({ left: a.left - b.left, width: a.width, visible: true, slide: prev.visible }));
  }

  /** Back to the current section's link, or away if the page isn't in the bar. */
  function restPill() {
    const active = listRef.current?.querySelector<HTMLElement>("[data-nav-active]");
    if (active) movePill(active);
    else setPill((prev) => ({ ...prev, visible: false, slide: false }));
  }

  // Re-rest on navigation, and when fonts load or the window resizes (both
  // change link widths).
  useEffect(() => {
    restPill();
    const onResize = () => restPill();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function openWithHover(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function closeWithDelay() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  function isActive(href: string) {
    if (href === routes.home) return pathname === routes.home;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function sectionActive(item: NavItem) {
    if (isActive(item.href)) return true;
    return (item.columns ?? []).some((column) =>
      column.links.some((link) => isActive(link.href)),
    );
  }

  return (
    <>
      {/* ------------------------------------------------------- desktop nav */}
      <div ref={navRef} className="hidden flex-1 items-center justify-between gap-6 lg:flex">
        <nav
          aria-label="Primary"
          onMouseLeave={() => {
            closeWithDelay();
            restPill();
          }}
          className="flex flex-1 justify-center"
        >
          <ul
            ref={listRef}
            onMouseOver={(event) => {
              const target = (event.target as HTMLElement).closest<HTMLElement>("[data-nav-item]");
              if (target) movePill(target);
            }}
            onFocus={(event) => {
              const target = (event.target as HTMLElement).closest<HTMLElement>("[data-nav-item]");
              if (target) movePill(target);
            }}
            className="flex items-center gap-1"
          >
            {/* The sliding pill: glides to whichever link is hovered or
                focused, and rests behind the current section otherwise.
                Positioned against the header container (the list is left
                static on purpose — a positioned list would also become the
                mega panels' containing block and shrink them to its width). */}
            <li
              ref={pillRef}
              aria-hidden="true"
              className={`pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-ink-900/[0.055] ring-1 ring-inset ring-ink-900/[0.04] duration-500 ease-[var(--ease-out-expo)] ${
                pill.slide ? "transition-[left,width,opacity]" : "transition-opacity"
              }`}
              style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
            />
            {items.map((item) => {
              const active = sectionActive(item);

              if (!item.columns?.length) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onMouseEnter={closeWithDelay}
                      data-nav-item
                      data-nav-active={active || undefined}
                      className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        active ? "text-brand-600" : "text-ink-800 hover:text-ink-950"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const open = openMenu === item.label;
              const panelId = `mega-${item.label.toLowerCase()}`;

              return (
                <li key={item.label} onMouseEnter={() => openWithHover(item.label)}>
                  <button
                    type="button"
                    ref={(node) => {
                      triggerRefs.current[item.label] = node;
                    }}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => (open ? setOpenMenu(null) : setOpenMenu(item.label))}
                    data-nav-item
                    data-nav-active={active || undefined}
                    className={`relative z-10 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      active || open ? "text-brand-600" : "text-ink-800 hover:text-ink-950"
                    }`}
                  >
                    {item.label}
                  </button>

                  {/* The panel is positioned against the header's container, so
                      it spans the container width rather than the pill. */}
                  {/* `inert` + visibility rather than `hidden`, so the panel can
                      transition out as well as in while staying unreachable by
                      keyboard and screen readers when closed. */}
                  <div
                    id={panelId}
                    inert={!open}
                    className={`absolute inset-x-0 top-full z-40 pt-2 transition-[visibility] duration-300 ${
                      open ? "visible" : "invisible"
                    }`}
                  >
                    <div
                      className="origin-top rounded-3xl border border-ink-200 bg-white/95 p-6 shadow-2xl shadow-ink-900/10 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-out-expo)]"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "none" : "translateY(-0.75rem) scale(0.98)",
                        filter: open ? "none" : "blur(4px)",
                      }}
                    >
                      <div
                        className={`grid gap-6 ${
                          item.feature ? "lg:grid-cols-[1fr_1fr_20rem]" : "lg:grid-cols-2"
                        }`}
                      >
                        {item.columns.map((column) => (
                          <div key={column.heading}>
                            <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                              {column.heading}
                            </p>
                            <ul className="mt-3 space-y-0.5">
                              {column.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    aria-current={isActive(link.href) ? "page" : undefined}
                                    className="group/link block rounded-2xl px-3 py-2.5 transition-colors duration-200 hover:bg-brand-50"
                                  >
                                    <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover/link:text-brand-700">
                                      {link.label}
                                      <svg
                                        viewBox="0 0 24 24"
                                        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        aria-hidden="true"
                                      >
                                        <path d="M5 12h13M12 6l6 6-6 6" />
                                      </svg>
                                    </span>
                                    {link.description && (
                                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">
                                        {link.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {item.feature && (
                          <div className="relative isolate overflow-hidden rounded-3xl bg-brand-950 p-6">
                            <div
                              className="mesh absolute inset-0 -z-10 opacity-60"
                              aria-hidden="true"
                            />
                            <p className="text-base font-semibold text-white">
                              {item.feature.heading}
                            </p>
                            <p className="mt-2.5 text-xs leading-relaxed text-ink-300">
                              {item.feature.body}
                            </p>
                            <Link
                              href={item.feature.href}
                              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-900 transition-transform duration-200 hover:translate-x-0.5"
                            >
                              {item.feature.cta}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`${routes.home}#approach`}
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 py-2.5 pl-6 pr-5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(20,21,31,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-px hover:bg-ink-800"
          >
            See how we work
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h13M12 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href={routes.contact}
            aria-current={isActive(routes.contact) ? "page" : undefined}
            className="inline-flex items-center rounded-full bg-white/70 px-6 py-2.5 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 backdrop-blur transition-all duration-300 hover:-translate-y-px hover:bg-white hover:ring-ink-300"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* ---------------------------------------------------------- mobile */}
      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-800 ring-1 ring-ink-200 transition hover:bg-ink-50 lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-4xl border border-ink-200 bg-white p-4 shadow-2xl shadow-brand-950/10 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="divide-y divide-ink-100">
              {items.map((item) => {
                if (!item.columns?.length) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`block px-2 py-3.5 text-base font-medium ${
                          isActive(item.href) ? "text-brand-700" : "text-ink-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const expanded = mobileSection === item.label;
                const panelId = `mobile-${item.label.toLowerCase()}`;

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMobileSection(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      className={`flex w-full items-center justify-between px-2 py-3.5 text-base font-medium ${
                        sectionActive(item) ? "text-brand-700" : "text-ink-800"
                      }`}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 text-brand-600 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {expanded && (
                      <div id={panelId} className="pb-3">
                        {item.columns.map((column) => (
                          <div key={column.heading} className="mt-1">
                            <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                              {column.heading}
                            </p>
                            <ul>
                              {column.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    className="block border-l-2 border-ink-100 py-2.5 pl-4 text-sm text-ink-600"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href={routes.contact}
            className="mt-4 block rounded-full bg-brand-950 px-6 py-3.5 text-center text-sm font-semibold text-white"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </>
  );
}
