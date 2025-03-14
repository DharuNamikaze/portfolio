"use client"
import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

const Footer = () => {

  <dialog id="form" className="form px-3 py-3 flex flex-col items-center justify-center dark">
    <div className="w-full max-w-md bg-transparent rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Reach</h2>
      <form className="flex flex-col">
        <input placeholder="Full Name" className="bg-transparent text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150" type="text" />
        <input placeholder="Email" className="bg-transparent text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150" type="email" />
        <textarea placeholder="What's on your mind?" className="bg-transparent text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition ease-in-out duration-150" name="cover_letter" defaultValue={""} />
        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">Submit</button>
      </form>
    </div>
  </dialog>

  return (
    <section className='text-[2vh] text-center justify-center dark:bg-transparent bg-white mt-[10vh] '>
      <div className="flex flex-col space-y-5 items-center justify-center dark:bg-transparent bg-white h-[20rem] rounded-2xl w-full">
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
        <button className="flex" onClick={() => { document.getElementById('form')?.showModal()} }>
          Contact
        </button>
      </div>

      <section className="socials flex justify-evenly mb-5 mt-[10vh] bg-transparent">
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
    </section >
  )
}

export default Footer