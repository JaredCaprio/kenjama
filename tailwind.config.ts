import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: 'rgba(var(--primary), <alpha-value>)',
				secondary: 'rgba(var(--secondary), <alpha-value>)',
				tertiary: 'rgba(var(--tertiary), <alpha-value>)',
				background: 'rgba(var(--background),  <alpha-value>)',
				content: 'rgba(var(--content), <alpha-value>)',
			},
		},
	},
	plugins: [],
};
export default config;
