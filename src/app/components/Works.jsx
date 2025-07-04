import React from 'react'
import { assets, workData } from '../../../assets/assets'
import Image from 'next/image'
import { motion } from "motion/react"

const Project = ({isDarkMode}) => {
  return (
    <motion.div 
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:1}}
    id="work" className="w-full px-2 sm:px-12 md:px-[12%] py-10 scroll-mt-20">
      <motion.h4
      initial={{ y:-20,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5,delay:0.3}}
      className="text-center mb-2 text-base sm:text-lg ovo-font ">My portfolio</motion.h4>
      <motion.h2
      initial={{ y:-20,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5,delay:0.5}}
      className="text-center text-3xl sm:text-5xl ovo-font font-bold mb-2">My latest work</motion.h2>
      <motion.p 
      initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:0.5,delay:0.7}}
      className="text-center max-w-2xl mx-auto mt-3 mb-10 sm:mb-12 ovo-font text-sm sm:text-base text-gray-700 dark:text-white">
        Welcome to my web development portfolio! Explore a collection of projects showcasing my expertise in full-stack development.
      </motion.p>
      <motion.div 
      initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:0.6,delay:0.9}}
      className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 my-10'>
        {workData.map((project, index) => (
          <motion.div
          whileHover={{scale:1.05}}
            className='aspect-square bg-no-repeat bg-cover my-4 mx-2 sm:mx-4 md:m-0  bg-center rounded-xl relative cursor-pointer group shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden'
            key={index}
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300 z-0" />
            {/* Info Box */}
            <div className='backdrop-blur-md bg-white/80 w-11/12 rounded-lg absolute bottom-5 left-1/2 -translate-x-1/2 py-4 px-6 flex items-center justify-between duration-300 group-hover:bottom-7 border border-gray-200 shadow-md z-10'>
              <div>
                <h2 className='font-semibold text-base sm:text-lg mb-1 dark:text-black'>{project.title}</h2>
                <p className='text-gray-700 text-xs sm:text-sm'>{project.description}</p>
              </div>
              <div className='border-2 border-rose-400 rounded-full w-10 aspect-square flex items-center justify-center shadow-[2px_2px_0_#f43f5e] bg-white group-hover:bg-rose-200 transition duration-200'>
                <Image src={assets.send_icon} alt="send icon" className="w-5" />
              </div>
            </div>
             
             

          </motion.div>
        ))}
      </motion.div>
      <motion.a 
      initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:0.5,delay:1.1}}
      href="#project" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-[#fcf4ff] duration-300 dark:text-white dark:border-white dark:hover:bg-[#2a004a]'>
                Show more <Image alt='' src={isDarkMode?assets.right_arrow_bold_dark: assets.right_arrow_bold} className='w-4'/>
             </motion.a>
    </motion.div>
  )
}

export default Project
