"use server";

import { getDb } from "@/lib/firebase-admin";
import { createAdminSession, destroyAdminSession } from "@/lib/session";
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

