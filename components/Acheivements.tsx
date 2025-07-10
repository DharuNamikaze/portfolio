import React from "react";
import CountUp from './ui/CountUp';
import Link from "next/link";

const Achievements = () => {
    // const [solvedProblems, setSolvedProblems] = useState<number>(0)
    // useEffect(() => {
    //     const fetchSolvedProblems = async () => {
    //         try {
    //             const response = await fetch("https://alfa-leetcode-api.vercel.app/dharunamikaze/solved"); // Use full API URL
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             console.log('API Response:', data); // Log the response to inspect its structure
    //             setSolvedProblems(data.solved || 0); // Replace 'solved' with the correct property name based on the logged structure
    //         } catch (error) {
    //             console.error('Error fetching data from LeetCode:', error);
    //             setSolvedProblems(0); // Fallback value
    //         }
    //     }
    //     fetchSolvedProblems()
    // }, [])
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
                    to={110} // Now dynamically updates
                    separator=","
                    direction="up"
                    duration={1}
                    className="leet count-up-text text-5xl font-semibold"
                />

                <CountUp
                    from={0}
                    to={358}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-5xl font-semibold"
                />

            </div>
            <br />
            <br />
            <Link
                href={"https://codolio.com/profile/dharu_namikaze"}
                target="_blank"
                className="parent items-center justify-center pb-10 flex"
            >
                Cod<span className="child">olio</span>
            </Link>
            {/* <span className='flex justify-center text-2xl'>DEV</span> */}
            <div className="grid grid-cols-2 text-center mx-[10vh] lg:mx-[42vh] sm:px-8">
                <CountUp
                    from={0}
                    to={97} // Now dynamically updates
                    separator=","
                    direction="up"
                    duration={1}
                    className="leet count-up-text text-5xl font-semibold"
                />
                <CountUp
                    from={0}
                    to={317}
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
