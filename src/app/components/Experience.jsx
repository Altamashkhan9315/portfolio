"use client";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { experience } from "../../../assets/assets";
import SectionHeading from "./SectionHeading";

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28 bg-zinc-50 dark:bg-white/[0.02] border-y border-zinc-200/70 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Production systems, real users, and the numbers to show for it."
        />

        <div className="relative">
          <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500 via-zinc-300 dark:via-white/15 to-transparent" />

          <ol className="space-y-12">
            {experience.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                <span className="absolute left-[9px] sm:left-[13px] top-2 w-3.5 h-3.5 rounded-full bg-violet-600 ring-4 ring-white dark:ring-[#0b0713]" />

                <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold">{job.role}</h3>
                      <p className="mt-1 text-violet-700 dark:text-violet-300 font-medium">{job.company}</p>
                    </div>
                    <div className="text-right text-sm text-zinc-500 dark:text-zinc-400">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300">{job.period}</div>
                      <div className="inline-flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> {job.location}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{job.summary}</p>

                  <ul className="mt-5 space-y-3">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
