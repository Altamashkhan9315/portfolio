import Image from "next/image";
import { assets, links, navLinks } from "../../../assets/assets";

const Footer = ({ isDarkMode }) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt="Altamash Khan" className="w-28" />
          <a href={`mailto:${links.email}`} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400">
            {links.email}
          </a>
        </div>

        <ul className="flex flex-wrap justify-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
          {navLinks.slice(1).map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-violet-600 dark:hover:text-violet-400">{l.label}</a>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-5 text-sm font-medium">
          <li><a target="_blank" rel="noopener noreferrer" href={links.github} className="hover:text-violet-600 dark:hover:text-violet-400">GitHub</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href={links.linkedin} className="hover:text-violet-600 dark:hover:text-violet-400">LinkedIn</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href={links.leetcode} className="hover:text-violet-600 dark:hover:text-violet-400">LeetCode</a></li>
        </ul>
      </div>
      <div className="border-t border-zinc-200 dark:border-white/10 py-4 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Altamash Khan. Built with Next.js.
      </div>
    </footer>
  );
};

export default Footer;
