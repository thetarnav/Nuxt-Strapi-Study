import Vue from 'vue'

export default Vue.extend({
   beforeRouteEnter(to, from, next) {
		if (from.name === 'gallery' && typeof from.query.scroll === 'string')
			to.params.scroll = from.query.scroll
		next()
	},
	beforeRouteLeave(to, from, next) {
		if (to.name === 'gallery' && to.query.prevRoute !== from.name)
			next({
				name: 'gallery',
				query: {
					prevRoute: from.name || 'index',
					scroll: Math.round(window.scrollY).toString(),
				},
			})
		else next()
   },
   layout: 'topPageLayout',
	scrollToTop: false,
	mounted() {
		this.scrollToPrevPos()
   },
   methods: {
      scrollToPrevPos() {
			const { params } = this.$route
			if (params.scroll) {
				const scrollToY = Math.min(
					parseInt(params.scroll),
					this.$el.scrollHeight - window.innerHeight,
				)

				window.scrollTo({
					top: scrollToY,
				})

				params.scroll = ''
			} else {
				window.scrollTo({
					top: 0,
				})
			}
		},
   },
})