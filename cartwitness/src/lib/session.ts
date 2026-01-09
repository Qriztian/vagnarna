import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days (standard)
const REMEMBER_ME_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days (håll mig inloggad)

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET saknas");
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  congregationId: string;
  congregationName: string;
};

export async function createAdminSession(payload: AdminSessionPayload, rememberMe: boolean = false) {
  const maxAge = rememberMe ? REMEMBER_ME_MAX_AGE_SECONDS : SESSION_MAX_AGE_SECONDS;
  
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSecret());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: maxAge,
  });
}

export async function readAdminSession(): Promise<AdminSessionPayload | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function destroyAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

// FÖRKUNNARE SESSION
const PREACHER_SESSION_COOKIE = "preacher_session";
const PREACHER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days (standard)
const PREACHER_REMEMBER_ME_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days (håll mig inloggad)

export type PreacherSessionPayload = {
  preacherId: string;
  congregationId: string;
  biblicalName: string;
};

export async function createPreacherSession(payload: PreacherSessionPayload, rememberMe: boolean = false) {
  const maxAge = rememberMe ? PREACHER_REMEMBER_ME_MAX_AGE_SECONDS : PREACHER_SESSION_MAX_AGE_SECONDS;
  
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSecret());

  (await cookies()).set(PREACHER_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: maxAge,
  });
}

export async function readPreacherSession(): Promise<PreacherSessionPayload | null> {
  const token = (await cookies()).get(PREACHER_SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as PreacherSessionPayload;
  } catch {
    return null;
  }
}

export async function destroyPreacherSession() {
  (await cookies()).delete(PREACHER_SESSION_COOKIE);
}

