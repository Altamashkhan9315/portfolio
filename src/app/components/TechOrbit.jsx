"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Bot } from "lucide-react";
import { SiPython, SiFastapi, SiOpenai, SiRedis, SiPostgresql, SiElasticsearch, SiLangchain, SiDocker, SiWhatsapp } from "react-icons/si";

// Orbiting tech stack around an "agent" core, plus a small terminal ticking through real-ish logs.

const rings = [
  {
    r: 80,
    duration: 28,
    dir: 1,
    items: [
      { label: "LangGraph", Icon: SiLangchain },
      { label: "OpenAI", Icon: SiOpenai },
      { label: "Python", Icon: SiPython },
      { label: "FastAPI", Icon: SiFastapi },
    ],
  },
  {
    r: 124,
    duration: 44,
    dir: -1,
    items: [
      { label: "Redis", Icon: SiRedis },
      { label: "Postgres", Icon: SiPostgresql },
      { label: "Elastic", Icon: SiElasticsearch },
      { label: "Docker", Icon: SiDocker },
      { label: "WhatsApp", Icon: SiWhatsapp },
    ],
  },
];

const logs = [
  "POST /chat  200  ·  412 ms",
  "intent → cart.add ×2, info.total",
  "parser: 24 enum shards merged",
  "redis: session lock acquired",
  "es: 5 SKUs matched (0.93)",
  "judge: PASS · 120/120 intents",
  "whatsapp: reply sent (hi-IN)",
];

// typewriter that cycles through the log lines
function Terminal() {
  const [lines, setLines] = useState([]);
  const [typed, setTyped] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const full = logs[idx % logs.length];
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 22 + Math.random() * 30);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((l) => [...l.slice(-2), full]);
      setTyped("");
      setIdx((i) => i + 1);
    }, 900);
    return () => clearTimeout(t);
  }, [typed, idx]);

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-[#0f0a19] text-[11px] font-mono leading-5 px-3.5 py-2.5 shadow-lg">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="w-2 h-2 rounded-full bg-rose-400" />
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="ml-2 text-zinc-500">agent.log</span>
      </div>
      {lines.map((l, i) => (
        <div key={i} className="text-zinc-500 truncate">
          <span className="text-violet-400">›</span> {l}
        </div>
      ))}
      <div className="text-zinc-200 truncate">
        <span className="text-violet-400">›</span> {typed}
        <span className="inline-block w-1.5 h-3 ml-0.5 bg-violet-400 align-middle animate-pulse" />
      </div>
    </div>
  );
}

const TechOrbit = () => {
  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-violet-500/25 to-pink-400/15 blur-3xl" />

      <div className="relative aspect-square">
        {/* rings */}
        {rings.map((ring, ri) => (
          <div key={ri} className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute rounded-full border border-dashed border-violet-300/70 dark:border-violet-500/30"
              style={{ width: ring.r * 2, height: ring.r * 2 }}
            />
            <motion.div
              className="absolute"
              style={{ width: ring.r * 2, height: ring.r * 2 }}
              animate={{ rotate: 360 * ring.dir }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            >
              {ring.items.map((it, i) => {
                const a = (i / ring.items.length) * 2 * Math.PI;
                const x = ring.r + Math.cos(a) * ring.r;
                const y = ring.r + Math.sin(a) * ring.r;
                return (
                  <motion.div
                    key={it.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}
                    animate={{ rotate: -360 * ring.dir }}
                    transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] shadow-md text-[11px] font-medium text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                      <it.Icon className="text-violet-600 dark:text-violet-400" size={12} />
                      {it.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}

        {/* core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-28 h-28 rounded-full bg-violet-500/30 blur-xl"
          />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white flex flex-col items-center justify-center shadow-xl shadow-violet-500/30"
          >
            <Bot size={26} />
            <span className="mt-1 text-[10px] font-semibold tracking-wider uppercase">agent</span>
          </motion.div>
        </div>

        {/* orbiting spark on the outer ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="absolute"
            style={{ width: 248, height: 248 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_12px_3px_rgba(217,70,239,0.7)]" />
          </motion.div>
        </div>
      </div>

      <div className="relative mt-3">
        <Terminal />
      </div>
    </div>
  );
};

export default TechOrbit;
