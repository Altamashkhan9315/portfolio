"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <main id="top">
        <Header />
        <About />
        <Experience />
        <Project />
        <Skills />
        <Contact />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}
