import { getDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

async function getAllPreachers() {
  const db = getDb();
  const snapshot = await db
    .collection("preachers")
    .orderBy("name")
    .get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function getAllCongregations() {
  const db = getDb();
  const snapshot = await db
    .collection("congregations")
    .orderBy("name")
    .get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default async function SuperAdminPreachersPage() {
  const preachers = await getAllPreachers();
  const congregations = await getAllCongregations();
  
  // Skapa en lookup-tabell för församlingsnamn
  const congregationLookup = congregations.reduce((acc, cong) => {
    acc[cong.id] = cong.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Alla Förkunnare</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Lägg till förkunnare
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Förkunnare ({preachers.length})
          </h3>
          
          {preachers.length === 0 ? (
            <p className="text-gray-500">Inga förkunnare hittades.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Namn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Församling
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skapad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Åtgärder
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {preachers.map((preacher) => (
                    <tr key={preacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {preacher.name || "Namn saknas"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {congregationLookup[preacher.congregationId] || "Okänd församling"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preacher.email || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preacher.phone || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preacher.createdAt 
                          ? new Date(preacher.createdAt.seconds * 1000).toLocaleDateString('sv-SE')
                          : "-"
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Redigera
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Ta bort
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Församlingar ({congregations.length})
          </h3>
          
          {congregations.length === 0 ? (
            <p className="text-gray-500">Inga församlingar hittades.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {congregations.map((congregation) => (
                <div key={congregation.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">{congregation.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {preachers.filter(p => p.congregationId === congregation.id).length} förkunnare
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    ID: {congregation.id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
