import { listCongregationBookings } from "@/lib/actions";
import { readAdminSession } from "@/lib/session";

export const dynamic = "force-dynamic";

function groupByDate<T extends { date: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = item.date;
    const arr = map.get(key) ?? [];
    arr.push(item);
    map.set(key, arr);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export default async function AdminSchedulePage() {
  const session = await readAdminSession();
  if (!session) {
    return (
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Schema</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Inte inloggad.
        </p>
      </div>
    );
  }

  const bookings = await listCongregationBookings(session.congregationId);
  const grouped = groupByDate(bookings);

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Schema</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Bokningar för <strong>{session.congregationName}</strong>.
      </p>

      <div className="card" style={{ marginTop: 16 }}>
        {bookings.length === 0 ? (
          <p className="muted">Inga bokningar ännu.</p>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {grouped.map(([date, items]) => (
              <section key={date}>
                <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px 0" }}>{date}</h2>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                  {items.map((b) => (
                    <li key={b.id}>
                      <strong>{b.timeSlotLabel}</strong> · {b.locationName} · Kod:{" "}
                      <span style={{ letterSpacing: 2 }}>{b.publisherCode}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

