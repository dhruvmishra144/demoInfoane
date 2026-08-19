import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/server/auth/guards";
import { getAllItemsForAdmin } from "@/server/content/read";
import { collectionLabels } from "@/server/content/schemas";
import { COLLECTIONS, type Collection } from "@/server/db/schema";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Table, TableHead, Th, TableBody, Td } from "@/components/admin/Table";
import { ReorderRowButtons } from "./ReorderRowButtons";

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
  return { title: { absolute: `${collectionLabels[collection].plural} | Infoane Admin` } };
}

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();

  await requireUser(`/admin/content/${collection}`);
  const items = await getAllItemsForAdmin(collection);
  const label = collectionLabels[collection];

  return (
    <div>
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">{label.plural}</h1>
          <p className="mt-1.5 text-sm text-ink-500">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Link
          href={`/admin/content/${collection}/new`}
          className="rounded-full bg-brand-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
        >
          New {label.singular.toLowerCase()}
        </Link>
      </header>

      <div className="mt-6">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-200 p-8 text-center text-sm text-ink-500">
            Nothing here yet.
          </p>
        ) : (
          <Table>
            <TableHead>
              <Th>Slug</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
              <Th className="text-right">Order</Th>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <Td>
                    <Link
                      href={`/admin/content/${collection}/${item.slug}`}
                      className="font-medium text-ink-900 hover:text-brand-700"
                    >
                      {item.slug}
                    </Link>
                  </Td>
                  <Td>
                    <StatusBadge status={item.status} />
                  </Td>
                  <Td className="text-ink-400">{new Date(item.updatedAt).toLocaleDateString()}</Td>
                  <Td>
                    <ReorderRowButtons
                      collection={collection}
                      itemId={item.id}
                      isFirst={index === 0}
                      isLast={index === items.length - 1}
                    />
                  </Td>
                </tr>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
