import React from "react";
import { motion } from "motion/react";

const skillIcons = [
  // Full-stack web development (Globe/Laptop)
  (
    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 mb-6">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    </span>
  ),
  // DSA (Code Brackets)
  (
    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 mb-6">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    </span>
  ),
  // CS Core Fundamentals (Brain)
  (
    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 mb-6">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 8A2.5 2.5 0 0 0 13 5.5V5a2 2 0 1 0-4 0v.5A2.5 2.5 0 0 0 6.5 8"/><path d="M8 8v8"/><path d="M16 8v8"/><path d="M9 16a2 2 0 1 1-4 0V8a2 2 0 1 1 4 0"/><path d="M15 16a2 2 0 1 0 4 0V8a2 2 0 1 0-4 0"/></svg>
    </span>
  ),
  // Git, GitHub & Deployment (GitHub Logo)
  (
    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 mb-6">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
    </span>
  ),
];

const skillData = [
  {
    title: 'Full-stack web development',
    description: 'Web development using MERN stack — building scalable and performant web applications with clean UI and powerful backend.',
    link: '',
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Strong problem-solving skills using DSA in Java. Solved 200+ problems on platforms like Leetcode & GeeksforGeeks.',
    link: '',
  },
  {
    title: 'CS Core Fundamentals',
    description: 'Solid understanding of Operating Systems, DBMS, CN, and OOPs concepts — essential for software development and interviews.',
    link: '',
  },
  {
    title: 'Git, GitHub & Deployment',
    description: 'Hands-on experience with Git, GitHub. Skilled in deploying full-stack apps on Vercel and Render.',
    link: '',
  },
];

const Skills = ({isDarkMode}) => {
  return (
    <motion.div
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:1}}
      id="skills" className="w-full px-4 sm:px-12 py-10 scroll-mt-20">
      <motion.h4 
        initial={{ y:-20,opacity:0 }}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.5,delay:0.3}}
        className="text-center mb-2 text-lg ovo-font">What I offer</motion.h4>
      <motion.h2
        initial={{ y:-20,opacity:0 }}
        whileInView={{y:0,opacity:1}}
        transition={{duration:0.5,delay:0.5}}
        className="text-center text-5xl ovo-font"> Skills and Expertise</motion.h2>
      <motion.p 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.5,delay:0.7}}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 ovo-font">
        Full-stack web developer specializing in the MERN stack. I craft
        responsive, user-focused web applications that combine clean design with
        robust functionality.
      </motion.p>
      <motion.div
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.6,delay:0.9}}
        className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 my-10">
        {skillData.map(({title,description,link},index)=>(
          <motion.div
            whileHover={{scale:1.05}}
            key={index} className="border border-gray-400 rounded-lg px-8 py-12 hover:-translate-y-1 hover:scale-105 cursor-pointer hover:bg-[#fcf4ff] transition-transform duration-300 hover:shadow-[0_4px_4px_rgba(0,0,0,0.3)] dark:hover:shadow-white/10 dark:hover:bg-[#2a004a]/50">
            {skillIcons[index]}
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">{description}</p>
            <a href={link} className="flex items-center gap-2 text-sm mt-5">
              Read more <svg className="w-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;
