import CountUp from './ui/CountUp';

const Achievements = () => {
    return (
        <section className="min-h-[30rem]">
            <span className="prb text text-3xl pb-10 items-center flex justify-center">
                Current Streak
            </span>
            {/* <span className='flex justify-center text-2xl'>DSA</span> */}
            <div className="grid grid-cols-2 text-center mx-[10vh] lg:mx-[42vh] sm:px-8">


                <span>Active Days</span>
                <span>Problems Solved</span>

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
                    to={223}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-5xl font-semibold"
                />

            </div>
            <br />
            <br />
            <a
                href="https://codolio.com/profile/dharu_namikaze"
                target="_blank"
                className="parent items-center flex justify-center pb-10"
            >
                Cod<span className="child">olio</span>
            </a>
            {/* <span className='flex justify-center text-2xl'>DEV</span> */}
            <div className="grid grid-cols-2 text-center mx-[10vh] lg:mx-[42vh] sm:px-8">
                <CountUp
                    from={0}
                    to={53} // Now dynamically updates
                    separator=","
                    direction="up"
                    duration={1}
                    className="leet count-up-text text-5xl font-semibold"
                />
                <CountUp
                    from={0}
                    to={138}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-5xl font-semibold"
                />
                <span>Active Days</span>
                <span>Contribution</span>
            </div>
        </section>
    );
};

export default Achievements;
