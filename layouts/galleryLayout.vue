<template>
	<div class="">
		<SwipeAndScroll :directions="['down']" @swipe="swipe">
			<Nuxt class="page" />
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
		swipe(direction: SwipeDirection) {
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
