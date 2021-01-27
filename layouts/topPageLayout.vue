<template>
	<div class="layout">
		<MainNav />
		<SwipeAndScroll :directions="['up', 'left', 'right']" @swipe="swipe">
			<Nuxt class="page" />
		</SwipeAndScroll>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection } from '~/plugins/types'
import { State } from '~/store/application'

export default Vue.extend({
	name: 'TopPageLayout',
	computed: {
		topPagesOrder() {
			return this.$store.state.application
				.topPagesOrder as State['topPagesOrder']
		},
		pageIndex() {
			const pageIndex = this.$store.getters['application/pageIndex'](
				this.$route.name,
			)
			return typeof pageIndex === 'number' ? pageIndex : 0
		},
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

<style lang="scss">
.layout {
	// important for navigation and swiping:
	height: 100vh;
	overflow-y: auto;
}
</style>
