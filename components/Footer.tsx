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

export const Contact = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      alert("Oh, Nice try!");
      return;
    }

    formData.append("access_key", "8f8c1a2e-2b4a-4779-80e4-b33fc37a3fc5");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        console.log(result);
        alert("Message Sent. Thank you for reaching out!");
        document.querySelector("form")?.reset();
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="form grid grid-cols-4 gap-4 items-center justify-center text-white dark:bg-transparent" autoComplete="on">
        <input type="text" name="name" placeholder="Name" className="col-span-2 rounded-full p-2" required />
        <input type="email" name="email" placeholder="Email" className="col-span-2 rounded-full p-2" required />
        <textarea name="message" placeholder="Write your thoughts here..." className="col-span-4 rounded-full p-2" required></textarea>
        <div className="col-span-4 flex justify-center">
          <button type="submit" className="text-black dark:text-white">🤝</button>
        </div>
      </form>
    </div>
  );
}

const Footer = () => {
  return (
    <section className='text-[2vh] text-center justify-center dark:bg-transparent bg-white mt-[10vh]'>
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
      </div>
      {/* <h1 className="text-bold text-2xl mb-5 underline underline-offset-2 pt-10">Got anything in your mind?</h1> */}
      <div className="flex justify-center pb-10">
        <Contact />
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

export default Footer;