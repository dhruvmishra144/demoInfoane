import { notFound } from "next/navigation";
import { requireUser, hasRole } from "@/server/auth/guards";
import { collectionLabels } from "@/server/content/schemas";
import { COLLECTIONS, type Collection } from "@/server/db/schema";
import { ContentEditorForm } from "../ContentEditorForm";

function isCollection(value: string): value is Collection {
  return (COLLECTIONS as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollection(collection)) return {};
  return { title: { absolute: `New ${collectionLabels[collection].singular} | Infotech Admin` } };
}

export default async function NewContentItemPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();

  const user = await requireUser(`/admin/content/${collection}/new`);
  const label = collectionLabels[collection];

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">New {label.singular.toLowerCase()}</h1>
        <p className="mt-1.5 text-sm text-ink-500">Saved as a draft first — nothing goes live yet.</p>
      </header>

      <div className="mt-6 max-w-3xl">
        <ContentEditorForm
          collection={collection}
          itemId={null}
          slug={null}
          status={null}
          hasDraft={false}
          hasPublished={false}
          canApprove={hasRole(user, "approver")}
          initialData={null}
        />
      </div>
    </div>
  );
}
