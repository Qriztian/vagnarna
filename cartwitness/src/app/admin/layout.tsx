import { adminLogout } from "@/lib/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
        <nav className="row" style={{ alignItems: "center" }}>
          <a href="/admin/dashboard">Översikt</a>
          <a href="/admin/schedule">Schema</a>
        </nav>
        <form action={adminLogout}>
          <button type="submit">Logga ut</button>
        </form>
      </header>
      <main style={{ paddingTop: 12 }}>{children}</main>
    </div>
  );
}

