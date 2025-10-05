import { readAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readAdminSession();
  
  // Kontrollera att användaren är inloggad och har superadmin-behörighet
  if (!session) {
    redirect("/admin/login");
  }

  // TODO: Lägg till superadmin-kontroll här när behörighetssystemet är implementerat
  // if (!session.isSuperAdmin) {
  //   redirect("/admin/dashboard");
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Superadmin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Inloggad som: {session.congregationName}
              </span>
              <a
                href="/admin/dashboard"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Tillbaka till Admin
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a
              href="/superadmin/dashboard"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="/superadmin/preachers"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Förkunnare
            </a>
            <a
              href="/superadmin/congregations"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Församlingar
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
