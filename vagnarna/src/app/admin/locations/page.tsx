"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createLocation } from "@/lib/actions";

const weekdays = [
  { key: "sunday", label: "Söndag" }, // Sunday moved to first position
  { key: "monday", label: "Måndag" },
  { key: "tuesday", label: "Tisdag" },
  { key: "wednesday", label: "Onsdag" },
  { key: "thursday", label: "Torsdag" },
  { key: "friday", label: "Fredag" },
  { key: "saturday", label: "Lördag" },
];

export default function AdminLocationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createLocation(formData);
      // Reset form eller visa success-meddelande
    } catch (error) {
      console.error("Fel vid skapande av plats:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Platser</h1>
      <p className="mt-2 text-slate-600">Hantera platser där vagnar kan stå.</p>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Skapa ny plats</CardTitle>
          <CardDescription>Lägg till en ny plats med öppettider.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Namn på plats</Label>
                <Input id="name" name="name" placeholder="t.ex. Centrum" required />
              </div>
              <div>
                <Label htmlFor="address">Adress</Label>
                <Input id="address" name="address" placeholder="t.ex. Storgatan 1, Stockholm" required />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Beskrivning (valfritt)</Label>
              <Input id="description" name="description" placeholder="Kort beskrivning av platsen" />
            </div>

            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Veckoschema</h3>
              <div className="space-y-3">
                {weekdays.map((day) => (
                  <div key={day.key} className="flex items-center space-x-4">
                    <div className="w-20">
                      <Label htmlFor={`${day.key}-enabled`} className="text-sm">
                        {day.label}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`${day.key}-enabled`}
                        name={`${day.key}-enabled`}
                        className="rounded border-gray-300"
                        defaultChecked={day.key === "sunday"} // Söndagen är förifylld
                        disabled={day.key === "sunday"} // Söndagen kan inte avmarkeras
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`${day.key}-start`} className="text-sm">Från:</Label>
                      <Input
                        type="time"
                        id={`${day.key}-start`}
                        name={`${day.key}-start`}
                        defaultValue="09:00"
                        className="w-24"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`${day.key}-end`} className="text-sm">Till:</Label>
                      <Input
                        type="time"
                        id={`${day.key}-end`}
                        name={`${day.key}-end`}
                        defaultValue="17:00"
                        className="w-24"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Söndagen är automatiskt aktiverad som standard och kan inte avmarkeras.
              </p>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Skapar..." : "Skapa plats"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
