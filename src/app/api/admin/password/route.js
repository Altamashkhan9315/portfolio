import { NextResponse } from "next/server";
import { ADMIN_EMAIL, COOKIE_NAME, blobConfigured, cookieOptions, isAuthed, sessionToken, setPassword, verifyLogin } from "@/lib/adminAuth";

export async function POST(req) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!blobConfigured()) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN is not set, so the new password can't be saved yet." }, { status: 503 });
  }

  const { current, next } = await req.json().catch(() => ({}));
  if (!(await verifyLogin(ADMIN_EMAIL, current))) {
    return NextResponse.json({ error: "Current password is wrong" }, { status: 401 });
  }
  if (typeof next !== "string" || next.length < 8) {
    return NextResponse.json({ error: "New password needs at least 8 characters" }, { status: 400 });
  }

  await setPassword(next);
  // other sessions are now invalid; re-issue this one so the user stays signed in
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, await sessionToken(), cookieOptions);
  return res;
}
