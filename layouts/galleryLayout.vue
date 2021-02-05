<template>
	<div class="">
		<SwipeAndScroll :directions="['down']" @swipe="swipe">
			<Nuxt class="page" />
		</SwipeAndScroll>
		<MainNav />
		<ProductOverlay v-if="showProduct" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection } from '~/types/types'

export default Vue.extend({
	name: 'GalleryLayout',
	computed: {
		showProduct(): boolean {
			const { params, query } = this.$route
			return params.productId !== undefined || query.productId !== undefined
		},
	},
	watch: {
		showProduct() {
			this.toggleDisableScroll()
		},
	},
	mounted() {
		this.toggleDisableScroll()
	},
	methods: {
		toggleDisableScroll() {
			const html = document.querySelector('html')

			this.showProduct
				? html.classList.add('disable-scroll')
				: html.classList.remove('disable-scroll')
		},
		swipe(direction: SwipeDirection) {
			if (direction !== 'down') return

			const { prevRoute } = this.$route.query,
				name = typeof prevRoute === 'string' ? prevRoute : 'index'
			this.$router.push({ name })
		},
	},
})
</script>
