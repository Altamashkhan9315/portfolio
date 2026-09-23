import { NextResponse } from "next/server";

// Serves the latest compiled resume from the resume repo (built by its GitHub Action on every push).
// Falls back to the copy in /public if GitHub is unreachable. Override the source with RESUME_URL.
const RESUME_URL =
  process.env.RESUME_URL || "https://raw.githubusercontent.com/Altamashkhan9315/resume/pdf/resume.pdf";
const REVALIDATE = 600; // seconds; a new PDF shows up within 10 minutes of the build finishing

export async function GET(req) {
  const headers = {};
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`; // only needed if the repo is private

  try {
    const res = await fetch(RESUME_URL, { headers, next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(`resume fetch: ${res.status}`);
    const pdf = await res.arrayBuffer();
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Altamash_Khan_Resume.pdf"',
        "Cache-Control": `public, max-age=${REVALIDATE}, stale-while-revalidate=86400`,
      },
    });
  } catch {
    return NextResponse.redirect(new URL("/myresume.pdf", req.url));
  }
}
