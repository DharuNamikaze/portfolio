"use client"
import React from "react";
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

      <span>&copy; All Rights Reserved</span>
      <span>{" "} {new Date().getFullYear()}</span>
      <br />
      <br />
    </section>
  )
}

export default Footer