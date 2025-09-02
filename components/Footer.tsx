import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FormHandler } from "../components/FormHandler";

const Footer = () => {
  return (
    <section className='text-[2vh] text-center justify-center dark:bg-transparent mt-[10vh] mb-2   '>
      {/* <h1 className="text-bold text-2xl mb-5 underline underline-offset-2 pt-10">Got anything in your mind?</h1> */}
      <div className="flex justify-center pb-10 ">
        <FormHandler />
      </div>
      <section className="socials flex justify-center gap-10 mb-8 bg-transparent  ">
        <Link aria-label="Mail me" href="mailto:dharunamikaze@gmail.com" className="text-2xl">
          <BiLogoGmail />
        </Link>
        <Link aria-label="Linkedin profile" href="https://www.linkedin.com/in/dharunn/" target="_blank" className="text-2xl">
          <FaLinkedin />
        </Link>
        <Link aria-label="Github profile" href="https://github.com/DharuNamikaze/" target="_blank" className="text-2xl">
          <FaGithub />
        </Link>
        <Link aria-label="Instagram" href="https://www.instagram.com/dharu_namikaze/" target="_blank" className="text-2xl">
          <FaInstagram />
        </Link>
      </section>
      <span>&copy; Human Rights Reserved 2025</span>
      {/* {new Date().getFullYear()} */}
    </section>
  )
}

export default Footer;