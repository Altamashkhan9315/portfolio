import Image from "next/image";
import React from "react";
import { assets } from "../../../assets/assets";
import { motion } from "motion/react"

const Footer = ({isDarkMode}) => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <Image src={isDarkMode? assets.logo_dark: assets.logo} alt="" className="w-36 mx-auto mb-2" />
        <div className="w-max flex items-center gap-2 mx-auto">
          <Image src={isDarkMode? assets.mail_icon_dark: assets.mail_icon} alt="" className="w-6" />
          altamashkhan9315@gmail.com
        </div>
      </div>
      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-2 sm:mx-[10%] mt-12 py-6">
        <p>&copy;2025 Altamash Khan. All right reserved.</p>
        <ul className="flex items-center justify-center gap-10 mt-4 sm:mt-0">
            <li><a target="_blank" href="https://github.com/Altamashkhan9315?tab=repositories">Github</a></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/md-altamash-khan/">LinkedIn</a></li>
            <li><a target="_blank" href="https://leetcode.com/u/altamashkhan9315/">Leetcode</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
