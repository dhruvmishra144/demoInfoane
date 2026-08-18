import Link from "next/link";
import { requireUser } from "@/server/auth/guards";
import { collectionLabels } from "@/server/content/schemas";
import { COLLECTIONS } from "@/server/db/schema";

export const metadata = { title: { absolute: "Content | Infotech Admin" } };

export default async function ContentCollectionsPage() {
  await requireUser("/admin/content");

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Content</h1>
        <p className="mt-1.5 text-sm text-ink-500">
          Everything on the public site except layout lives in one of these collections.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => (
          <li key={collection}>
            <Link
              href={`/admin/content/${collection}`}
              className="block rounded-2xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
            >
              <p className="text-sm font-semibold text-ink-900">
                {collectionLabels[collection].plural}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
