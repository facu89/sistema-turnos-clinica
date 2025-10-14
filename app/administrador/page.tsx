import { LogoutButton } from "@/components/logout-button";
import { TableUsersAdmin } from "@/components/table-user-admin";
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <header>
          <h1 className="text-2xl font-bold">Administrar Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            <LogoutButton />
          </p>
        </header>
        <TableUsersAdmin />
      </div>
    </div>
  );
}
