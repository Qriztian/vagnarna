"use server";

import { getDb } from "@/lib/firebase-admin";
import { createAdminSession, destroyAdminSession, readAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function verifyPublisherCode(publisherCode: string) {
  const db = getDb();
  const congregationsSnap = await db
    .collection("congregations")
    .where("publisherCodes", "array-contains", publisherCode)
    .limit(1)
    .get();

  if (congregationsSnap.empty) return null;
  const doc = congregationsSnap.docs[0];
  const data = doc.data();
  return { id: doc.id, name: data.name as string };
}

export async function createBooking(params: {
  congregationId: string;
  locationId: string;
  timeSlotId: string;
  date: string; // YYYY-MM-DD
  publisherCode: string;
}) {
  const now = new Date();
  const db = getDb();
  const ref = await db.collection("bookings").add({
    ...params,
    congregationId: params.congregationId, // SÄKERHET: Säkerställ att congregationId sparas
    createdAt: now,
  });
  return { id: ref.id };
}

export async function adminLogin(formData: FormData) {
  const congregationName = String(formData.get("congregationName") || "").trim();
  const adminCode = String(formData.get("adminCode") || "").trim();
  if (!congregationName || !adminCode) return { error: "Fyll i alla fält." } as const;

  const db = getDb();
  const snap = await db
    .collection("congregations")
    .where("name", "==", congregationName)
    .limit(1)
    .get();

  if (snap.empty) return { error: "Församlingen hittades inte." } as const;
  const doc = snap.docs[0];
  const data = doc.data() as any;
  if (data.adminCode !== adminCode) return { error: "Fel adminkod." } as const;

  await createAdminSession({ congregationId: doc.id, congregationName });
  redirect("/admin/dashboard");
}

export async function adminLogout() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function adminSetupCreateCongregation(formData: FormData) {
  const congregationName = String(formData.get("congregationName") || "").trim();
  const adminCode = String(formData.get("adminCode") || "").trim();
  if (!congregationName || !adminCode) return { error: "Fyll i alla fält." } as const;

  const db = getDb();
  const existing = await db
    .collection("congregations")
    .where("name", "==", congregationName)
    .limit(1)
    .get();
  if (!existing.empty) return { error: "Församlingen finns redan." } as const;

  const ref = await db.collection("congregations").add({
    name: congregationName,
    adminCode,
    publisherCodes: [],
    totalCarts: 0,
    settings: {
      openingHours: [],
      slotMinutes: 120,
    },
  });

  await createAdminSession({ congregationId: ref.id, congregationName });
  redirect("/admin/dashboard");
}

export async function createLocation(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const description = String(formData.get("description") || "").trim();
  
  if (!name || !address) return { error: "Namn och adress krävs." } as const;

  // Kontrollera att användaren är inloggad som admin
  const session = await readAdminSession();
  if (!session) return { error: "Du måste vara inloggad som admin." } as const;

  // Hämta veckoschema från formuläret
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const schedule: Record<string, { enabled: boolean; startTime: string; endTime: string }> = {};
  
  weekdays.forEach(day => {
    const enabled = formData.get(`${day}-enabled`) === "on";
    const startTime = String(formData.get(`${day}-start`) || "09:00");
    const endTime = String(formData.get(`${day}-end`) || "17:00");
    
    schedule[day] = { enabled, startTime, endTime };
  });

  // Säkerställ att söndagen är förifylld som tillgänglig
  if (!schedule.sunday.enabled) {
    schedule.sunday.enabled = true;
    schedule.sunday.startTime = schedule.sunday.startTime || "09:00";
    schedule.sunday.endTime = schedule.sunday.endTime || "17:00";
  }

  const db = getDb();
  const ref = await db.collection("locations").add({
    name,
    address,
    description,
    schedule,
    congregationId: session.congregationId, // SÄKERHET: Koppla till rätt församling
    createdAt: new Date(),
  });

  return { id: ref.id };
}

export async function getLocations() {
  // Kontrollera att användaren är inloggad som admin
  const session = await readAdminSession();
  if (!session) return [];

  const db = getDb();
  const snapshot = await db
    .collection("locations")
    .where("congregationId", "==", session.congregationId)
    .orderBy("name")
    .get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getBookings() {
  // Kontrollera att användaren är inloggad som admin
  const session = await readAdminSession();
  if (!session) return [];

  const db = getDb();
  const snapshot = await db
    .collection("bookings")
    .where("congregationId", "==", session.congregationId)
    .orderBy("date", "desc")
    .get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

