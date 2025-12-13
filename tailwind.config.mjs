import typography from '@tailwindcss/typography';

export default {
	content: [
		'./src/**/*.{astro,html,js,ts,jsx,tsx}',
		'./src/content/**/*.{md,mdx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
		},
	},
	plugins: [typography],
};