"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { GitCommitHorizontal, PieChart, Code2, Rocket } from "lucide-react";
import useGithubStats from "../hooks/useGithubStats";

const compact = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`);

// Counts from 0 to `value` once the tile is in view and the live fetch has settled.
const CountUp = ({ value, format, ready }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !ready) return;
    const from = n;
    const start = performance.now();
    const dur = 1100;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, ready, value]);

  return (
    <span ref={ref} className={ready ? "" : "inline-block h-[1em] w-16 rounded-md bg-zinc-200 dark:bg-white/10 animate-pulse align-middle"}>
      {ready ? format(n) : ""}
    </span>
  );
};

const StatTiles = () => {
  const { values: v, live, loaded } = useGithubStats();

  const tiles = [
    {
      key: "commits",
      icon: GitCommitHorizontal,
      value: v.commits,
      format: (n) => `${n.toLocaleString("en-IN")}${live.commits ? "" : "+"}`,
      label: "commits on production",
      sub: "mulltiply-chatbot",
    },
    {
      key: "sharePct",
      icon: PieChart,
      value: v.sharePct,
      format: (n) => `${n}%`,
      label: "of all repo commits",
      sub: "top contributor",
    },
    {
      key: "linesAdded",
      icon: Code2,
      value: v.linesAdded,
      format: (n) => `+${compact(n)}`,
      label: "lines of code added",
      sub: "default branch, excl. merges",
    },
    {
      key: "months",
      icon: Rocket,
      value: v.months,
      format: (n) => `${n}`,
      label: "months shipping at Mulltiply",
      sub: "Nov 2025 – present",
      live: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {tiles.map((t, i) => {
        const Icon = t.icon;
        const isLive = t.live || live[t.key];
        return (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.07 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-4 sm:p-5 hover:shadow-lg hover:shadow-violet-500/10 transition-shadow"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/15 to-fuchsia-500/5 blur-2xl group-hover:from-violet-500/25 transition-colors" />

            <div className="flex items-center justify-between">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300">
                <Icon size={15} />
              </span>
              {isLive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400" title="Pulled live">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> live
                </span>
              )}
            </div>

            <div className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent tabular-nums">
              <CountUp value={t.value} format={t.format} ready={loaded} />
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">{t.label}</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-500 truncate">{t.sub}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatTiles;
