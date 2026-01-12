import { readAdminSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await readAdminSession();
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Översikt</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        {session ? (
          <>
            Inloggad som <strong>{session.congregationName}</strong>.
          </>
        ) : (
          "Inte inloggad."
        )}
      </p>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Schema</h2>
        <p className="muted" style={{ margin: 0 }}>
          Se bokningar som lagts till i förkunnarnas schema.
        </p>
        <div style={{ marginTop: 12 }}>
          <a href="/admin/schedule">Öppna schema →</a>
        </div>
      </div>
    </div>
  );
}

