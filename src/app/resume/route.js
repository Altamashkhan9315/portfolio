import { NextResponse } from "next/server";
import { readResume } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

// Public resume link. Serves the last upload from /upload-resume; falls back to public/myresume.pdf.
export async function GET(req) {
  try {
    const res = await readResume();
    if (res?.stream) {
      return new NextResponse(res.stream, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="Altamash_Khan_Resume.pdf"',
          "Cache-Control": "public, max-age=60",
        },
      });
    }
  } catch {}
  return NextResponse.redirect(new URL("/myresume.pdf", req.url));
}
