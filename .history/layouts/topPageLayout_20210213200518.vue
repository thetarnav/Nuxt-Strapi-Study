<template>
	<div class="layout">
		<SwipeAndScroll :directions="['up', 'left', 'right']" @swipe="swipe">
			<Nuxt class="page" />
		</SwipeAndScroll>
		<MainNav :new-products="newProductsCount" />
		<ProductOverlay v-if="$route.query.productId !== undefined" />
		<div v-if="newProductsCount > 0" class="new-products-notification">
			<p>Nowe produkty: +{{ newProductsCount }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection } from '~/types/types'
import { RootState } from '~/store'

export default Vue.extend({
	name: 'TopPageLayout',
	computed: {
		topPagesOrder() {
			return (this.$store.state as RootState).topPagesOrder
		},
		newProductsCount() {
			return (this.$store.state as RootState).newProductsCount
		},
		pageIndex() {
			const pageIndex = this.$store.getters.pageIndex(this.$route.name)
			return typeof pageIndex === 'number' ? pageIndex : 0
		},
	},
	methods: {
		swipe(direction: SwipeDirection): void {
			const { pageIndex, topPagesOrder } = this

			switch (direction) {
				case 'up':
					this.$router.push({
						name: 'gallery',
					})
					break

				case 'left':
					pageIndex + 1 < topPagesOrder.length &&
						this.$router.push({
							name: topPagesOrder[pageIndex + 1],
						})
					break

				case 'right':
					pageIndex - 1 >= 0 &&
						this.$router.push({
							name: topPagesOrder[pageIndex - 1],
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
