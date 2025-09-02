"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from './ThemeSwitcher';
import { SparklesCore } from "./ui/sparkles";
import dynamic from 'next/dynamic';

// Dynamic imports for icons
const HiOutlineSparkles = dynamic(() => import("react-icons/hi2").then(mod => ({ default: mod.HiOutlineSparkles })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

const HiSparkles = dynamic(() => import("react-icons/hi2").then(mod => ({ default: mod.HiSparkles })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

function randomColor() {
    let hex = "#";
    const range = "50b149c6d2707ef8a";
    for (let i = 0; i < 6; i++) {     
        hex += range[Math.floor(Math.random() * 8)];
    }
    return hex;
}

export default function Header() {
    const [showSparkles, setShowSparkles] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    // Generate the color only once
    const [sparkleColor] = useState(() => randomColor());

    const handleSparkles = () => {
        setShowSparkles(prev => !prev);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {showSparkles && isMounted && (
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.6}
                    particleDensity={35}
                    particleColor={sparkleColor}
                    className="absolute inset-0 w-full h-full -z-10"
                />
            )}
            <header className="relative flex pt-16 px-10 lg:pt-20 lg:px-20 md:pt-16 md:px-16 sm:px-16 sm:pt-16 justify-between gap-10 font-semibold sm:text-3xl lg:text-4xl text-2xl z-10 mx-auto ">
                <Link href="/">
                    <span>Dharun</span>
                </Link>
                <div className="flex items-center gap-8">
                    <Link href="/blog" className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Blog
                    </Link>
                    <button type="button" title={showSparkles ? "Turn off Sparkles" : "Turn on Sparkles"} onClick={handleSparkles}>
                        {showSparkles ? (
                            <HiSparkles className="w-7 h-7 self-center" />
                        ) : (
                            <HiOutlineSparkles className="w-7 h-7 self-center" />
                        )}
                    </button>
                    <ThemeSwitcher />
                </div>
            </header>
        </>
    );
}
