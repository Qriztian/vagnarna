import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminLogin } from "@/lib/actions";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto mt-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Admininloggning</CardTitle>
          <CardDescription>Ange församlingsnamn och adminkod.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={adminLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Församlingsnamn</label>
              <Input name="congregationName" placeholder="t.ex. Centrala Församlingen" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Adminkod</label>
              <Input name="adminCode" type="password" required />
            </div>
            <Button type="submit" className="w-full">Logga in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
