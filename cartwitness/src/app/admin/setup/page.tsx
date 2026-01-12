import { adminSetupCreateCongregation } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default function AdminSetupPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = (searchParams.error || "").trim();

  return (
    <main className="card" style={{ maxWidth: 520 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Första konfiguration</h1>
      <p className="muted" style={{ marginTop: 8 }}>Skapa en ny församling och få en admin-session.</p>

      {error ? <p style={{ marginTop: 12, color: "#b91c1c" }}>{error}</p> : null}

      <form action={adminSetupCreateCongregation} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Församlingsnamn</span>
          <input name="congregationName" placeholder="t.ex. Centrala Församlingen" required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Adminkod</span>
          <input name="adminCode" type="password" required />
        </label>

        <button type="submit">Skapa</button>
      </form>
    </main>
  );
}

