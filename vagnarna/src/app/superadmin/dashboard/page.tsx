import { readAdminSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function SuperAdminDashboardPage() {
  const session = await readAdminSession();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold">Superadmin Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Välkommen till superadmin-panelen, {session?.congregationName}.
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">👥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Förkunnare
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Hantera
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-3">
              <a
                href="/superadmin/preachers"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Visa alla förkunnare →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">🏛️</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Församlingar
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Hantera
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-3">
              <a
                href="/superadmin/congregations"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Visa alla församlingar →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Statistik
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Systemöversikt
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-sm text-gray-500">
                Kommer snart
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
