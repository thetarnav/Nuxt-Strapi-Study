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
			fontFamily: {
				sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'serif-display': ['Bluu Next', 'ui-serif', 'serif'],
			},
			boxShadow: {
				around: '0 0 40px 0 rgba(0, 0, 0, 0.3)',
			},
		},
	},
	variants: {
		extend: {
			borderWidth: ['last'],
			margin: ['last', 'first'],
			borderRadius: ['last', 'first'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
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
