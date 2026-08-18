"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Textarea } from "./Textarea";

export type ConfirmDialogHandle = { open: () => void; close: () => void };

/**
 * Native `<dialog>` — no portal library needed, the browser already handles
 * focus trapping, Escape-to-close and the backdrop.
 *
 * `noteLabel` turns this into a "reject with a reason" prompt: set it and
 * `onConfirm` receives the typed note instead of `undefined`.
 */
export const ConfirmDialog = forwardRef<
  ConfirmDialogHandle,
  {
    title: string;
    description?: string;
    confirmLabel?: string;
    destructive?: boolean;
    noteLabel?: string;
    onConfirm: (note?: string) => void;
  }
>(function ConfirmDialog(
  { title, description, confirmLabel = "Confirm", destructive = false, noteLabel, onConfirm },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [note, setNote] = useState("");

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setNote("")}
      className="w-full max-w-sm rounded-2xl border border-ink-200 p-0 backdrop:bg-ink-950/40"
    >
      <div className="p-6">
        <h2 className="text-base font-semibold text-ink-900">{title}</h2>
        {description && <p className="mt-2 text-sm text-ink-500">{description}</p>}

        {noteLabel && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-ink-700">{noteLabel}</label>
            <div className="mt-1.5">
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(noteLabel ? note : undefined);
              dialogRef.current?.close();
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${
              destructive ? "bg-red-600 hover:bg-red-700" : "bg-brand-950 hover:bg-brand-900"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
});
