"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Send, Github, Linkedin, Code2 } from "lucide-react";
import { links } from "../../../assets/assets";
import SectionHeading from "./SectionHeading";

const inputCls =
  "w-full p-3.5 rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition";

const Contact = () => {
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setResult("");
    const formData = new FormData(event.target);
    formData.append("access_key", "1818bc94-bdab-48a0-a456-65a4c14fefcc");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setResult("Thanks! I'll get back to you soon.");
        event.target.reset();
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch {
      setResult("Network error, please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Hiring for an AI or backend role, or want to talk LLM agents? Drop a message, I usually reply within a day."
      />

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <a href={`mailto:${links.email}`} className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-5 hover:border-violet-400 dark:hover:border-violet-500/60 transition-colors">
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300"><Mail size={18} /></span>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">Email</div>
              <div className="font-medium break-all">{links.email}</div>
            </div>
          </a>
          <a href={`tel:${links.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-5 hover:border-violet-400 dark:hover:border-violet-500/60 transition-colors">
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300"><Phone size={18} /></span>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">Phone</div>
              <div className="font-medium">{links.phone}</div>
            </div>
          </a>
          <div className="flex gap-3 pt-2">
            {[
              [links.github, Github, "GitHub"],
              [links.linkedin, Linkedin, "LinkedIn"],
              [links.leetcode, Code2, "LeetCode"],
            ].map(([href, Icon, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-white/10 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmit}
          className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0a19] p-6 sm:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input className={inputCls} type="text" name="name" placeholder="Your name" required />
            <input className={inputCls} type="email" name="email" placeholder="Your email" required />
          </div>
          <textarea className={inputCls} rows="6" name="message" placeholder="What are you working on?" required />
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm font-medium hover:scale-[1.03] transition-transform disabled:opacity-60 disabled:hover:scale-100"
            >
              {sending ? "Sending…" : "Send message"} <Send size={15} />
            </button>
            {result && <p className="text-sm text-zinc-600 dark:text-zinc-400">{result}</p>}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
