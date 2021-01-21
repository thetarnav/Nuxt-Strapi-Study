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
			:to="{ name: 'gallery', params: { aaa: 'aaa' } }"
			class="btn btn-primary btn-large u-center"
			>Dostępne produkty</nuxt-link
		>
		<img
			src="https://source.unsplash.com/800x1000/?lamp,interior,design"
			alt="zdjęcie wystawy przykładowej lampy"
			class="mt-20"
		/>
		<!-- <div class="swipe-check"></div> -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Home',
	beforeRouteEnter(to, from, next) {
		if (from.name === 'gallery') to.params.scrollToBottom = 'scroll'
		next()
	},
	scrollToTop: false,
	data() {
		return {
			scroll: false,
		}
	},
	mounted() {
		if (this.$route.params.scrollToBottom === 'scroll') {
			window.scrollTo({ top: 99999 })
			this.$route.params.scrollToBottom = ''
		}
	},
	methods: {
		swipe(event: Event) {
			switch (event.type) {
				case 'swipeup':
					if (
						window.innerHeight + window.scrollY !==
						this.$el.scrollHeight
					)
						return

					this.$router.push({ name: 'gallery', params: { swipe: 'up' } })
					break
				case 'swipeleft':
					console.log('swipeleft')

					break
				case 'swiperight':
					console.log('swiperight')
					break

				default:
					break
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

	background: url('https://source.unsplash.com/featured/?workshop,artist,carpenter');
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
.swipe-check {
	// @include full-absolute;
	// position: fixed;
	// z-index: -10;
}
</style>
