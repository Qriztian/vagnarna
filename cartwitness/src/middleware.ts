import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthFree = req.nextUrl.pathname === "/admin/login" || req.nextUrl.pathname === "/admin/setup";
  if (!isAdminRoute || isAuthFree) return NextResponse.next();

  const hasSession = Boolean(req.cookies.get("admin_session")?.value);
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

