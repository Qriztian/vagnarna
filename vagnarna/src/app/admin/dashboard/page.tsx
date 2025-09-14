import { readAdminSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await readAdminSession();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Instrumentpanel</h1>
      <p className="mt-2 text-slate-600">
        {session ? (
          <>Inloggad som <strong>{session.congregationName}</strong>.</>
        ) : (
          "Inte inloggad."
        )}
      </p>
      <div className="mt-6 text-sm text-muted-foreground">Statistik och översikt kommer här.</div>
    </div>
  );
}
