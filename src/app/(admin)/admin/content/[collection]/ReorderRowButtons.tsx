"use client";

import { useTransition } from "react";
import { reorder } from "@/server/content/actions";
import type { Collection } from "@/server/db/schema";

export function ReorderRowButtons({
  collection,
  itemId,
  isFirst,
  isLast,
}: {
  collection: Collection;
  itemId: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        disabled={pending || isFirst}
        onClick={() =>
          startTransition(async () => {
            await reorder(collection, itemId, "up");
          })
        }
        aria-label="Move up"
        className="rounded-lg px-1.5 py-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700 disabled:opacity-30"
      >
        ↑
      </button>
      <button
        type="button"
        disabled={pending || isLast}
        onClick={() =>
          startTransition(async () => {
            await reorder(collection, itemId, "down");
          })
        }
        aria-label="Move down"
        className="rounded-lg px-1.5 py-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700 disabled:opacity-30"
      >
        ↓
      </button>
    </div>
  );
}
