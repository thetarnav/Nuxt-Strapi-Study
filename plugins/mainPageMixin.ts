import Vue from 'vue'
import qs from 'qs'
import { searchForSuitableParent } from '~/assets/js/helpers'
import { PageOrder } from '~/types/types'

let alreadyScrolled = false

export default Vue.extend({
	beforeRouteEnter(to, from, next) {
		if (
			from.name?.includes('gallery') &&
			from.query.prevRoute === to.name &&
			typeof from.query.scroll === 'string'
		)
			to.params.scroll = from.query.scroll
		else to.params.scroll = ''
		next()
	},
	beforeRouteLeave(to, from, next) {
		if (to.name?.includes('gallery') && to.query.prevRoute !== from.name) {
			const scrollParent = searchForSuitableParent(this.$el as HTMLElement, {
				overflowY: ['scroll', 'auto'],
			})
			const prevRoute = from.name || 'index'
			const filter =
				to.query.filter ?? (prevRoute !== 'index' ? prevRoute : undefined)
			const scroll = Math.round(
				scrollParent?.scrollTop || window.scrollY,
			).toString()
			const query = qs.stringify({
				...to.query,
				prevRoute,
				filter,
				scroll,
			})

			next(`/gallery/${to.params.productId || ''}?${query}`)
		} else next()
	},
	layout: 'topPageLayout',
	scrollToTop: false,
	transition(to, from) {
		const toIndex =
				(PageOrder[to?.name || 'index'] as number | undefined) || 0,
			fromIndex =
				(PageOrder[from?.name || 'index'] as number | undefined) || 0

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
