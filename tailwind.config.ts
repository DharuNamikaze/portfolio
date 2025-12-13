
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      screens: {
        xs: '480px',
      },
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
        typography: {
          DEFAULT: {
            css: {
              color: '#333',
              a: {
                color: '#3182ce',
                '&:hover': {
                  color: '#2c5282',
                },
              },
              'h1,h2,h3,h4': {
                fontWeight: '700',
                marginTop: '1.5em',
                marginBottom: '0.75em',
              },
              pre: {
                backgroundColor: '#f7fafc',
                color: '#1a202c',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginTop: '1rem',
                marginBottom: '1rem',
              },
              code: {
                color: '#dd1144',
                backgroundColor: '#f7fafc',
                padding: '0.2em 0.4em',
                borderRadius: '0.25rem',
                fontSize: '0.875em',
              },
              'code::before': {
                content: '""',
              },
              'code::after': {
                content: '""',
              },
            },
          },
          dark: {
            css: {
              color: '#e2e8f0',
              a: {
                color: '#90cdf4',
                '&:hover': {
                  color: '#63b3ed',
                },
              },
              pre: {
                backgroundColor: '#1a202c',
                color: '#e2e8f0',
              },
              code: {
                color: '#f687b3',
                backgroundColor: '#2d3748',
              },
            },
          },
        },
        plugins: [typography, addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}