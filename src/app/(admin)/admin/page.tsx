import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { requireUser, hasRole } from "@/server/auth/guards";
import { getDb, schema } from "@/server/db";
import { collectionLabels } from "@/server/content/schemas";
import type { Collection } from "@/server/db/schema";

/**
 * `absolute` because a layout's title template applies to child segments, not to
 * its own page — without this, /admin would pick up the root layout's
 * "%s | Infoane" template while every other admin page uses "%s | Infoane Admin".
 */
export const metadata = { title: { absolute: "Dashboard | Infoane Admin" } };

/**
 * Dashboard: what is live, what is waiting for review, and what changed recently.
 *
 * Counts come from one grouped query rather than a query per collection — the
 * N+1 pattern is the quickest way to hit D1's limits.
 */
export default async function AdminDashboard() {
  const user = await requireUser("/admin");
  const db = getDb();

  const [byStatus, awaitingReview, recentlyUpdated] = await Promise.all([
    db
      .select({
        collection: schema.contentItems.collection,
        status: schema.contentItems.status,
        count: sql<number>`count(*)`,
      })
      .from(schema.contentItems)
      .groupBy(schema.contentItems.collection, schema.contentItems.status),

    db
      .select({
        id: schema.contentItems.id,
        collection: schema.contentItems.collection,
        slug: schema.contentItems.slug,
        updatedAt: schema.contentItems.updatedAt,
      })
      .from(schema.contentItems)
      .where(eq(schema.contentItems.status, "in_review"))
      .orderBy(desc(schema.contentItems.updatedAt))
      .limit(10),

    db
      .select({
        id: schema.contentItems.id,
        collection: schema.contentItems.collection,
        slug: schema.contentItems.slug,
        status: schema.contentItems.status,
        updatedAt: schema.contentItems.updatedAt,
      })
      .from(schema.contentItems)
      .orderBy(desc(schema.contentItems.updatedAt))
      .limit(8),
  ]);

  const totals = byStatus.reduce(
    (acc, row) => {
      acc.total += Number(row.count);
      if (row.status === "published") acc.published += Number(row.count);
      if (row.status === "draft") acc.draft += Number(row.count);
      if (row.status === "in_review") acc.inReview += Number(row.count);
      return acc;
    },
    { total: 0, published: 0, draft: 0, inReview: 0 },
  );

  const perCollection = new Map<Collection, number>();
  for (const row of byStatus) {
    perCollection.set(
      row.collection,
      (perCollection.get(row.collection) ?? 0) + Number(row.count),
    );
  }

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1.5 text-sm text-ink-500">
          {hasRole(user, "approver")
            ? "You can publish changes as well as edit them."
            : "Submit changes for review and an approver will publish them."}
        </p>
      </header>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total items", value: totals.total },
          { label: "Published", value: totals.published },
          { label: "Awaiting review", value: totals.inReview },
          { label: "Drafts", value: totals.draft },
        ].map((tile) => (
          <div key={tile.label} className="rounded-2xl border border-ink-200 bg-white p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
              {tile.label}
            </dt>
            <dd className="mt-2 text-3xl font-bold text-ink-900">{tile.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section
          aria-labelledby="collections-heading"
          className="rounded-2xl border border-ink-200 bg-white p-6"
        >
          <h2 id="collections-heading" className="text-base font-semibold text-ink-900">
            Content
          </h2>
          <ul className="mt-4 divide-y divide-ink-100">
            {(Object.keys(collectionLabels) as Collection[]).map((collection) => (
              <li key={collection}>
                <Link
                  href={`/admin/content/${collection}`}
                  className="flex items-center justify-between gap-4 py-3 transition-colors hover:text-brand-700"
                >
                  <span className="text-sm font-medium text-ink-800">
                    {collectionLabels[collection].plural}
                  </span>
                  <span className="text-sm text-ink-400">
                    {perCollection.get(collection) ?? 0}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6">
          <section
            aria-labelledby="review-heading"
            className="rounded-2xl border border-ink-200 bg-white p-6"
          >
            <h2 id="review-heading" className="text-base font-semibold text-ink-900">
              Awaiting review
            </h2>
            {awaitingReview.length === 0 ? (
              <p className="mt-3 text-sm text-ink-500">Nothing waiting.</p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {awaitingReview.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/admin/content/${item.collection}/${item.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-900 transition-colors hover:bg-amber-100"
                    >
                      <span className="truncate font-medium">{item.slug}</span>
                      <span className="shrink-0 text-xs">
                        {collectionLabels[item.collection].singular}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section
            aria-labelledby="recent-heading"
            className="rounded-2xl border border-ink-200 bg-white p-6"
          >
            <h2 id="recent-heading" className="text-base font-semibold text-ink-900">
              Recently updated
            </h2>
            <ul className="mt-4 space-y-2.5">
              {recentlyUpdated.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  <Link
                    href={`/admin/content/${item.collection}/${item.slug}`}
                    className="truncate text-ink-700 transition-colors hover:text-brand-700"
                  >
                    {item.slug}
                  </Link>
                  <span className="shrink-0 text-xs capitalize text-ink-400">
                    {item.status.replace("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
