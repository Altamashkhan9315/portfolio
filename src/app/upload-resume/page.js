"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileText, KeyRound, LogOut, UploadCloud, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

const card = "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-6 sm:p-7";
const input =
  "w-full p-3 rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition";
const button =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 disabled:opacity-50 transition";

const fmtBytes = (n) => (n >= 1024 * 1024 ? `${(n / 1048576).toFixed(2)} MB` : `${Math.round(n / 1024)} KB`);

const Notice = ({ kind, children }) =>
  children ? (
    <p className={`mt-3 flex items-start gap-2 text-sm ${kind === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
      {kind === "ok" ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
      <span>{children}</span>
    </p>
  ) : null;

export default function UploadResumePage() {
  const [session, setSession] = useState(null); // null = checking, false = logged out, object = logged in
  const [busy, setBusy] = useState(false);

  // same dark-mode preference as the home page
  useEffect(() => {
    try {
      const dark = localStorage.getItem("theme") === "dark";
      document.documentElement.classList.toggle("dark", dark);
    } catch {}
  }, []);

  const refresh = async () => {
    const d = await fetch("/api/admin/session", { cache: "no-store" }).then((r) => r.json()).catch(() => ({ authed: false }));
    setSession(d.authed ? d : false);
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 sm:py-16 bg-zinc-50 dark:bg-[#0b0713]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl ovo-font">Resume admin</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Whatever u upload here is what the site&apos;s resume button serves.
        </p>

        {session === null && <p className="mt-10 text-sm text-zinc-500">Checking session…</p>}
        {session === false && <Login onDone={refresh} busy={busy} setBusy={setBusy} />}
        {session && <Dashboard session={session} refresh={refresh} busy={busy} setBusy={setBusy} />}
      </div>
    </main>
  );
}

function Login({ onDone, busy, setBusy }) {
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const body = Object.fromEntries(new FormData(e.target));
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setBusy(false);
    if (r.ok) onDone();
    else setErr((await r.json()).error || "Login failed");
  };
  return (
    <form onSubmit={submit} className={`${card} mt-8 space-y-4`}>
      <input className={input} type="email" name="email" placeholder="Email" autoComplete="username" required />
      <input className={input} type="password" name="password" placeholder="Password" autoComplete="current-password" required />
      <button className={button} disabled={busy} type="submit">
        <KeyRound size={15} /> {busy ? "Signing in…" : "Sign in"}
      </button>
      <Notice kind="err">{err}</Notice>
    </form>
  );
}

function Dashboard({ session, refresh, busy, setBusy }) {
  const [upMsg, setUpMsg] = useState({});
  const [pwMsg, setPwMsg] = useState({});
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef(null);

  const upload = async () => {
    if (!file) return;
    setUpMsg({});
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/resume", { method: "POST", body: fd });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) {
      setUpMsg({ ok: `Uploaded ${file.name} (${fmtBytes(d.size)}). Live at /resume now.` });
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      refresh();
    } else setUpMsg({ err: d.error || "Upload failed" });
  };

  const changePw = async (e) => {
    e.preventDefault();
    setPwMsg({});
    const { current, next, confirm } = Object.fromEntries(new FormData(e.target));
    if (next !== confirm) return setPwMsg({ err: "New passwords don't match" });
    setBusy(true);
    const r = await fetch("/api/admin/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current, next }) });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) {
      setPwMsg({ ok: "Password changed." });
      e.target.reset();
    } else setPwMsg({ err: d.error || "Couldn't change password" });
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    refresh();
  };

  const pick = (f) => {
    if (f && f.type === "application/pdf") setFile(f);
    else setUpMsg({ err: "Pick a PDF" });
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          Signed in as <b className="text-zinc-900 dark:text-white">{session.email}</b>
        </span>
        <button onClick={logout} className="inline-flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400">
          <LogOut size={14} /> Sign out
        </button>
      </div>

      {session.storage !== "blob" && (
        <div className="rounded-2xl border border-amber-300/60 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
          Storage isn&apos;t connected yet: <code>BLOB_READ_WRITE_TOKEN</code> is missing, so uploads and password changes will
          fail until a Vercel Blob store is created and its token is added to the env. The site keeps serving the bundled PDF meanwhile.
        </div>
      )}

      <section className={card}>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <FileText size={18} className="text-violet-600 dark:text-violet-400" /> Current resume
        </h2>
        {session.resume ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {fmtBytes(session.resume.size)} · uploaded {new Date(session.resume.uploadedAt).toLocaleString("en-IN")} ·{" "}
            <a href="/resume" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 hover:underline">
              open
            </a>
          </p>
        ) : (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Nothing uploaded yet, the site serves the bundled{" "}
            <a href="/myresume.pdf" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 hover:underline">
              myresume.pdf
            </a>
            .
          </p>
        )}
      </section>

      <section className={card}>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <UploadCloud size={18} className="text-violet-600 dark:text-violet-400" /> Upload new resume
        </h2>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          onClick={() => fileRef.current?.click()}
          className={`mt-4 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center text-sm transition ${
            drag ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10" : "border-zinc-300 dark:border-white/15 hover:border-violet-400"
          }`}
        >
          {file ? (
            <span className="font-medium">{file.name} · {fmtBytes(file.size)}</span>
          ) : (
            <span className="text-zinc-500">Drop a PDF here or click to choose (max 4 MB)</span>
          )}
          <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        </div>
        <button onClick={upload} disabled={!file || busy} className={`${button} mt-4`}>
          <UploadCloud size={15} /> {busy ? "Uploading…" : "Replace resume"}
        </button>
        <Notice kind={upMsg.ok ? "ok" : "err"}>{upMsg.ok || upMsg.err}</Notice>
      </section>

      <form onSubmit={changePw} className={card}>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <KeyRound size={18} className="text-violet-600 dark:text-violet-400" /> Change password
        </h2>
        <div className="mt-4 space-y-3">
          <input className={input} type="password" name="current" placeholder="Current password" autoComplete="current-password" required />
          <input className={input} type="password" name="next" placeholder="New password (8+ chars)" autoComplete="new-password" minLength={8} required />
          <input className={input} type="password" name="confirm" placeholder="Confirm new password" autoComplete="new-password" minLength={8} required />
        </div>
        <button type="submit" disabled={busy} className={`${button} mt-4`}>
          <KeyRound size={15} /> Update password
        </button>
        <Notice kind={pwMsg.ok ? "ok" : "err"}>{pwMsg.ok || pwMsg.err}</Notice>
      </form>
    </div>
  );
}
