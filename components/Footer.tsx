"use client"
import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

const Footer = () => {

  return (
    <section className='text-[2vh] text-center justify-center dark:bg-transparent bg-white  '>
      <div className="flex items-center justify-center dark:bg-transparent bg-white h-[20rem] rounded-2xl w-full">
        <TextRevealCard
          text="You know the business"
          revealText="I know the chemistry"
        >
          <TextRevealCardTitle>
            Sometimes, you just need to see it.
          </TextRevealCardTitle>
          <TextRevealCardDescription>
            {""}
          </TextRevealCardDescription>
        </TextRevealCard>
      </div>
      <section className="socials flex justify-evenly mb-5 bg-transparent">
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
             
      <span>&copy; All Rights Reserved</span>
      <span>{" "} {new Date().getFullYear()}</span>
      <br />
      <br />
    </section>
  )
}

export default Footer