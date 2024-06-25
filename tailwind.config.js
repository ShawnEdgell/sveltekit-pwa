// tailwind.config.js

// eslint-disable-next-line @typescript-eslint/no-require-imports
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // Enable dark mode
	theme: {
		extend: {}
	},
	plugins: [typography]
};
