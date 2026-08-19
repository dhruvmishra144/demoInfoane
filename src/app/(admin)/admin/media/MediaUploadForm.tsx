"use client";

import { useActionState } from "react";
import { uploadMediaAction } from "@/server/media/actions";
import { Field } from "@/components/admin/Field";
import { Input } from "@/components/admin/Input";
import { SubmitButton } from "@/components/admin/SubmitButton";

export function MediaUploadForm() {
  const [state, formAction] = useActionState(uploadMediaAction, undefined);

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-2xl border border-ink-200 bg-white p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
    >
      <Field label="Image" htmlFor="file">
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          required
          className="block w-full text-sm text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
        />
      </Field>

      <Field label="Alt text" htmlFor="altText" hint="Required before this image can be used on a public page.">
        <Input id="altText" name="altText" placeholder="Describe the image" />
      </Field>

      <div>
        <SubmitButton pendingLabel="Uploading…">Upload</SubmitButton>
      </div>

      {state?.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-3">
          {state.error}
        </p>
      )}
    </form>
  );
}
