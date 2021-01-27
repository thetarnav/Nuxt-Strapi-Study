<template>
	<div>
		<SwipeAndScroll :directions="['down']" @swipe="swipe">
			<Nuxt class="page" />
		</SwipeAndScroll>
		<MainNav />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection } from '~/plugins/types'

export default Vue.extend({
	name: 'GalleryLayout',
	methods: {
		swipe(direction: SwipeDirection) {
			if (direction !== 'down') return

			const { prevRoute } = this.$route.query,
				name = typeof prevRoute === 'string' ? prevRoute : 'index'
			this.$router.push({ name })
		},
	},
})
</script>

<style></style>
