'use client'
import React from 'react'
import Link from 'next/link'

const Intro = () => {
    return (
        <section className='flex flex-col justify-center text-center items-center min-h-screen sm:px-10 '>
            <span className='font-semibold text-xl sm:text-3xl lg:text-5xl'>Mastering the art of problem solving  <br /> through Data Structures and Algorithms</span>
            <br />
            <span className='block text-sm sm:px-10 px-10 '>Hi, I&apos;m Bro currently pursuing Artificial Intelligence and Data Science at KIT-CBE,  diving deep into solving computational problems</span>
            <Link href="./Dharu_Resume.pdf" target='_blank'>
            <button className="mt-5 px-4 py-2 rounded-md border dark:border-white dark:bg-white border-black dark:text-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-300">
                Resume
            </button>
            </Link>
            

        </section>
    )
}

export default Intro