import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { del, get, list, put } from "@vercel/blob";

// Admin login for /upload-resume.
// Email comes from ADMIN_EMAIL. The password starts as ADMIN_PASSWORD (env) and, once changed
// from the UI, lives as a salted scrypt hash in Vercel Blob so it survives redeploys.
// Sessions are HMAC-signed cookies keyed on AUTH_SECRET + the current password hash, so
// changing the password logs every other session out.

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "altamashkhan9315@gmail.com").toLowerCase();
export const COOKIE_NAME = "admin_session";
export const RESUME_PATH = "resume.pdf";
const AUTH_PREFIX = "private/auth-";
const SESSION_DAYS = 7;

export const blobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const safeEq = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

export function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  return { salt, hash: scryptSync(password, salt, 64).toString("hex") };
}

// newest stored password record, or null if none (or Blob not configured)
async function storedAuth() {
  if (!blobConfigured()) return null;
  const { blobs } = await list({ prefix: AUTH_PREFIX, limit: 20 });
  if (!blobs.length) return null;
  const newest = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
  const res = await get(newest.pathname, { access: "private", useCache: false });
  if (!res) return null;
  const rec = JSON.parse(await new Response(res.stream).text());
  return { ...rec, url: newest.url, all: blobs };
}

async function secret() {
  const stored = await storedAuth();
  const base = process.env.AUTH_SECRET || process.env.BLOB_READ_WRITE_TOKEN || "dev-only-secret";
  return `${base}:${stored?.hash || process.env.ADMIN_PASSWORD || ""}`;
}

export async function verifyLogin(email, password) {
  if (!email || !password || email.toLowerCase() !== ADMIN_EMAIL) return false;
  const stored = await storedAuth();
  if (stored) return safeEq(hashPassword(password, stored.salt).hash, stored.hash);
  return Boolean(process.env.ADMIN_PASSWORD) && safeEq(password, process.env.ADMIN_PASSWORD);
}

export async function setPassword(next) {
  const prev = await storedAuth();
  const rec = hashPassword(next);
  await put(`${AUTH_PREFIX}${Date.now()}.json`, JSON.stringify(rec), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: true,
  });
  if (prev?.all?.length) await del(prev.all.map((b) => b.url));
}

export async function sessionToken() {
  const exp = Date.now() + SESSION_DAYS * 86400000;
  const sig = createHmac("sha256", await secret()).update(`${ADMIN_EMAIL}.${exp}`).digest("hex");
  return `${exp}.${sig}`;
}

export async function isAuthed() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const want = createHmac("sha256", await secret()).update(`${ADMIN_EMAIL}.${exp}`).digest("hex");
  return safeEq(sig, want);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_DAYS * 86400,
};

// metadata of the current uploaded resume, or null
export async function currentResume() {
  if (!blobConfigured()) return null;
  const { blobs } = await list({ prefix: RESUME_PATH, limit: 1 });
  return blobs[0] ?? null;
}

// bytes of the current uploaded resume as a stream, or null
export async function readResume() {
  if (!blobConfigured()) return null;
  return get(RESUME_PATH, { access: "private", useCache: false });
}
