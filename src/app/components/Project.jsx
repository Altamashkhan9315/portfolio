"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Bot, FlaskConical, ImageIcon, ShieldCheck, Gift, Map } from "lucide-react";
import { projects } from "../../../assets/assets";
import SectionHeading from "./SectionHeading";

const accents = {
  violet: "from-violet-500 to-fuchsia-500",
  emerald: "from-emerald-500 to-teal-400",
  sky: "from-sky-500 to-indigo-500",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-500 to-pink-500",
  teal: "from-teal-500 to-cyan-400",
};

const icons = [Bot, FlaskConical, ImageIcon, ShieldCheck, Gift, Map];

const Card = ({ p, i }) => {
  const Icon = icons[i] ?? Bot;
  const grad = accents[p.accent] ?? accents.violet;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-shadow ${
        p.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
      }`}
    >
      {p.image ? (
        <div className="relative h-44 overflow-hidden">
          <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ) : (
        <div className={`relative h-44 bg-gradient-to-br ${grad} overflow-hidden`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />
          <Icon className="absolute right-5 bottom-5 text-white/90 group-hover:scale-110 transition-transform duration-500" size={56} strokeWidth={1.4} />
          {p.featured && (
            <span className="absolute left-4 top-4 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/20 text-white backdrop-blur">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-violet-700 dark:text-violet-300">{p.tagline}</p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{p.description}</p>

        {p.highlights && (
          <ul className="mt-4 space-y-1.5">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">
              {s}
            </span>
          ))}
        </div>

        {(p.live || p.github) && (
          <div className="mt-5 flex items-center gap-4 text-sm font-medium">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400">
                Live <ArrowUpRight size={14} />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400">
                <Github size={14} /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

const Project = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="Production agents and services from work, plus the full-stack projects that got me here. Work projects are in private repos; happy to walk through them on a call."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
};

export default Project;
