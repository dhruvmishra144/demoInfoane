import { requireRole } from "@/server/auth/guards";
import { getAllUsers } from "@/server/users/read";
import { Table, TableHead, Th, TableBody } from "@/components/admin/Table";
import { CreateUserForm } from "./CreateUserForm";
import { UserRow } from "./UserRow";

export const metadata = { title: { absolute: "Users | Infoane Admin" } };

export default async function UsersPage() {
  const currentUser = await requireRole("admin");
  const users = await getAllUsers();

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Users</h1>
        <p className="mt-1.5 text-sm text-ink-500">{users.length} accounts</p>
      </header>

      <div className="mt-6">
        <CreateUserForm />
      </div>

      <div className="mt-6">
        <Table>
          <TableHead>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Last sign-in</Th>
            <Th className="text-right">Status</Th>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                id={user.id}
                email={user.email}
                name={user.name}
                role={user.role}
                isActive={user.isActive === 1}
                isSelf={user.id === currentUser.id}
                lastLoginAt={user.lastLoginAt}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
