"use client";

import { useState } from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

type Row = { key: string; value: string };

function makeRow(value = ""): Row {
  return { key: crypto.randomUUID(), value };
}

function ReorderButtons({
  index,
  count,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  index: number;
  count: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex shrink-0 gap-1">
      <button
        type="button"
        disabled={index === 0}
        onClick={onMoveUp}
        aria-label="Move up"
        className="rounded-lg px-1.5 py-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700 disabled:opacity-30"
      >
        ↑
      </button>
      <button
        type="button"
        disabled={index === count - 1}
        onClick={onMoveDown}
        aria-label="Move down"
        className="rounded-lg px-1.5 py-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700 disabled:opacity-30"
      >
        ↓
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove"
        className="rounded-lg px-1.5 py-1 text-ink-400 hover:bg-red-50 hover:text-red-600"
      >
        ✕
      </button>
    </div>
  );
}

function swap<T>(list: T[], a: number, b: number): T[] {
  const next = [...list];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

/**
 * A dynamic list of plain strings — `bullets`, `includes`, `credentials`, etc.
 *
 * Field names are `${name}[${index}]`, matching what the server-side form
 * parser (Milestone B) reads off `FormData.getAll` for that prefix. Only the
 * row count/order is client state — each input stays uncontrolled, consistent
 * with the rest of this codebase's forms.
 */
export function RepeatableStringList({
  name,
  label,
  initialValues,
  multiline = false,
  max,
}: {
  name: string;
  label: string;
  initialValues: string[];
  multiline?: boolean;
  max?: number;
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    initialValues.length > 0 ? initialValues.map(makeRow) : [makeRow()],
  );
  const FieldInput = multiline ? Textarea : Input;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="block text-sm font-medium text-ink-700">{label}</span>
        {(!max || rows.length < max) && (
          <button
            type="button"
            onClick={() => setRows((r) => [...r, makeRow()])}
            className="text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            + Add
          </button>
        )}
      </div>
      <div className="mt-2 space-y-2.5">
        {rows.map((row, index) => (
          <div key={row.key} className="flex items-start gap-2">
            <div className="flex-1">
              <FieldInput
                name={`${name}[${index}]`}
                defaultValue={row.value}
                {...(multiline ? { rows: 2 } : {})}
              />
            </div>
            <div className="pt-2">
              <ReorderButtons
                index={index}
                count={rows.length}
                onMoveUp={() => setRows((r) => (index === 0 ? r : swap(r, index - 1, index)))}
                onMoveDown={() =>
                  setRows((r) => (index === r.length - 1 ? r : swap(r, index, index + 1)))
                }
                onRemove={() =>
                  setRows((r) => (r.length > 1 ? r.filter((x) => x.key !== row.key) : r))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * A dynamic list of object rows — `sections`, `faqs`, `milestones`, etc.
 *
 * The caller supplies `renderRow`, which receives a `fieldName` helper that
 * builds `${name}[${index}][field]` input names, plus the row's current
 * values (only used to set `defaultValue`s — still uncontrolled inputs).
 */
export function RepeatableGroupList<T extends Record<string, unknown>>({
  name,
  label,
  initialValues,
  emptyRow,
  renderRow,
  max,
}: {
  name: string;
  label: string;
  initialValues: T[];
  emptyRow: T;
  renderRow: (fieldName: (field: keyof T & string) => string, row: T) => React.ReactNode;
  max?: number;
}) {
  const [rows, setRows] = useState<{ key: string; value: T }[]>(() =>
    (initialValues.length > 0 ? initialValues : [emptyRow]).map((value) => ({
      key: crypto.randomUUID(),
      value,
    })),
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="block text-sm font-medium text-ink-700">{label}</span>
        {(!max || rows.length < max) && (
          <button
            type="button"
            onClick={() => setRows((r) => [...r, { key: crypto.randomUUID(), value: emptyRow }])}
            className="text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            + Add
          </button>
        )}
      </div>
      <div className="mt-2 space-y-4">
        {rows.map((row, index) => (
          <div key={row.key} className="rounded-xl border border-ink-100 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                {renderRow((field) => `${name}[${index}][${String(field)}]`, row.value)}
              </div>
              <ReorderButtons
                index={index}
                count={rows.length}
                onMoveUp={() => setRows((r) => (index === 0 ? r : swap(r, index - 1, index)))}
                onMoveDown={() =>
                  setRows((r) => (index === r.length - 1 ? r : swap(r, index, index + 1)))
                }
                onRemove={() =>
                  setRows((r) => (r.length > 1 ? r.filter((x) => x.key !== row.key) : r))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
