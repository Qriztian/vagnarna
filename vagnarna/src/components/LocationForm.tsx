"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LocationFormData {
  name: string;
  startTime: string;
  endTime: string;
  maxCarts: number;
  timeInterval: string;
  availableDays: number[]; // 0=Sunday, 1=Monday, etc.
}

const WEEKDAYS = [
  { id: 0, label: "Sön", name: "Söndag" },
  { id: 1, label: "Mån", name: "Måndag" },
  { id: 2, label: "Tis", name: "Tisdag" },
  { id: 3, label: "Ons", name: "Onsdag" },
  { id: 4, label: "Tor", name: "Torsdag" },
  { id: 5, label: "Fre", name: "Fredag" },
  { id: 6, label: "Lör", name: "Lördag" },
];

const TIME_INTERVALS = [
  "30 minuter",
  "1 timme",
  "1.5 timmar",
  "2 timmar",
];

export function LocationForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LocationFormData>({
    name: "Stallet",
    startTime: "06:00",
    endTime: "21:00",
    maxCarts: 4,
    timeInterval: "1 timme",
    // Söndag (0) är förifyllt tillsammans med alla andra dagar
    availableDays: [0, 1, 2, 3, 4, 5, 6], // Alla dagar inklusive söndag - SÖNDAG ÄR FÖRVALD!
  });

  // Debug: logga availableDays för att se att söndagen är inkluderad
  console.log("Available days:", formData.availableDays, "Söndag (0) inkluderad:", formData.availableDays.includes(0));

  // Säkerställ att söndagen alltid är vald när komponenten mountas
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(0) 
        ? prev.availableDays 
        : [0, ...prev.availableDays] // Lägg till söndag först om den inte finns
    }));
  }, []);

  const handleDayToggle = (dayId: number) => {
    // Söndagen (0) kan inte avmarkeras - den ska alltid vara vald
    if (dayId === 0) return;
    
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(dayId)
        ? prev.availableDays.filter(id => id !== dayId)
        : [...prev.availableDays, dayId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Plats skapad:", formData);
    // Här kommer vi att lägga till Firebase-integration senare
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700">
          + Lägg till plats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lägg till ny plats</DialogTitle>
          <DialogDescription>
            Konfigurera en ny plats för vagnvittnande.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Platsnamn</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="t.ex. Stallet"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Starttid</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Sluttid</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxCarts">Max antal vagnar</Label>
            <Input
              id="maxCarts"
              type="number"
              min="1"
              max="20"
              value={formData.maxCarts}
              onChange={(e) => setFormData(prev => ({ ...prev, maxCarts: parseInt(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeInterval">Tidsintervall</Label>
            <select
              id="timeInterval"
              value={formData.timeInterval}
              onChange={(e) => setFormData(prev => ({ ...prev, timeInterval: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {TIME_INTERVALS.map(interval => (
                <option key={interval} value={interval}>{interval}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Tillgängliga dagar</Label>
            <div className="flex gap-2 flex-wrap">
              {WEEKDAYS.map(day => (
                <Button
                  key={day.id}
                  type="button"
                  variant={formData.availableDays.includes(day.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDayToggle(day.id)}
                  disabled={day.id === 0} // Söndagen kan inte avmarkeras
                  className={day.id === 0 
                    ? "bg-teal-600 text-white cursor-not-allowed opacity-100" // Söndagen är alltid vald och synlig
                    : formData.availableDays.includes(day.id) 
                      ? "bg-teal-600 hover:bg-teal-700 text-white" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }
                >
                  {day.label}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Söndagen är alltid tillgänglig och kan inte avmarkeras.
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Lägg till plats
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Avbryt
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
