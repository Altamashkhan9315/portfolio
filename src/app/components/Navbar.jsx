"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { assets, navLinks, links } from "../../../assets/assets";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScroll(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScroll
            ? "bg-white/70 dark:bg-[#0b0713]/70 backdrop-blur-xl border-b border-zinc-200/60 dark:border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <a href="#top" aria-label="Home">
            <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt="Altamash Khan" className="w-24 sm:w-28" priority />
          </a>

          <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsDarkMode((p) => !p)}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-300 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={links.resume}
              download
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              Resume
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-zinc-300 dark:border-white/15"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white dark:bg-[#120b1f] shadow-2xl p-8 flex flex-col gap-6 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="self-end">
            <X size={20} />
          </button>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg ovo-font hover:text-violet-600 dark:hover:text-violet-400"
            >
              {l.label}
            </a>
          ))}
          <a href={links.resume} download className="mt-auto text-center px-5 py-2.5 rounded-full text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            Download resume
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
