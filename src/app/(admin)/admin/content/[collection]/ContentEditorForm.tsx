"use client";

import { useActionState } from "react";
import { saveDraftAction } from "@/server/content/actions";
import type { Collection, ContentStatus } from "@/server/db/schema";
import { Field } from "@/components/admin/Field";
import { Input } from "@/components/admin/Input";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ContentEditorFields } from "./ContentEditorFields";
import { StatusActions } from "./StatusActions";

/**
 * Shared by both the "new" and "edit" routes. Draft-save goes through
 * `useActionState` (so validation errors are server-rendered, same idiom as
 * `LoginForm`); submit/publish/reject/unpublish are separate small actions
 * in `StatusActions` since they act on the existing item, not the form's
 * current (possibly unsaved) field values.
 */
export function ContentEditorForm({
  collection,
  itemId,
  slug,
  status,
  hasDraft,
  hasPublished,
  canApprove,
  initialData,
}: {
  collection: Collection;
  itemId: string | null;
  slug: string | null;
  status: ContentStatus | null;
  hasDraft: boolean;
  hasPublished: boolean;
  canApprove: boolean;
  initialData: Record<string, unknown> | null;
}) {
  const boundAction = saveDraftAction.bind(null, collection);
  const [state, formAction] = useActionState(boundAction, undefined);

  return (
    <div className="space-y-6">
      {itemId && status && (
        <StatusActions
          itemId={itemId}
          status={status}
          hasDraft={hasDraft}
          hasPublished={hasPublished}
          canApprove={canApprove}
        />
      )}

      <form action={formAction} className="space-y-5 rounded-2xl border border-ink-200 bg-white p-6">
        {itemId && <input type="hidden" name="itemId" value={itemId} />}

        {slug ? (
          <Field label="Slug" htmlFor="slug-display">
            <Input id="slug-display" value={slug} disabled />
          </Field>
        ) : (
          <Field
            label="Slug"
            htmlFor="slug"
            hint="Lower-case letters, numbers and single hyphens — this becomes part of the URL and cannot be changed later."
            error={state?.fieldErrors?.slug}
          >
            <Input id="slug" name="slug" required placeholder="e.g. custom-software-development" />
          </Field>
        )}

        <ContentEditorFields collection={collection} data={initialData} errors={state?.fieldErrors ?? {}} />

        {state?.error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {state.error}
          </p>
        )}

        <div className="flex justify-end border-t border-ink-100 pt-5">
          <SubmitButton pendingLabel="Saving…">Save draft</SubmitButton>
        </div>
      </form>
    </div>
  );
}
