"use client"
import Image from "next/image";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Project from "./components/Project";

export default function Home() {

  const [isDarkMode , setIsDarkMode] =useState(false);

  useEffect(()=>{
    if(localStorage.getItem("theme") === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme:dark)').matches)){
      setIsDarkMode(true);
    }else{
      setIsDarkMode(false);
    }
  },[])

  useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "");
    }
  },[isDarkMode])

  return (
    <>
  <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
   <Header isDarkMode={isDarkMode} />
   <About isDarkMode={isDarkMode}/>
   <Skills isDarkMode={isDarkMode}/>
   <Project isDarkMode={isDarkMode}/>
   <Contact isDarkMode={isDarkMode}/>
   <Footer isDarkMode={isDarkMode}/>
   
   </>
  )
}
