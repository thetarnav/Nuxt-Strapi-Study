<template>
	<div class="page home px-6">
		<figure class="banner" lazy-background="img/picek.jpg"></figure>
		<h1 class="project-name">Renkidzieło</h1>
		<span class="project-logo icon subtitle u-center" style="font-size: 28px">
			<Icon icon="image"></Icon>
		</span>
		<p>
			{{ $t('home.about') }}
		</p>
		<p>{{ $t('home.cta.incentive') }}</p>
		<nuxt-link
			:to="localePath({ name: 'gallery', query: { filter: 'available' } })"
			class="btn btn-primary btn-large u-center"
			>{{ $t('home.cta.button') }}</nuxt-link
		>
		<div class="mt-20">
			<nuxt-link :to="localePath('/gallery/6021bd9be541ac0015845c94')">
				<img
					src="img/lampofon.jpg"
					:alt="$t('home.heroImgAlt')"
					class="promo-photo cover-img"
				/>
			</nuxt-link>
		</div>
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
	// background: url('~/static/img/picek.jpg');
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
