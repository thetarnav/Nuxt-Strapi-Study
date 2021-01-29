import Vue from 'vue'
import { searchForSuitableParent } from '~/plugins/helpers'

let alreadyScrolled = false

export default Vue.extend({
	beforeRouteEnter(to, from, next) {
		if (
			from.name === 'gallery' &&
			from.query.prevRoute === to.name &&
			typeof from.query.scroll === 'string'
		)
			to.params.scroll = from.query.scroll
		else to.params.scroll = ''
		next()
	},
	beforeRouteLeave(to, from, next) {
		if (to.name === 'gallery' && to.query.prevRoute !== from.name) {
			const scrollParent = searchForSuitableParent(this.$el as HTMLElement, {
				overflowY: ['scroll', 'auto'],
			})

			next({
				name: 'gallery',
				query: {
					prevRoute: from.name || 'index',
					scroll: Math.round(
						scrollParent?.scrollTop || window.scrollY,
					).toString(),
				},
			})
		} else next()
	},
	layout: 'topPageLayout',
	scrollToTop: false,
	transition(to, from) {
		const toIndex = window.$nuxt.$store.getters['application/pageIndex'](
				to.name,
			),
			fromIndex = window.$nuxt.$store.getters['application/pageIndex'](
				from?.name || 'index',
			)

		return {
			name: toIndex < fromIndex ? 'swipe-right' : 'swipe-left',
		}
	},
	mounted() {
		alreadyScrolled = false
		this.scrollToPrevPos()
	},
	methods: {
		scrollToPrevPos() {
			if (alreadyScrolled) return

			const { params } = this.$route,
				scrollParent =
					searchForSuitableParent(this.$el as HTMLElement, {
						overflowY: ['scroll', 'auto'],
					}) || window
			if (params.scroll) {
				const scrollToY = Math.min(
					parseInt(params.scroll),
					this.$el.scrollHeight - window.innerHeight,
				)

				scrollParent.scrollTo({
					top: scrollToY,
				})

				params.scroll = ''
			} else {
				scrollParent.scrollTo({
					top: 0,
				})
			}

			alreadyScrolled = true
		},
	},
})
