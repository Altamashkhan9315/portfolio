"use client"
import Image from "next/image";
import React from "react";
import { assets } from "../../../assets/assets";
import { motion } from "motion/react"

const Header = ({isDarkMode}) => {
  return (
    <div
    
    className={`relative w-full flex flex-col md:flex-row items-center justify-between pt-24 md:pt-16 w-full md:mx-auto md:h-screen sm:text-center  px-4 sm:px-12 md:px-12 ${isDarkMode?"":"bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden"} `}>
      {/* Decorative background shape */}
      <div className="absolute -top-20 -left-20 w-60 h-60 sm:w-72 sm:h-72 bg-rose-100 rounded-full opacity-30 blur-2xl z-0 dark:hidden" />
      <div className="absolute -bottom-24 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-pink-100 rounded-full opacity-20 blur-2xl z-0 dark:hidden" />
      {/* Profile Image */}
      <motion.div 
      initial={{ scale: 0 }}
      whileInView={{scale:1}}
      transition={{duration:0.8,type:'spring',stiffness:100}}
      className="relative w-full flex justify-center md:justify-end mt-0 md:mt-0 md:order-2 z-10 mx-auto md:mx-0 md:pr-20">
        <Image src={assets.profile_img} alt="" className="rounded-full w-40 h-40 sm:w-40 sm:h-40 md:w-85 md:h-85 border-2 border-rose shadow-xl transition-transform duration-300 hover:scale-105" />
      </motion.div>
      {/* Text Section */}
      <div className="flex flex-col items-center md:items-start md:text-left sm:items-center sm:pt-8 sm:text-center  md:-mt-12 z-10">
        <motion.h2
        initial={{ y:-20,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.8,delay:0.3}}
        
        className="flex items-center gap-2 text-lg sm:text-xl md:mt-0 mt-5 md:text-2xl mb-3 ovo-font ">
          Hi! I'm <span className="font-bold">Altamash Khan</span>{" "}
          <span className="inline-block animate-wave ">
            <Image src={assets.hand_icon} alt="" className="w-6" />
          </span>
        </motion.h2>
        <motion.h1 
        initial={{ y:-30,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.8,delay:0.5}}
        className="text-lg sm:text-3xl md:text-4xl lg:text-[52px] ovo-font font-bold">Full-Stack developer based in India.</motion.h1>
        <motion.p 
        initial={{ opacity:0 }}
      whileInView={{opacity:1}}
      transition={{duration:0.6,delay:0.7}}
        className="max-w-xl mx-8 md:mx-0 ovo-font mt-4 text-xs sm:text-sm md:text-base text-gray-700 dark:text-white">BTech Computer Science student and freelance full-stack developer, crafting modern and scalable web applications with the MERN stack or NextJs.</motion.p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full justify-center md:justify-start">
          <motion.a 
          initial={{ y:30,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5,delay:1}}
          href="#contact" className="px-8 py-3 rounded-full bg-black text-white flex items-center gap-2 text-sm sm:text-base shadow-md transition-all duration-200 hover:scale-105 dark:bg-transparent dark:border dark:border-white/50">contact me <Image src={assets.right_arrow_white} alt="" className="w-4"/></motion.a>
          <motion.a 
          initial={{ y:30,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.7,delay:1.2}}
          href="/myresume.pdf" download className="px-8 py-3 border rounded-full border-gray-500 flex items-center gap-2 text-sm sm:text-base bg-white shadow-md transition-all duration-200 hover:scale-105 dark:text-black">my resume <Image src={assets.download_icon} alt="" className="w-4"/></motion.a>
        </div>
      </div>
      {/* Hand wave animation keyframes */}
      <style jsx>{`
        .animate-wave {
          animation: wave 1.8s infinite;
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Header;
