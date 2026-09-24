import { NextResponse } from "next/server";
import { ADMIN_EMAIL, blobConfigured, currentResume, isAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

// who am I + what's currently uploaded (used by the /upload-resume page)
export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ authed: false });
  const resume = await currentResume().catch(() => null);
  return NextResponse.json({
    authed: true,
    email: ADMIN_EMAIL,
    storage: blobConfigured() ? "blob" : "unconfigured",
    resume: resume ? { size: resume.size, uploadedAt: resume.uploadedAt } : null,
  });
}
