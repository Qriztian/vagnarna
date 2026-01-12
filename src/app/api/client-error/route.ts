import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // Server-side log: shows up in hosting logs.
    console.error("[client-error]", payload);
  } catch (e) {
    console.error("[client-error] Failed to parse payload", e);
  }

  return NextResponse.json({ ok: true });
}

