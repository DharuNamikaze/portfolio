import React from 'react'
import FlowingMenu from './ui/FlowingMenu'
const Projects = () => {
  const demoItems = [
    { link: 'https://convertify-rho.vercel.app/', text: 'Convertify', image: '' },
    { link: 'https://type-d.vercel.app/', text: 'Typed', image: '' },
    { link: 'https://github.com/DharuNamikaze/smart-pick', text: 'smartpick', image: '' },
    { link: 'https://github.com/DharuNamikaze/codexp', text: 'Codexp', image: '' },
    { link: 'https://github.com/DharuNamikaze/chroniclesofyou', text: 'ChroniclesOfYou', image:''}
  ];

  return (
    <section className='min-h-[43rem]'>
      <span className='text-bold text-3xl mb-5 items-center flex justify-center '>Projects</span>
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div>

    </section>
  )
}

export default Projects