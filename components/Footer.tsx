'use client'
import React from "react";
import Link from "next/link";
import { FormHandler } from "../components/FormHandler";
import dynamic from 'next/dynamic';

// Dynamic imports for icons
const FaGithub = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaGithub })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

const BiLogoGmail = dynamic(() => import("react-icons/bi").then(mod => ({ default: mod.BiLogoGmail })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

const FaLinkedin = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaLinkedin })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

const FaInstagram = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaInstagram })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

const Footer = () => {
  return (
    <section className='text-[2vh] text-center justify-center dark:bg-transparent mt-[10vh] mb-2   '>
      {/* <h1 className="text-bold text-2xl mb-5 underline underline-offset-2 pt-10">Got anything in your mind?</h1> */}
      <div className="flex justify-center pb-10 ">
        <FormHandler />
      </div>
      <section className="socials flex justify-center gap-10 mb-8 bg-transparent  ">
        <Link href="mailto:dharunamikaze@gmail.com" className="text-2xl">
          <BiLogoGmail />
        </Link>
        <Link href="https://www.linkedin.com/in/dharunn/" target="_blank" className="text-2xl">
          <FaLinkedin />
        </Link>
        <Link href="https://github.com/DharuNamikaze/" target="_blank" className="text-2xl">
          <FaGithub />
        </Link>
        <Link href="https://www.instagram.com/dharu_namikaze/" target="_blank" className="text-2xl">
          <FaInstagram />
        </Link>
      </section>
      <span>&copy; Human Rights Reserved 2025</span>
      {/* {new Date().getFullYear()} */}
    </section>
  )
}

export default Footer;