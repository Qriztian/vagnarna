"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/firebase-admin";
import { createAdminSession, destroyAdminSession } from "@/lib/session";

export async function verifyPublisherCode(publisherCode: string) {
  const db = getDb();
  const code = publisherCode.trim().toUpperCase();
  if (!code) return null;

  const congregationsSnap = await db
    .collection("congregations")
    .where("publisherCodes", "array-contains", code)
    .limit(1)
    .get();

  if (congregationsSnap.empty) return null;
  const doc = congregationsSnap.docs[0];
  const data = doc.data();
  return { id: doc.id, name: data.name as string, code };
}

export async function createBooking(formData: FormData) {
  const publisherCode = String(formData.get("publisherCode") || "").trim().toUpperCase();
  const congregationId = String(formData.get("congregationId") || "").trim();
  const date = String(formData.get("date") || "").trim(); // YYYY-MM-DD
  const locationName = String(formData.get("locationName") || "").trim();
  const timeSlotLabel = String(formData.get("timeSlotLabel") || "").trim();

  if (!publisherCode || !congregationId || !date || !locationName || !timeSlotLabel) {
    return { error: "Fyll i alla fält." } as const;
  }

  const now = new Date();
  const db = getDb();

  await db.collection("bookings").add({
    congregationId,
    date,
    locationName,
    timeSlotLabel,
    publisherCode,
    createdAt: now,
  });

  redirect(`/schema?code=${encodeURIComponent(publisherCode)}`);
}

export async function listMyBookings(params: { congregationId: string; publisherCode: string }) {
  const db = getDb();
  const snap = await db
    .collection("bookings")
    .where("congregationId", "==", params.congregationId)
    .where("publisherCode", "==", params.publisherCode.trim().toUpperCase())
    .orderBy("date", "asc")
    .orderBy("timeSlotLabel", "asc")
    .limit(200)
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Array<{
    id: string;
    date: string;
    locationName: string;
    timeSlotLabel: string;
    publisherCode: string;
  }>;
}

export async function listCongregationBookings(congregationId: string) {
  const db = getDb();
  const snap = await db
    .collection("bookings")
    .where("congregationId", "==", congregationId)
    .orderBy("date", "asc")
    .orderBy("timeSlotLabel", "asc")
    .limit(500)
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Array<{
    id: string;
    date: string;
    locationName: string;
    timeSlotLabel: string;
    publisherCode: string;
  }>;
}

export async function adminLogin(formData: FormData) {
  const congregationName = String(formData.get("congregationName") || "").trim();
  const adminCode = String(formData.get("adminCode") || "").trim();
  const rememberMe = String(formData.get("rememberMe") || "") === "on";
  const next = String(formData.get("next") || "").trim();
  if (!congregationName || !adminCode) return { error: "Fyll i alla fält." } as const;

  const db = getDb();
  const snap = await db.collection("congregations").where("name", "==", congregationName).limit(1).get();
  if (snap.empty) {
    redirect(`/admin/login?error=${encodeURIComponent("Församlingen hittades inte.")}`);
  }

  const doc = snap.docs[0];
  const data = doc.data() as any;
  if (data.adminCode !== adminCode) {
    redirect(`/admin/login?error=${encodeURIComponent("Fel adminkod.")}`);
  }

  await createAdminSession({ congregationId: doc.id, congregationName }, rememberMe);
  redirect(next || "/admin/dashboard");
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
  const existing = await db.collection("congregations").where("name", "==", congregationName).limit(1).get();
  if (!existing.empty) {
    redirect(`/admin/setup?error=${encodeURIComponent("Församlingen finns redan.")}`);
  }

  const ref = await db.collection("congregations").add({
    name: congregationName,
    adminCode,
    publisherCodes: [],
    totalCarts: 0,
    settings: {
      slotMinutes: 120,
      openingHours: [],
    },
    createdAt: new Date(),
  });

  await createAdminSession({ congregationId: ref.id, congregationName });
  redirect("/admin/dashboard");
}

