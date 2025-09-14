import Link from "next/link";
import { adminLogout } from "@/lib/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between py-6">
        <Link href="/admin/dashboard" className="text-xl font-semibold text-primary">
          Admin
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <Link href="/admin/dashboard">Översikt</Link>
          <Link href="/admin/locations">Platser</Link>
          <Link href="/admin/carts">Vagnar</Link>
          <Link href="/admin/schedule">Schema</Link>
          <Link href="/admin/events">Evenemang</Link>
          <Link href="/admin/settings">Inställningar</Link>
          <form action={adminLogout}>
            <button className="text-slate-500 hover:text-slate-900" type="submit">Logga ut</button>
          </form>
        </nav>
      </header>
      <main className="py-4">{children}</main>
    </div>
  );
}
