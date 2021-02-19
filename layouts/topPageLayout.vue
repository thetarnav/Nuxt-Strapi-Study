<template>
	<div class="layout">
		<SwipeAndScroll :directions="['up', 'left', 'right']" @swipe="swipe">
			<Nuxt class="page" />
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
</style>
