<template>
	<div class="page home px-6">
		<figure class="banner"></figure>
		<h1 class="project-name">Renkidzieło</h1>
		<span class="project-logo icon subtitle u-center" style="font-size: 28px">
			<Icon icon="image"></Icon>
		</span>
		<p>
			Artystyczne i wysokiej jakości rękodzieła. Idealne do wystroju wnętrz i
			zawsze sprawdzą się jako prezent.
		</p>
		<p>Znajdź coś dla siebie!</p>
		<nuxt-link
			:to="{ name: 'gallery' }"
			class="btn btn-primary btn-large u-center"
			>Dostępne produkty</nuxt-link
		>
		<img
			srcX="https://source.unsplash.com/800x1000/?lamp,interior,design"
			src="img/widok na komin-8.jpg"
			alt="zdjęcie wystawy przykładowej lampy"
			class="promo-photo mt-20 cover-img"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Home',
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
	layout: 'main',
	scrollToTop: false,
	data() {
		return {}
	},
	mounted() {
		this.scrollToPrevious()
	},
	methods: {
		scrollToPrevious() {
			const { params } = this.$route
			if (params.scroll) {
				const scrollToY = Math.min(
					parseInt(params.scroll),
					this.$el.scrollHeight - window.innerHeight,
				)
				window.scrollTo({
					top: scrollToY,
				})
				console.log('scroll to', parseInt(params.scroll))
				console.log(
					'scroll to - padd',
					parseInt(params.scroll) -
						this.$store.state.application.swipeVerticalPadding,
				)
				console.log('scroll to y', scrollToY)
				console.log('wh', window.innerHeight)
				console.log('sh', this.$el.scrollHeight)
				console.log('sh - wh', this.$el.scrollHeight - window.innerHeight)

				params.scroll = ''
			}
		},
	},
})
</script>

<style lang="scss" scoped>
.banner {
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	width: 100%;
	height: 30rem;

	// background: url('https://source.unsplash.com/featured/?workshop,artist,carpenter');
	background: url('/img/picek.jpg');
	background-size: cover;
	background-position-x: center;

	&:after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 70%;
		background: linear-gradient(transparent, $background);
	}
}
.project-name {
	margin-top: 24rem;

	color: $black;
	text-align: center;
}
.promo-photo {
	width: 100%;
	height: calc(100vw / 4 * 5 - var(--space-size) * 6 * 2);
}
</style>
