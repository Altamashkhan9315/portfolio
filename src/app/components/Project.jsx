"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { assets, Projects } from "../../../assets/assets";
import WorkSliderBtns from "./WorkSliderBtns";

const Work = ({ isDarkMode }) => {
  const [project, setProject] = useState(Projects[0]);

  const handleSlideChange = (swiper) => {
    const currIndex = swiper.activeIndex;
    setProject(Projects[currIndex]);
  };

  return (
    <motion.section 
    id="project"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5, ease: "easeIn" }}
      className="flex flex-col w-full sm:px-12 justify-center py-12 xl:px-0"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-base sm:text-lg ovo-font "
      >
        My portfolio
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-3xl sm:text-5xl ovo-font font-bold mb-2"
      >
        My latest work
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mt-3 mb-10 sm:mb-12 ovo-font text-sm sm:text-base text-gray-700 dark:text-white"
      >
        Welcome to my web development portfolio! Explore a collection of
        projects showcasing my expertise in full-stack development.
      </motion.p>
      <div className="w-full max-w-screen-lg px-2 sm:px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[30px]">
          <div className="w-full lg:w-[50%] lg:h-[460px] flex flex-col lg:justify-between order-2 lg:order-none">
            <div className="flex flex-col gap-[15px]">
              {/* Outline num */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-8xl leading-none "
              >
                {project.num}
              </motion.div> */}
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.5 }}
                className="text-[42px] font-bold leading-none ovo-font"
              >
                {project.title} 
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.5 }}
                className="dark:text-white/60"
              >
                {project.description}
              </motion.p>
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="flex gap-4"
              >
                {project.stack.map((item, index) => {
                  return (
                    <motion.li
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="text-xl "
                      key={index}
                    >
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </motion.li>
                  );
                })}
              </motion.ul>
              <div className="border border-black dark:border-white/20"></div>
              <div className="flex items-center gap-4">
                <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className=" mt-2 w-[70px] h-[70px] rounded-full bg-transparent border border-black dark:bg-white/5 flex justify-center items-center group transition-colors duration-300">
                        <BsArrowUpRight className="dark:text-white text-3xl dark:group-hover:text-purple-900 transition-colors duration-300" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className=" mt-2 w-[70px] h-[70px] rounded-full bg-transparent border border-black dark:bg-white/5 flex justify-center items-center group transition-colors duration-300">
                        <BsGithub className="dark:text-white text-3xl dark:group-hover:text-purple-900 transition-colors duration-300" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="h-60 sm:h-80 md:h-[460px] lg:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {Projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full rounded-[10px]">
                    <div className="h-[460px] relative group flex justify-center items-center">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full rounded-[10px]">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover rounded-[10px]"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] lg:bottom-0 z-20 w-full justify-between lg:w-max lg:justify-none"
                btnStyles="text-white bg-black dark:bg-purple-900 text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
