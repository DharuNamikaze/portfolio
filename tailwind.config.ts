import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
            translate: {
              '101': '101%',
            },
            keyframes: {
              marquee: {
                'from': { transform: 'translateX(0%)' },
                'to': { transform: 'translateX(-50%)' }
              }
            },
            animation: {
              marquee: 'marquee 15s linear infinite'
            }
          }
        },
  plugins: [],
} satisfies Config;
