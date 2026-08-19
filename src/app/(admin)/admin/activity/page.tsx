import { requireRole } from "@/server/auth/guards";
import { recentAudit } from "@/server/auth/audit";
import { Table, TableHead, Th, TableBody, Td } from "@/components/admin/Table";

export const metadata = { title: { absolute: "Activity | Infotech Admin" } };

function formatAction(action: string): string {
  return action.replace(".", " → ").replace(/_/g, " ");
}

export default async function ActivityPage() {
  await requireRole("admin");
  const entries = await recentAudit(100);

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Activity</h1>
        <p className="mt-1.5 text-sm text-ink-500">The most recent {entries.length} audited actions.</p>
      </header>

      <div className="mt-6">
        {entries.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-200 p-8 text-center text-sm text-ink-500">
            Nothing recorded yet.
          </p>
        ) : (
          <Table>
            <TableHead>
              <Th>When</Th>
              <Th>Who</Th>
              <Th>Action</Th>
              <Th>Target</Th>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <Td className="whitespace-nowrap text-ink-400">
                    {new Date(entry.createdAt).toLocaleString()}
                  </Td>
                  <Td>{entry.actorName ?? entry.actorEmail ?? "—"}</Td>
                  <Td className="capitalize">{formatAction(entry.action)}</Td>
                  <Td className="text-ink-400">
                    {entry.targetType ? `${entry.targetType}${entry.targetId ? ` (${entry.targetId})` : ""}` : "—"}
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
