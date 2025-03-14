import React, { useEffect, useState } from 'react';
import CountUp from './ui/CountUp';

const Achievements = () => {
    return (
        <section className="min-h-[30rem]">
            <span className="prb text text-3xl pb-20 items-center flex justify-center">
                What have i done?...
            </span>
            <div className="grid grid-cols-2 text-center sm:px-8">
                <CountUp
                    from={0}
                    to={100} // Now dynamically updates
                    separator=","
                    direction="up"
                    duration={1}
                    className="leet count-up-text text-5xl font-semibold"
                />
                <CountUp
                    from={0}
                    to={134}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-5xl font-semibold"
                />
                <span>Leetcode</span>
                <span>CodeChef</span>
            </div>

            <div className="items-center flex justify-center pt-16">
                Checkout &nbsp;
                <a
                    href="https://codolio.com/profile/dharu_namikaze"
                    target="_blank"
                    className="parent"
                >
                    Cod<span className="child">olio</span>
                </a>
            </div>
        </section>
    );
};

export default Achievements;
