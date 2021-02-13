<template>
	<div class="layout">
		<SwipeAndScroll :directions="['up', 'left', 'right']" @swipe="swipe">
			<Nuxt class="page" />
		</SwipeAndScroll>
		<MainNav />
		<ProductOverlay v-if="$route.query.productId !== undefined" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { SwipeDirection } from '~/types/types'
import { RootState } from '~/store'

export default Vue.extend({
	name: 'TopPageLayout',
	computed: {
		...mapState(['topPagesOrder', 'newProductsCount']),
		// topPagesOrder() {
		// 	return this.$store.state.topPagesOrder as RootState['topPagesOrder']
		// },
		pageIndex() {
			const pageIndex = this.$store.getters.pageIndex(this.$route.name)
			return typeof pageIndex === 'number' ? pageIndex : 0
		},
	},
	mounted() {
		console.log('mounted', (this.$store.state as RootState).newProductsCount)
	},
	methods: {
		swipe(direction: SwipeDirection) {
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

<style lang="scss"></style>
