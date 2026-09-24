import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { RESUME_PATH, blobConfigured, isAuthed } from "@/lib/adminAuth";

const MAX_BYTES = 4 * 1024 * 1024; // Vercel function body limit is 4.5 MB

// Upload a new resume PDF; overwrites the previous one.
export async function POST(req) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!blobConfigured()) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN is not set, so uploads have nowhere to go yet." }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "PDF must be under 4 MB" }, { status: 413 });

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.subarray(0, 5).toString() !== "%PDF-") {
    return NextResponse.json({ error: "That's not a PDF" }, { status: 415 });
  }

  const blob = await put(RESUME_PATH, bytes, {
    access: "private",
    contentType: "application/pdf",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });

  return NextResponse.json({ ok: true, size: bytes.length, uploadedAt: new Date().toISOString(), url: blob.url });
}
