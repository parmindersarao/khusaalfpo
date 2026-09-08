import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin-session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await verifySessionToken(token);

  if (!payload) {
    // Token expired ya tampered — cookie clear karke login pe bhejo
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("admin-session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};