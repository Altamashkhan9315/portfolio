"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Check } from "lucide-react";

// one loop of the demo: which step is active and how long it stays
const timeline = [
  { step: 0, ms: 700 },   // empty
  { step: 1, ms: 1400 },  // user message
  { step: 2, ms: 550 },   // context
  { step: 3, ms: 550 },   // router
  { step: 4, ms: 650 },   // parser
  { step: 5, ms: 650 },   // executor
  { step: 6, ms: 4200 },  // reply
];

const nodes = [
  { id: "context", label: "context", step: 2, x: 8, y: 14 },
  { id: "router", label: "router", step: 3, x: 50, y: 6 },
  { id: "parser", label: "parser", step: 4, x: 90, y: 22 },
  { id: "executor", label: "executor", step: 5, x: 74, y: 62 },
  { id: "reply", label: "reply", step: 6, x: 26, y: 70 },
];

const edges = [
  ["context", "router"],
  ["router", "parser"],
  ["parser", "executor"],
  ["executor", "reply"],
];

const intents = ["cart.add ×2", "info.total"];

const HeroVisual = () => {
  const [i, setI] = useState(0);
  const step = timeline[i].step;

  useEffect(() => {
    const t = setTimeout(() => setI((p) => (p + 1) % timeline.length), timeline[i].ms);
    return () => clearTimeout(t);
  }, [i]);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full max-w-[380px] mx-auto aspect-[4/5]">
      {/* agent graph, behind the phone */}
      <div className="absolute -inset-x-6 -top-4 h-[46%] sm:-inset-x-10">
        <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
          {edges.map(([a, b]) => {
            const A = byId[a], B = byId[b];
            const active = step >= B.step;
            return (
              <motion.line
                key={a + b}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="currentColor"
                strokeWidth="0.6"
                className={active ? "text-violet-500" : "text-zinc-300 dark:text-white/15"}
                strokeDasharray="2 1.5"
                animate={{ strokeDashoffset: active ? [0, -7] : 0 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            );
          })}
          {nodes.map((n) => {
            const active = step === n.step || (n.step === 6 && step === 6);
            const done = step > n.step;
            return (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                {active && (
                  <motion.circle
                    r="4"
                    className="fill-violet-500/30"
                    initial={{ scale: 0.6, opacity: 0.8 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.1 }}
                  />
                )}
                <circle
                  r="3.2"
                  className={
                    active
                      ? "fill-violet-600"
                      : done
                      ? "fill-violet-400/70"
                      : "fill-zinc-200 dark:fill-white/10"
                  }
                />
                <text
                  y="8.5"
                  textAnchor="middle"
                  className={`text-[4.2px] font-medium ${active ? "fill-violet-700 dark:fill-violet-300" : "fill-zinc-500 dark:fill-zinc-400"}`}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* chat card */}
      <div className="absolute inset-x-0 bottom-0 top-[30%] rounded-[28px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] shadow-2xl shadow-violet-500/10 overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03]">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center">
            <Bot size={18} />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Mulltiply Assistant</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> online · WhatsApp
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 text-[13px] bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_60%)]">
          <AnimatePresence mode="popLayout">
            {step >= 1 && (
              <motion.div
                key="user"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-emerald-500 text-white px-3.5 py-2.5 shadow-sm"
              >
                5 parle-g aur 2 bisleri add karo, total batao
              </motion.div>
            )}

            {step >= 2 && step <= 5 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="max-w-[85%] rounded-2xl rounded-bl-md bg-zinc-100 dark:bg-white/10 px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-300"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {["", "", "loading context", "routing intent", "parsing against catalog", "executing cart actions"][step]}
                  </span>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="reply"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-[88%] space-y-2"
              >
                <div className="rounded-2xl rounded-bl-md bg-zinc-100 dark:bg-white/10 px-3.5 py-2.5 leading-relaxed">
                  Added <b>5× Parle-G</b> (₹50) and <b>2× Bisleri 1L</b> (₹40).
                  <br />
                  Cart total: <b>₹90</b>
                  <Check size={13} className="inline ml-1 text-emerald-500" />
                </div>
                <div className="flex flex-wrap gap-1.5 pl-1">
                  {intents.map((t, k) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + k * 0.15 }}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-3 border-t border-zinc-100 dark:border-white/10">
          <div className="h-9 rounded-full bg-zinc-100 dark:bg-white/5 px-4 flex items-center text-xs text-zinc-400">
            Type a message…
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
