"use client";

import { useState } from "react";

/**
 * Generic tab strip for long editor forms. Mirrors the tablist pattern used
 * on the public site (`src/components/sections/Capabilities.tsx`): a real
 * `role="tablist"`, arrow-key navigation, and every panel stays mounted in
 * the DOM (`hidden` rather than unmounted).
 *
 * That last part is not optional here — the editor is one native `<form>`
 * with a single submit, so a field on a tab you never clicked into must
 * still be present in `FormData` when you save.
 */

export type TabDef = { id: string; label: string; hasError?: boolean };

export function Tabs({
  tabs,
  defaultTabId,
  idPrefix,
  panels,
}: {
  tabs: TabDef[];
  defaultTabId?: string;
  idPrefix: string;
  panels: Record<string, React.ReactNode>;
}) {
  const initial = tabs.find((tab) => tab.id === defaultTabId) ?? tabs[0];
  const [active, setActive] = useState(initial?.id);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === active);
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    document.getElementById(`${idPrefix}-tab-${tabs[next].id}`)?.focus();
  }

  if (tabs.length <= 1) {
    return <div className="space-y-5">{tabs.map((tab) => panels[tab.id])}</div>;
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Editor sections"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${idPrefix}-tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              active === tab.id
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-500 hover:text-ink-800"
            }`}
          >
            {tab.label}
            {tab.hasError && (
              <span
                aria-label="This section has an error"
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-5">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`${idPrefix}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-tab-${tab.id}`}
            hidden={active !== tab.id}
            className="space-y-5"
          >
            {panels[tab.id]}
          </div>
        ))}
      </div>
    </div>
  );
}
