'use server'
import Link from 'next/link';
import React from 'react';

const Intro = () => {
    return (
        <section className='flex flex-col justify-center text-center items-center min-h-screen sm:px-10 '>
            <span className='font-semibold text-[22px] sm:text-3xl lg:text-5xl'>Mastering the art of problem solving  <br /> through Data Structures and Algorithms</span>
            <span className='block text-sm sm:px-10 px-4 py-4'>Hi, I&apos;m Dharun R currently pursuing Artificial Intelligence and Data Science at KIT-CBE  blending creativity &amp; computation as a developer, building cool things.</span>
            <div className='flex items-center gap-2'>
                <Link href="/DharunR_resume.pdf" target='_blank' className=''>
                    <button type='button' title='Take it!' className="text-lg mt-2 px-3 py-2 rounded-md border dark:border-white dark:bg-white dark:text-black border-white bg-black text-white dark:hover:bg-slate-300  hover:bg-zinc-700 transition duration-300">
                        Resume
                    </button>
                </Link>
            </div>

        </section>
    )
}

export default Intro