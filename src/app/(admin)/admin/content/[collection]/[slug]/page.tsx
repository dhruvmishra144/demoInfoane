import { notFound } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { requireUser, hasRole } from "@/server/auth/guards";
import { getDb, schema } from "@/server/db";
import { getDraftItem, getItem } from "@/server/content/read";
import { collectionLabels } from "@/server/content/schemas";
import { COLLECTIONS, type Collection } from "@/server/db/schema";
import { ContentEditorForm } from "../ContentEditorForm";

function isCollection(value: string): value is Collection {
  return (COLLECTIONS as readonly string[]).includes(value);
}

type Params = { collection: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) return {};
  return { title: { absolute: `${slug} — ${collectionLabels[collection].singular} | Infotech Admin` } };
}

export default async function EditContentItemPage({ params }: { params: Promise<Params> }) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) notFound();

  const user = await requireUser(`/admin/content/${collection}/${slug}`);
  const db = getDb();

  const rows = await db
    .select()
    .from(schema.contentItems)
    .where(and(eq(schema.contentItems.collection, collection), eq(schema.contentItems.slug, slug)))
    .limit(1);
  const item = rows[0];
  if (!item) notFound();

  const initialData = item.draftRevisionId
    ? await getDraftItem(collection, slug)
    : await getItem(collection, slug);

  const label = collectionLabels[collection];

  return (
    <div>
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
          {label.singular}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-ink-900">{slug}</h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <ContentEditorForm
          collection={collection}
          itemId={item.id}
          slug={item.slug}
          status={item.status}
          hasDraft={item.draftRevisionId !== null}
          hasPublished={item.publishedRevisionId !== null}
          canApprove={hasRole(user, "approver")}
          initialData={initialData}
        />
      </div>
    </div>
  );
}
