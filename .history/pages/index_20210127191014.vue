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
import MainPageMixin from '~/plugins/mainPageMixin'

export default MainPageMixin.extend({
	name: 'Home',
	head() {
		return {
			title: 'Renkidzieło',
		}
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
