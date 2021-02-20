<template>
	<div class="layout">
		<SwipeAndScroll :directions="['up', 'left', 'right']" @swipe="swipe">
			<Nuxt class="page px-6" />
			<footer class="see-gallery pb-48 mt-20 px-6 text-center">
				<h6 class="whitespace-normal inline">
					{{ $t('home.seeGallery.before')
					}}<nuxt-link :to="localePath('/gallery')"
						><strong>{{
							$t('home.seeGallery.gallery')
						}}</strong></nuxt-link
					>
					{{ $t('home.seeGallery.after') }}
				</h6>
				<svg
					class="w-6 h-6 mb-1 text-primary inline"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</footer>
		</SwipeAndScroll>
		<MainNav :new-products="newProductsCount" :are-new="areNewProducts" />
		<div v-if="newProductsCount > 0" class="new-products-notification">
			<p>Nowe produkty: +{{ newProductsCount }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection, PageOrder } from '~/types/types'
import { RootState } from '~/store'

export default Vue.extend({
	name: 'TopPageLayout',
	head() {
		return this.$nuxtI18nHead({
			addSeoAttributes: true,
			addDirAttribute: true,
		})
	},
	computed: {
		newProductsCount() {
			return (this.$store.state as RootState).newProductsCount
		},
		areNewProducts() {
			return (this.$store.state as RootState).areNewProducts
		},
		pageIndex(): number | null {
			const routeName = this.$route.name?.split('___')[0] || 'index'
			if (!routeName) return null
			return PageOrder[routeName]
		},
	},
	methods: {
		swipe(direction: SwipeDirection): void {
			const { pageIndex } = this
			if (pageIndex === null) return
			let path: { name?: string } = {}

			if (direction === 'up')
				path = {
					name: 'gallery',
				}
			else if (direction === 'left' && PageOrder[pageIndex + 1])
				path = {
					name: PageOrder[pageIndex + 1],
				}
			else if (direction === 'right' && PageOrder[pageIndex - 1])
				path = {
					name: PageOrder[pageIndex - 1],
				}

			path && this.$router.push(this.localePath(path))
		},
	},
})
</script>

<style lang="scss" scoped>
.new-products-notification {
	position: fixed;
	top: 20px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
}

.see-gallery {
	position: relative;
	&:after {
		content: '';
		position: absolute;
		// z-index: -1;
		pointer-events: none;
		left: 0;
		right: 0;
		bottom: 0;
		height: 120%;
		background: linear-gradient(transparent, theme('colors.gray.300'));
	}
}
</style>
