import "./globals.css";
import React from "react";
import { Inter } from 'next/font/google';
import Header from '../../components/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Dharu&apos;s Portfolio</title>
        <link rel="shortcut icon" href="/assets/favicon-min.heif" type="image/x-icon" />
      </head>
      <body className="relative min-h-screen mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}