"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { assets, links } from "../../../assets/assets";
import HeroVisual from "./HeroVisual";
import StatTiles from "./StatTiles";
import useGithubStats from "../hooks/useGithubStats";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const Header = () => {
  const { values, live } = useGithubStats();
  const commitsLabel = `${values.commits.toLocaleString("en-IN")}${live.commits ? "" : "+"}`;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-violet-300/30 dark:bg-violet-600/20 blur-3xl" />
        <div className="absolute top-40 -right-24 w-80 h-80 rounded-full bg-pink-200/40 dark:bg-fuchsia-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-xs font-medium text-violet-700 dark:text-violet-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            AI Engineer at Mulltiply · open to opportunities
          </motion.div>

          <motion.h2 {...fade(0.1)} className="mt-6 flex items-center gap-2 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
            Hi, I&apos;m <span className="font-semibold text-zinc-900 dark:text-white">Altamash Khan</span>
            <Image src={assets.hand_icon} alt="" className="w-6 animate-wave" />
          </motion.h2>

          <motion.h1 {...fade(0.2)} className="mt-3 text-4xl sm:text-5xl lg:text-6xl ovo-font leading-[1.1]">
            I build production{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              LLM agents
            </span>{" "}
            for WhatsApp commerce.
          </motion.h1>

          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            LangGraph orchestration, catalog-constrained structured outputs, RAG, and the evaluation
            harness that keeps them honest. Top contributor to a multi-bot Python/FastAPI platform
            with {commitsLabel} commits in {values.months} months.
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:scale-[1.03] transition-transform shadow-lg shadow-zinc-900/10 dark:shadow-none"
            >
              See my work <ArrowRight size={16} />
            </a>
            <a
              href={links.resume}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-300 dark:border-white/20 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            >
              <Download size={16} /> Resume
            </a>
            <div className="flex items-center gap-2 sm:ml-2">
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-11 h-11 rounded-full border border-zinc-300 dark:border-white/20 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
                <Github size={18} />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-zinc-300 dark:border-white/20 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 90 }}
          className="relative w-full mt-6 md:mt-0"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* live stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
        <motion.div {...fade(0.5)} className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">
            By the numbers
          </span>
          <span className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
          <span className="text-[11px] text-zinc-400">green dot = pulled live from GitHub</span>
        </motion.div>
        <StatTiles />
      </div>

      <style jsx global>{`
        .animate-wave { animation: wave 1.8s infinite; transform-origin: 70% 70%; }
        @keyframes wave {
          0% { transform: rotate(0deg); } 10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); } 30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); } 50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); } 100% { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default Header;
