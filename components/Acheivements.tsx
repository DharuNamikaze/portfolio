import React from 'react'
import CountUp from './ui/CountUp'
const Acheivements = () => {
    return (
        <section className='min-h-[30rem]'>
        <span className='prb text text-3xl pb-20 items-center flex justify-center '>Problems Solved</span>

        <div className='grid grid-cols-4 text-center sm:px-8'>
            <CountUp
                from={0}
                to={101}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-5xl font-semibold"
            />
            <CountUp
                from={0}
                to={256}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-5xl font-semibold"
            />
            
            <CountUp
                from={0}
                to={110}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-5xl font-semibold"
            />
            <CountUp
                from={0}
                to={134}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-5xl font-semibold"
            />
            <span>Leetcode</span> {/* leetcode here  */}
            <span>CodeChef</span>
            <span>Geeks for Geeks</span>
            <span>HackerRank</span>
            </div>

        <div className='items-center flex justify-center pt-16'>Checkout &nbsp;<a href='https://codolio.com/profile/dharu_namikaze' target='_blank' className='parent'> Cod<span className='child'>olio</span></a></div>
            </section>
    )
}

export default Acheivements