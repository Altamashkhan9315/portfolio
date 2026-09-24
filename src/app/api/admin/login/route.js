import { NextResponse } from "next/server";
import { COOKIE_NAME, cookieOptions, sessionToken, verifyLogin } from "@/lib/adminAuth";

export async function POST(req) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!(await verifyLogin(email, password))) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return NextResponse.json({ error: "Wrong email or password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, await sessionToken(), cookieOptions);
  return res;
}
