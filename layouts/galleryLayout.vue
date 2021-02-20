<template>
	<div class="">
		<SwipeAndScroll :directions="['down']" @swipe="handleSwipe">
			<Nuxt class="page gallery" />
		</SwipeAndScroll>
		<MainNav />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection } from '~/types/types'

export default Vue.extend({
	name: 'GalleryLayout',
	head() {
		return this.$nuxtI18nHead({
			addSeoAttributes: true,
			addDirAttribute: true,
		})
	},
	methods: {
		handleSwipe(direction: SwipeDirection): void {
			if (direction !== 'down') return

			const { prevRoute } = this.$route.query,
				route =
					typeof prevRoute === 'string'
						? this.localePath(prevRoute?.split('___')[0])
						: this.localePath('/')

			this.$router.push(route)
		},
	},
})
</script>

<style lang="scss" scoped>
.gallery {
	padding-bottom: var(--nav-height);
}
</style>
