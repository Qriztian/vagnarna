import { createBooking, verifyPublisherCode } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function BookingPage({ searchParams }: { searchParams: { code?: string } }) {
  const code = (searchParams.code || "").trim().toUpperCase();
  const congregation = code ? await verifyPublisherCode(code) : null;

  return (
    <main>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Boka pass</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        {code ? (
          congregation ? (
            <>
              Församling: <strong>{congregation.name}</strong> · Kod: <strong style={{ letterSpacing: 2 }}>{code}</strong>
            </>
          ) : (
            <span style={{ color: "#b91c1c" }}>Ogiltig förkunnarkod. Gå tillbaka och försök igen.</span>
          )
        ) : (
          "Ingen kod angiven. Gå tillbaka till startsidan."
        )}
      </p>

      <div className="card" style={{ marginTop: 20 }}>
        {congregation ? (
          <form action={createBooking} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
            <input type="hidden" name="publisherCode" value={code} />
            <input type="hidden" name="congregationId" value={congregation.id} />

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Datum</span>
              <input type="date" name="date" required />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Plats</span>
              <input name="locationName" placeholder="t.ex. Torget" required />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Pass</span>
              <input name="timeSlotLabel" placeholder="t.ex. 10:00–12:00" required />
            </label>

            <div className="row" style={{ marginTop: 8 }}>
              <button type="submit">Lägg till i mitt schema</button>
              <a className="muted" href={`/schema?code=${encodeURIComponent(code)}`} style={{ alignSelf: "center" }}>
                Visa mitt schema
              </a>
            </div>
          </form>
        ) : (
          <div className="muted">Bokning är inte tillgänglig utan giltig kod.</div>
        )}
      </div>
    </main>
  );
}

