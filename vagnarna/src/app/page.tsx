"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setIsSubmitting(true);
    try {
      // Placeholder route; will validate via server action later
      router.push(`/boka?code=${encodeURIComponent(code.trim())}`);
    } catch (err) {
      toast({ title: "Något gick fel", description: "Försök igen." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight text-primary">Vagnarna.se</h1>
      <p className="mt-2 text-slate-600">Boka litteraturvagn för din församling.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ange förkunnarkod</CardTitle>
          <CardDescription>Koden får du av din administratör.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex gap-3">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="t.ex. AB12CD"
              required
              className="uppercase tracking-widest"
              aria-label="Förkunnarkod"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Kontrollerar..." : "Fortsätt"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
