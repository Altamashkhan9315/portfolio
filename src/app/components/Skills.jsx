"use client";
import { motion } from "motion/react";
import { Brain, FlaskConical, Server, Database } from "lucide-react";
import { skillGroups } from "../../../assets/assets";
import SectionHeading from "./SectionHeading";

const icons = [Brain, FlaskConical, Server, Database];

const Skills = () => {
  return (
    <section id="skills" className="scroll-mt-20 py-20 sm:py-28 bg-zinc-50 dark:bg-white/[0.02] border-y border-zinc-200/70 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="The stack behind the agents: from model APIs and orchestration to the databases and infra they run on."
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((g, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="px-3 py-1.5 rounded-full text-sm border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:border-violet-400 dark:hover:border-violet-500/60 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
