<template>
	<div class="layout">
		<SwipeAndScroll :directions="['up', 'left', 'right']" @swipe="swipe">
			<Nuxt class="page" />
		</SwipeAndScroll>
		<MainNav :new-products="newProductsCount" :are-new="areNewProducts" />
		<ProductOverlay v-if="$route.query.productId !== undefined" />
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
	computed: {
		newProductsCount() {
			return (this.$store.state as RootState).newProductsCount
		},
		areNewProducts() {
			return (this.$store.state as RootState).areNewProducts
		},
		pageIndex(): number | null {
			const routeName = this.$route.name
			if (!routeName) return null
			return PageOrder[routeName]
		},
	},
	methods: {
		swipe(direction: SwipeDirection): void {
			const { pageIndex } = this
			if (pageIndex === null) return

			switch (direction) {
				case 'up':
					this.$router.push({
						name: 'gallery',
					})
					break

				case 'left':
					PageOrder[pageIndex + 1] &&
						this.$router.push({
							name: PageOrder[pageIndex + 1],
						})
					break

				case 'right':
					PageOrder[pageIndex - 1] &&
						this.$router.push({
							name: PageOrder[pageIndex - 1],
						})
					break

				default:
					break
			}
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
</style>
