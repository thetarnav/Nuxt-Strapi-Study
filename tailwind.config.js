const colors = require('tailwindcss/colors')

module.exports = {
	theme: {
		extend: {
			zIndex: {
				'-1': '-1',
			},
			colors: {
				primary: '#5F4BFF',
				secondary: '#FF5F4B',
				gray: colors.trueGray,
			},
		},
	},
	variants: {
		extend: {
			borderWidth: ['last'],
		},
	},
	plugins: [],
	purge: {
		mode: 'layers',
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'components/**/*.vue',
			'layouts/**/*.vue',
			'pages/**/*.vue',
			'plugins/**/*.js',
			'nuxt.config.js',
			// TypeScript
			'plugins/**/*.ts',
			'nuxt.config.ts',
		],
	},
}
