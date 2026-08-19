"use client";

import { useState, useTransition } from "react";
import { updateUserRoleAction, setUserActiveAction } from "@/server/users/actions";
import { Select } from "@/components/admin/Select";
import { Td } from "@/components/admin/Table";
import { USER_ROLES, type UserRole } from "@/server/db/schema";

export function UserRow({
  id,
  email,
  name,
  role,
  isActive,
  isSelf,
  lastLoginAt,
}: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  isSelf: boolean;
  lastLoginAt: number | null;
}) {
  const [pending, startTransition] = useTransition();
  const [currentRole, setCurrentRole] = useState(role);
  const [active, setActive] = useState(isActive);
  const [error, setError] = useState<string | null>(null);

  return (
    <tr className={active ? undefined : "opacity-50"}>
      <Td>
        <p className="font-medium text-ink-900">{name}</p>
        <p className="text-xs text-ink-400">{email}</p>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </Td>
      <Td>
        <Select
          value={currentRole}
          disabled={pending}
          onChange={(e) => {
            const next = e.target.value as UserRole;
            setCurrentRole(next);
            startTransition(async () => {
              const result = await updateUserRoleAction(id, next);
              if (result?.error) setError(result.error);
            });
          }}
          className="w-auto"
        >
          {USER_ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </Td>
      <Td className="text-ink-400">
        {lastLoginAt ? new Date(lastLoginAt).toLocaleDateString() : "Never"}
      </Td>
      <Td className="text-right">
        <button
          type="button"
          disabled={pending || isSelf}
          onClick={() => {
            const next = !active;
            setError(null);
            startTransition(async () => {
              const result = await setUserActiveAction(id, next);
              if (result?.error) {
                setError(result.error);
              } else {
                setActive(next);
              }
            });
          }}
          title={isSelf ? "You cannot deactivate your own account" : undefined}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            active
              ? "border-red-200 text-red-700 hover:bg-red-50"
              : "border-ink-200 text-ink-700 hover:bg-ink-50"
          }`}
        >
          {active ? "Deactivate" : "Reactivate"}
        </button>
      </Td>
    </tr>
  );
}
