import { request, gql } from 'graphql-request'
import en from './locales/en.js'
import pl from './locales/pl.js'
import de from './locales/de.js'
import { fullProduct } from './assets/js/queries'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Renkidzieło',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
	},
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'cirrus-ui/dist/cirrus.min.css',
		'~/assets/base.scss',
		'~/assets/styles.scss',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/fontawesome.js',
		'~/plugins/globalEvents.js',
		'~/plugins/localStorage.client.ts',
		'~/plugins/toggleDocScroll.client.ts',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxtjs/composition-api',
		'nuxt-graphql-request',
		'@nuxtjs/svg',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// '@nuxtjs/strapi',
		'@nuxtjs/style-resources',
		'nuxt-lazy-load',
		'nuxt-i18n',
	],

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
				({ products }) =>
					products.map(({ id, ...data }) => ({
						route: `/gallery/${id}`,
						payload: data,
					})),
			)
		},
	},
	router: {
		base: '/nuxt-strapi-prototyping/',
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
	build: {},

	server: {
		host: process.env.BASE_URL,
		port: process.env.BASE_PORT, // default: 3000
	},

	env: {
		baseUrl:
			`http://${process.env.BASE_URL}:${process.env.BASE_PORT}` ||
			'http://localhost:3000',
		strapiUrl: process.env.STRAPI_URL,
	},
}
