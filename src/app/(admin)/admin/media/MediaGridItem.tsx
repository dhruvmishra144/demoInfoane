"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { deleteMediaAction, updateAltTextAction } from "@/server/media/actions";
import { Input } from "@/components/admin/Input";
import { ConfirmDialog, type ConfirmDialogHandle } from "@/components/admin/ConfirmDialog";

export function MediaGridItem({
  id,
  url,
  filename,
  altText,
}: {
  id: string;
  url: string;
  filename: string;
  altText: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const [savedAltText, setSavedAltText] = useState(altText ?? "");
  const [removed, setRemoved] = useState(false);
  const deleteDialogRef = useRef<ConfirmDialogHandle>(null);

  if (removed) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
      <div className="relative aspect-square bg-ink-50">
        <Image src={url} alt={savedAltText || filename} fill className="object-cover" unoptimized />
      </div>

      <div className="space-y-2 p-3">
        <p className="truncate text-xs text-ink-400" title={filename}>
          {filename}
        </p>

        <Input
          defaultValue={savedAltText}
          placeholder="Alt text"
          disabled={pending}
          onBlur={(e) => {
            const value = e.target.value;
            if (value === savedAltText) return;
            setSavedAltText(value);
            startTransition(async () => {
              await updateAltTextAction(id, value);
            });
          }}
          className="text-xs"
        />

        {!savedAltText && (
          <p className="text-[11px] text-amber-700">Needs alt text before it can be used.</p>
        )}

        <button
          type="button"
          disabled={pending}
          onClick={() => deleteDialogRef.current?.open()}
          className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        ref={deleteDialogRef}
        title="Delete this asset?"
        description="This removes it from ImageKit and the media library. Pages that reference it will show a broken image."
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          startTransition(async () => {
            const result = await deleteMediaAction(id);
            if (!result?.error) setRemoved(true);
          });
        }}
      />
    </div>
  );
}
