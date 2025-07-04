"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '../../../assets/assets'
import { motion } from "motion/react"

const Contact = ({isDarkMode}) => {

     const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "1818bc94-bdab-48a0-a456-65a4c14fefcc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <motion.div 
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:1}}
    id="contact" className="w-full px-4 sm:px-12 py-10 scroll-mt-20  bg-no-repeat bg-center  bg-[length:90%_auto]" style={{ backgroundImage:isDarkMode?"": ` url(/footer-bg-color.png)` }}>
      <motion.h4 
      initial={{ y:-20,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5,delay:0.3}}
      className="text-center mb-2 text-base sm:text-lg ovo-font ">Connect with me</motion.h4>
      <motion.h2 
      initial={{ y:-20,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5,delay:0.5}}
      className="text-center text-3xl sm:text-5xl ovo-font font-bold mb-2">Get in touch</motion.h2>
      <motion.p
      initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:0.5,delay:0.7}}
      className="text-center max-w-2xl mx-auto mt-3 mb-10 sm:mb-12 ovo-font text-sm sm:text-base text-gray-700 dark:text-white">
        I'd love to hear from you! If you have any questions, comments, or feedback, please use the form below. 
      </motion.p>

      <motion.form
      initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:0.5,delay:0.9}}
      onSubmit={onSubmit} className='max-w-2xl mx-auto'>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-6 mt-10 mb-8'>
            <motion.input 
            initial={{ x:-50,opacity:0 }}
      whileInView={{x:0,opacity:1}}
      transition={{duration:0.6,delay:1.1}}
            className='flex-1 p-3 outline-border border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-[#2a004a]/30 dark:border-white/90' type="text" placeholder='Enter your name' name='name' required/>
            <motion.input 
            initial={{ x:50,opacity:0 }}
      whileInView={{x:0,opacity:1}}
      transition={{duration:0.6,delay:1.2}}
            className='flex-1 p-3 outline-border border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-[#2a004a]/30 dark:border-white/90' type="email" placeholder='Enter your email' name='email' required/>
        </div>
        <motion.textarea
        initial={{ y:100,opacity:0 }}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.6,delay:1.3}}
        className='w-full p-4 outline-border border-[0.5px] border-gray-400 rounded-md bg-white mb-6 dark:bg-[#2a004a]/30 dark:border-white/90' rows='6' placeholder='Enter your message' name='message' required></motion.textarea>
        <motion.button
        whileHover={{scale:1.05}}
        type='submit' className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border dark:border-white dark:text-white dark:hover:bg-[#2a004a]'>Submit now <Image src={assets.right_arrow_white} alt='' className='w-4' /> </motion.button>
      </motion.form>

    </motion.div>
  )
}

export default Contact
