import { listMyBookings, verifyPublisherCode } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function MySchedulePage({ searchParams }: { searchParams: { code?: string } }) {
  const code = (searchParams.code || "").trim().toUpperCase();
  const congregation = code ? await verifyPublisherCode(code) : null;

  if (!code) {
    return (
      <main>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Mitt schema</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Ingen kod angiven. Gå via startsidan.
        </p>
      </main>
    );
  }

  if (!congregation) {
    return (
      <main>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Mitt schema</h1>
        <p style={{ color: "#b91c1c", marginTop: 8 }}>Ogiltig förkunnarkod.</p>
      </main>
    );
  }

  const bookings = await listMyBookings({ congregationId: congregation.id, publisherCode: code });

  return (
    <main>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Mitt schema</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Församling: <strong>{congregation.name}</strong> · Kod: <strong style={{ letterSpacing: 2 }}>{code}</strong>
      </p>

      <div className="card" style={{ marginTop: 20 }}>
        {bookings.length === 0 ? (
          <p className="muted">Inga bokningar ännu.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            {bookings.map((b) => (
              <li key={b.id}>
                <strong>{b.date}</strong> · {b.timeSlotLabel} · {b.locationName}
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: 14 }}>
          <a href={`/boka?code=${encodeURIComponent(code)}`}>+ Boka fler pass</a>
        </div>
      </div>
    </main>
  );
}

