"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { assets, infoList } from "../../../assets/assets";
import SectionHeading from "./SectionHeading";

const icons = [Briefcase, GraduationCap, Sparkles];

const About = () => {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading eyebrow="Introduction" title="About me" />

      <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-64 sm:w-80 mx-auto"
        >
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-violet-500/40 to-pink-400/30 blur-lg" />
          <Image src={assets.user_image} alt="Altamash Khan" className="relative w-full rounded-3xl object-cover shadow-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            I&apos;m an AI engineer who ships LLM agents end to end: from the LangGraph state machine and
            the structured-output schemas that keep it grounded, to the Redis locks that make concurrent
            chats safe and the evaluation harness that catches regressions before buyers do.
          </p>
          <p className="mt-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            At Mulltiply I own the intent classifier, product parser, cart engine and B2C bot for a
            WhatsApp commerce platform used by FMCG distributors and D2C brands across India. I&apos;m
            comfortable anywhere from an OpenAI schema limit to a Lua script.
          </p>

          <ul className="mt-8 grid sm:grid-cols-3 gap-4">
            {infoList.map(({ title, description }, i) => {
              const Icon = icons[i];
              return (
                <motion.li
                  key={title}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 hover:shadow-lg hover:shadow-violet-500/10 transition-shadow"
                >
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
