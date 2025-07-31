import React from 'react'
import FlowingMenu from './ui/FlowingMenu'
const Projects = () => {

  const demoItems = [
    { link: 'https://github.com/DharuNamikaze/smol-mcp', text: 'smol-mcp', image: '' },
    { link: 'https://convertify-rho.vercel.app/', text: 'Convertify', image: '' },
    { link: 'https://my-odyssey.vercel.app/', text: 'Odyssey', image: '' },
    { link: 'https://type-d.vercel.app/', text: 'Typed', image: '' },
    { link: 'https://smart-pick-nu.vercel.app/', text: 'Gitgpt', image: '' }
  ];

  return (
    <section className='min-h-[43rem] pt-10'>
      <span className='text-bold text-3xl mb-5 items-center flex justify-center '>Projects</span>
      <div className="h-[500px] relative">
        <FlowingMenu items={demoItems} />
      </div>

    </section>
  )
}

export default Projects