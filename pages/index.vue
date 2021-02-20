<template>
	<div class="page px-6">
		<figure class="banner" lazy-background="img/picek.jpg"></figure>
		<h1 class="mt-64 text-center">{{ $t('home.project') }} Renkidzieło</h1>
		<span class="text-6xl text-center mt-4">
			<Icon icon="image"></Icon>
		</span>
		<h6 class="mt-10 font-medium">
			{{ $t('home.about') }}
		</h6>
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
		<LangSwitch />
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
	@apply absolute inset-x-0 top-0 h-80 -z-1;
	background-size: cover;
	background-position-x: center;

	&:after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 80%;
		background: linear-gradient(transparent, $background);
	}
}
// .project-name {
// 	margin-top: 24rem;

// 	color: $black;
// 	text-align: center;
// }
// .promo-photo {
// 	width: 100%;
// 	height: calc(100vw / 4 * 5 - var(--space-size) * 6 * 2);
// }
</style>
