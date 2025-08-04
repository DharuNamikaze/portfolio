'use server'
import React from 'react'
import Link from 'next/link';
import '../src/app/globals.css'
const Projects = () => {

  return (
    <section className='min-h-[43rem] pt-10 pb-10'>
      <span className='text-bold text-3xl mb-5 items-center flex justify-center '>Projects</span>
      <div className="h-screen grid grid-cols-4 px-10 grid-rows-subgrid text-black text-xl 
      max-sm:flex max-sm:flex-col max-sm:p-10 max-sm:space-y-3 gap-2">
        <Link className='p-8 col-span-1 row-span-4 rounded-2xl BentoGrid bg-cover hover:scale-105 ease-in-out duration-500' href="https://github.com/DharuNamikaze/smol-mcp" target='_blank' >
        <span className='relative z-10'>Smol-mcp</span></Link>
        <Link className='p-8 bg-yellow-300 col-span-3 row-span-4 rounded-2xl BentoGrid2 bg-cover hover:scale-105 ease-in-out duration-500 ' href="https://convertify-rho.vercel.app/" target='_blank'>Convertify</Link>
        <Link className='p-8 bg-blue-300 row-span-8 rounded-2xl BentoGrid3 bg-cover hover:scale-105 ease-in-out duration-500' href="https://type-d.vercel.app/" target='_blank'>Typed</Link>
        <Link className='p-8 bg-green-300 col-span-2 row-span-8 rounded-2xl BentoGrid4 bg-cover ease-in-out hover:scale-105 duration-500' href="https://my-odyssey.vercel.app/" target='_blank'>Odyssey</Link>
        <Link className='p-8 bg-violet-500 row-span-8 rounded-2xl BentoGrid5 bg-cover hover:scale-105 ease-in-out duration-500' href="https://github.com/Abinesh-Mathivanan/gitgpt" target='_blank'>Gitgpt</Link>
        <Link className='p-8 bg-purple-600 col-span-2 row-span-3 rounded-2xl BentoGrid6 bg-cover ease-in-out cursor-wait hover:scale-105  duration-500' href="https://github.com/DharuNamikaze/cellsaver" target='_blank'>Cellsaver</Link>
        <Link className='p-8 bg-indigo-500 col-span-2 row-span-3 rounded-2xl BentoGrid7 bg-cover hover:scale-105 ease-in-out duration-500 ' href="https://smart-pick-nu.vercel.app/" target='_blank'>Smartpick</Link>
      </div>
    </section>
  )
}

export default Projects