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
export function SiteNav({ items }: { items: NavItem[] }) {
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
      <div ref={navRef} className="hidden items-center gap-2 lg:flex">
        <nav aria-label="Primary" onMouseLeave={closeWithDelay}>
          <ul className="flex items-center">
            {items.map((item) => {
              const active = sectionActive(item);

              if (!item.columns?.length) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onMouseEnter={closeWithDelay}
                      className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        active
                          ? "text-brand-700"
                          : "text-ink-600 hover:bg-ink-50 hover:text-brand-700"
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
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active || open
                        ? "text-brand-700"
                        : "text-ink-600 hover:bg-ink-50 hover:text-brand-700"
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* The panel is positioned against the header's container, so
                      it spans the container width rather than the pill. */}
                  <div
                    id={panelId}
                    hidden={!open}
                    className="absolute inset-x-0 top-full z-40 pt-3"
                  >
                    <div
                      className="origin-top rounded-4xl border border-ink-200 bg-white p-6 shadow-2xl shadow-brand-950/10 transition-all duration-300"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "none" : "translateY(-0.5rem) scale(0.99)",
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

        <Link
          href={routes.contact}
          className="group ml-2 inline-flex items-center gap-2 rounded-full bg-brand-950 py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-900"
        >
          Contact us
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
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
                            <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
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
            Contact us
          </Link>
        </div>
      )}
    </>
  );
}
