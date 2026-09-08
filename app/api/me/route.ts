import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;

  if (!token) {
    return NextResponse.json({ username: null }, { status: 401 });
  }

  const payload = await verifySessionToken(token);

  if (!payload) {
    return NextResponse.json({ username: null }, { status: 401 });
  }

  return NextResponse.json({ username: payload.username });
}