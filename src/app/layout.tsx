import "./globals.css";
import React from "react";
import { SparklesCore } from "../../components/ui/sparkles";
import ThemeSwitcher from '../../components/ThemeProvider';
import Link from "next/link";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display:'swap', 
});

function randomColor() {
  let hex = "#"
  const range = "50b149c6d2707ef8a"
  for (let i = 0; i < 6; i++) {
    hex += range[Math.floor(Math.random() * 8)];
  }
  return hex
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Dharu&apos;s Portfolio</title>
        <link rel="shortcut icon" href="assets/favicon-min.heif" type="image/x-icon" />
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
        {children}
      </body>
    </html>
  );
}