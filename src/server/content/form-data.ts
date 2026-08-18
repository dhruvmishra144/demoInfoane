/**
 * Low-level `FormData` readers shared by every collection's form parser.
 *
 * Array fields are submitted as `${prefix}[0]`, `${prefix}[1]`, ... (or
 * `${prefix}[0][field]` for object rows) by `RepeatableStringList` /
 * `RepeatableGroupList` (`src/components/admin/RepeatableList.tsx`) — these
 * functions are the matching read side.
 */

export function readString(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export function readNullableString(formData: FormData, name: string): string | null {
  const value = readString(formData, name);
  return value.length > 0 ? value : null;
}

export function readBoolean(formData: FormData, name: string): boolean {
  const value = formData.get(name);
  return value === "on" || value === "true";
}

export function readStringArray(formData: FormData, prefix: string): string[] {
  const out: string[] = [];
  for (let i = 0; formData.has(`${prefix}[${i}]`); i += 1) {
    out.push(readString(formData, `${prefix}[${i}]`));
  }
  return out.filter((value) => value.length > 0);
}

export function readObjectArray<Field extends string>(
  formData: FormData,
  prefix: string,
  fields: readonly Field[],
): Record<Field, string>[] {
  const out: Record<Field, string>[] = [];
  for (let i = 0; formData.has(`${prefix}[${i}][${fields[0]}]`); i += 1) {
    const row = {} as Record<Field, string>;
    for (const field of fields) {
      row[field] = readString(formData, `${prefix}[${i}][${field}]`);
    }
    out.push(row);
  }
  return out;
}
