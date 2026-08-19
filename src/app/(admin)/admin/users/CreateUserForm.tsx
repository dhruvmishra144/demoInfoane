"use client";

import { useActionState } from "react";
import { createUserAction } from "@/server/users/actions";
import { Field } from "@/components/admin/Field";
import { Input } from "@/components/admin/Input";
import { Select } from "@/components/admin/Select";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { USER_ROLES } from "@/server/db/schema";

export function CreateUserForm() {
  const [state, formAction] = useActionState(createUserAction, undefined);

  return (
    <form action={formAction} className="grid gap-4 rounded-2xl border border-ink-200 bg-white p-6 sm:grid-cols-2">
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" required autoComplete="off" />
      </Field>
      <Field label="Full name" htmlFor="name">
        <Input id="name" name="name" required />
      </Field>
      <Field label="Role" htmlFor="role">
        <Select id="role" name="role" defaultValue="editor">
          {USER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Temporary password"
        htmlFor="password"
        hint="They'll be required to change it on first sign-in."
      >
        <Input id="password" name="password" type="password" required autoComplete="new-password" />
      </Field>

      {state?.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
          {state.error}
        </p>
      )}

      <div className="sm:col-span-2">
        <SubmitButton pendingLabel="Creating…">Create user</SubmitButton>
      </div>
    </form>
  );
}
