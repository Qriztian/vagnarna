import { adminLogin } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string; next?: string } }) {
  const error = (searchParams.error || "").trim();
  const next = (searchParams.next || "").trim();

  return (
    <main className="card" style={{ maxWidth: 520 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Admin inloggning</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Logga in för att se schema och hantera bokningar.
      </p>

      {error ? (
        <p style={{ marginTop: 12, color: "#b91c1c" }}>
          {error}
        </p>
      ) : null}

      <form action={adminLogin} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input type="hidden" name="next" value={next} />

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Församlingsnamn</span>
          <input name="congregationName" placeholder="t.ex. Centrala Församlingen" required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Adminkod</span>
          <input name="adminCode" type="password" required />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
          <input type="checkbox" name="rememberMe" />
          Håll mig inloggad
        </label>

        <button type="submit">Logga in</button>

        <p className="muted" style={{ fontSize: 12 }}>
          Första gången? Gå till <a href="/admin/setup">/admin/setup</a>.
        </p>
      </form>
    </main>
  );
}

