import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminSetupCreateCongregation } from "@/lib/actions";

export default function AdminSetupPage() {
  return (
    <div className="mx-auto mt-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Första konfiguration</CardTitle>
          <CardDescription>Skapa en ny församling.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={adminSetupCreateCongregation} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Församlingsnamn</label>
              <Input name="congregationName" placeholder="t.ex. Centrala Församlingen" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Adminkod</label>
              <Input name="adminCode" type="password" required />
            </div>
            <Button type="submit" className="w-full">Skapa</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
