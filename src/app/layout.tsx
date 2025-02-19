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
  return (
    <html lang="en">
      <head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');`}
        </style>
      </head>
      <body className="relative min-h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.6}
            particleDensity={35}
            particleColor="#ffffff"
            className="absolute inset-0 w-full h-full -z-10"
          />

        {/* Header */}
        <header className="relative flex pt-16 px-10 lg:pt-20 lg:px-20 md:pt-16 md:px-16 sm:px-16 sm:pt-16 justify-between gap-10 font-semibold sm:text-3xl lg:text-4xl text-2xl z-10">
          <Link href="/">
            <button>Dharun</button>
          </Link>
          <ThemeSwitcher />
        </header>
        {children}
      </body>
    </html>
  );
}