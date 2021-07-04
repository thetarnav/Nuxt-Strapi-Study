import { request, gql } from 'graphql-request'
import en from './locales/en.js'
import pl from './locales/pl.js'
import de from './locales/de.js'
import { fullProduct } from './assets/js/queries'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Nuxt & Strapi Study',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content:
					"Prototype project: I'm learning Strapi to use it later in a commercial project. This is a repository where I prototype the project and test Nuxt.js + Strapi functionalities.",
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
			// Poppins from Google Fonts:
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{ rel: 'preconnect', href: process.env.STRAPI_URL },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
			},
			// Bluu Next Webfont:
			{
				rel: 'stylesheet',
				href: 'webfonts/stylesheet.css',
				type: 'text/css',
				charset: 'utf-8',
			},
		],
	},
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'~/assets/base.scss',
		'~/assets/styles.scss',
		'~/assets/transitions.scss',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/filters.ts',
		'~/plugins/fontawesome.js',
		'~/plugins/vue-plugins.js',
		'~/plugins/vue-plugins.client.js',
		'~/plugins/localStorage.client.ts',
		'~/plugins/toggleDocScroll.client.ts',
		// '~/plugins/vue-awesome-swiper.client.ts',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: [
		{ path: '~/components/elements', pathPrefix: false },
		{ path: '~/components/gallery', pathPrefix: false },
		{ path: '~/components/home', pathPrefix: false },
		{ path: '~/components/nav', pathPrefix: false },
		{ path: '~/components/utility', pathPrefix: false },
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxt/typescript-build',
		'nuxt-graphql-request',
		'@nuxtjs/svg',
		'@nuxtjs/tailwindcss',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		'nuxt-lazy-load',
		'nuxt-i18n',
		'@nuxtjs/markdownit',
	],

	markdownit: {
		runtime: true, // Support `$md()`
		linkify: true,
		breaks: true,
		typographer: false,
	},

	i18n: {
		locales: [
			{ code: 'en', name: 'English', iso: 'en-US', file: 'en.js' },
			{ code: 'pl', name: 'Polski', iso: 'pl-PL', file: 'pl.js' },
			{ code: 'de', name: 'Deutsche', iso: 'de-DE', file: 'de.js' },
		],
		langDir: '/locales/',
		lazy: true,
		// detectBrowserLanguage: {
		// 	onlyOnRoot: true,
		// },
		// For git pages:
		detectBrowserLanguage: false,
		defaultLocale: 'pl',
		vueI18n: {
			fallbackLocale: 'pl',
			messages: { en, pl, de },
		},
	},

	target: 'static',
	generate: {
		dir: 'docs',
		interval: 100,
		routes() {
			const query = gql`
				{
					products {
						id
						...FullProductFragment
					}
				}
				${fullProduct}
			`
			return request(`${process.env.STRAPI_URL}/graphql`, query).then(
				({ products }) => {
					const routes = [],
						locales = [null, 'en', 'de']
					products.forEach(({ id, ...data }) =>
						routes.push(
							...locales.map(locale => ({
								route: locale
									? `/${locale}/gallery/${id}`
									: `/gallery/${id}`,
								payload: data,
							})),
						),
					)
					return routes
				},
			)
		},
	},
	router: {
		base: '/Nuxt-Strapi-Study/',
	},

	vue: {
		config: {
			productionTip: true,
			devtools: true,
			performance: true,
			silent: false,
		},
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// strapi: {
	// 	url: process.env.STRAPI_URL,
	// 	entities: ['products', 'product-categories'],
	// },

	graphql: {
		endpoint: `${process.env.STRAPI_URL}/graphql`,
	},

	styleResources: {
		scss: ['~/assets/variables/*.scss'],
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	// build: {
	// 	postcss: {
	// 		syntax: 'postcss-scss',
	// 		plugins: {
	// 			'postcss-import': {},
	// 			'postcss-nested': {},
	// 			'postcss-preset-env': this.preset,
	// 			'postcss-custom-properties': {},
	// 		},
	// 		preset: {
	// 			stage: 1,
	// 		},
	// 	},
	// },

	server: {
		host: '0.0.0.0',
	},

	env: {
		baseUrl: 'http://localhost:3000',
		strapiUrl: process.env.STRAPI_URL,
	},
}
