"use client";

import { useRef, useState, useTransition } from "react";
import { submitForReview, publish, reject, unpublish } from "@/server/content/actions";
import type { ContentStatus } from "@/server/db/schema";
import { ConfirmDialog, type ConfirmDialogHandle } from "@/components/admin/ConfirmDialog";

/**
 * Submit/publish/reject/unpublish — separate from the draft-save form since
 * these act on an existing item by id, not on a full field submission.
 *
 * Approve/reject/unpublish are only rendered for approvers, but per
 * `guards.ts`'s own rule ("hiding a button is not a permission") the actual
 * enforcement is `requireRole("approver")` inside each server action —
 * this is a UX nicety, not the security boundary.
 */
export function StatusActions({
  itemId,
  status,
  hasDraft,
  hasPublished,
  canApprove,
}: {
  itemId: string;
  status: ContentStatus;
  hasDraft: boolean;
  hasPublished: boolean;
  canApprove: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const rejectDialogRef = useRef<ConfirmDialogHandle>(null);

  function run(action: () => Promise<{ error: string } | void>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="space-y-3">
      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {hasDraft && status !== "in_review" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => submitForReview(itemId))}
            className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Submit for review
          </button>
        )}

        {canApprove && hasDraft && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => publish(itemId))}
            className="rounded-full bg-brand-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Approve &amp; publish
          </button>
        )}

        {canApprove && hasDraft && status === "in_review" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => rejectDialogRef.current?.open()}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reject
          </button>
        )}

        {canApprove && hasPublished && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => unpublish(itemId))}
            className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Unpublish
          </button>
        )}
      </div>

      <ConfirmDialog
        ref={rejectDialogRef}
        title="Reject this draft"
        description="It goes back to the editor as a draft, with your note attached."
        confirmLabel="Reject"
        destructive
        noteLabel="Note for the editor"
        onConfirm={(note) => run(() => reject(itemId, note ?? ""))}
      />
    </div>
  );
}

