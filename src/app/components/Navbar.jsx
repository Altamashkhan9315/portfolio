"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assets } from "../../../assets/assets";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {

  const [isScroll , setIsScroll] = useState(false)

  const sideMenuRef = useRef();

  const openMenu = ()=>{
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }

  const closeMenu = ()=>{
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  useEffect(()=>{
    window.addEventListener("scroll",()=>{
        if(scrollY > 50){
           setIsScroll(true)
        }else{
           setIsScroll(false)
        }
    })
  })

  return (
    <>
    <div className=" absolute fixed pt-8  top-0 right-0 w-full -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full"/>
    </div>
      <nav className={` absolute fixed pt-8 top-0 left-0 w-full flex items-center px-4 sm:px-12 xl:px-[5%] py-4 justify-between z-50 lg:px-8 ${isScroll?"bg-white-0.5 backdrop-blur-lg shadow-sm dark:shadow-white/20":""}`}>
        <a href="#top">
          <Image
            src={isDarkMode?assets.logo_dark: assets.logo}
            alt=""
            className="w-28 cursor-pointer mr-14"
          />
        </a>
        <ul className={`hidden md:flex items-center justify-between gap-6 lg:gap-8 rounded-full px-12 py-3  ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 backdrop-blur-lg dark:bg-transparent dark:border dark:border-white/50"}`}>
          <li>
            <a className="ovo-font " href="#top">Home</a>
          </li>
          <li>
            <a className="ovo-font" href="#about">About me</a>
          </li>
          <li>
            <a className="ovo-font" href="#skills">Skills</a>
          </li>
          <li>
            <a className="ovo-font" href="#project">Project</a>
          </li>
          <li>
            <a className="ovo-font" href="#contact">Contact me</a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode((prev) => !prev)}>
            <Image src={isDarkMode?assets.sun_icon: assets.moon_icon} alt="" className="w-6"/>
          </button>
          <a
            href="#contact"
            className=" ovo-font hidden lg:flex items-center px-10 py-2.5 gap-3 border border-gray-500 rounded-full ml-4 dark:border-white/50"
          >
            {" "}
            Contact me <Image alt="" src={isDarkMode?assets.arrow_icon_dark: assets.arrow_icon} className="w-3" />
          </a>
          <button onClick={openMenu} className="block md:hidden ml-3">
            <Image src={isDarkMode? assets.menu_white: assets.menu_black} alt="" className="w-6"/>
          </button>
        </div>

        {/*---mobile menu---*/}

        <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-[#11001f]">
             
           <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image src={ isDarkMode?assets.close_white: assets.close_black} alt="" className="w-5 cursor-pointer" />
           </div>

          <li>
            <a onClick={closeMenu} className="ovo-font" href="#top">Home</a>
          </li>
          <li>
            <a onClick={closeMenu} className="ovo-font" href="#about">About me</a>
          </li>
          <li>
            <a onClick={closeMenu} className="ovo-font" href="#skills">Skills</a>
          </li>
          <li>
            <a onClick={closeMenu} className="ovo-font" href="#project">Project</a>
          </li>
          <li>
            <a onClick={closeMenu} className="ovo-font" href="#contact">Contact me</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
