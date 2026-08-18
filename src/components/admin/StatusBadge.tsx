import type { ContentStatus } from "@/server/db/schema";

/**
 * Extracted from the pill styling `admin/page.tsx` already hand-rolled once for
 * "awaiting review" — one place to keep every status's color consistent.
 */
const STYLES: Record<ContentStatus, string> = {
  draft: "bg-ink-100 text-ink-600",
  in_review: "bg-amber-50 text-amber-900",
  published: "bg-emerald-50 text-emerald-700",
  archived: "bg-ink-50 text-ink-400",
};

const LABELS: Record<ContentStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  published: "Published",
  archived: "Archived",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
