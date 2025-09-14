import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { verifyPublisherCode } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function BookingEntryPage({ searchParams }: { searchParams: { code?: string } }) {
  const code = (searchParams.code || "").toUpperCase();
  const congregation = code ? await verifyPublisherCode(code) : null;
  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold">Boka vagn</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Välj plats, datum och pass</CardTitle>
          <CardDescription>
            {code ? (
              congregation ? (
                <span>
                  Församling: <strong>{congregation.name}</strong> &middot; Kod: <strong className="tracking-widest">{code}</strong>
                </span>
              ) : (
                <span className="text-red-600">Ogiltig förkunnarkod. Gå tillbaka och försök igen.</span>
              )
            ) : (
              "Ange förkunnarkod på startsidan."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Här kommer platslista, kalender och tidspass att visas efter server-actions är kopplade.
          </p>
          <Separator className="my-4" />
          <div className="text-sm text-muted-foreground">Under uppbyggnad.</div>
        </CardContent>
      </Card>
    </main>
  );
}

