'use client'
import "./globals.css";
import React from "react";
import { SparklesCore } from "../../components/ui/sparkles";
import ThemeSwitcher from '../../components/ThemeProvider';
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomColor = () => {
    let hex = "#"
    const range = "50b249c6d137ef8a"

    for (let i = 0; i < 6; i++) {
      hex += range[Math.floor(Math.random() * 16)];
    }
    return hex
  }

  return (
    <html lang="en">
      <head>
        <title>Dharu&apos;s Portfolio</title>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');`}
        </style>
        <link rel="shortcut icon" href="assets/favicon.svg" type="image/x-icon" />
      </head>
      <body className="relative min-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.6}
          particleDensity={35}
          particleColor={randomColor()}
          className="absolute inset-0 w-full h-full -z-10"
        />

        {/* Header */}
        <header className="relative flex pt-16 px-10 lg:pt-20 lg:px-20 md:pt-16 md:px-16 sm:px-16 sm:pt-16 justify-between gap-10 font-semibold sm:text-3xl lg:text-4xl text-2xl z-10">
          <Link href="/">
            <button>Dharun</button>
          </Link>
          <ThemeSwitcher />
        </header>
        <div id="solved"></div>
        {children}
      </body>
    </html>
  );
}