<template>
	<SwipeAndScroll @swipe="swipe">
		<Nuxt />
	</SwipeAndScroll>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	methods: {
		swipe(direction: SwipeDirection) {
			const page = this.$route.name

			switch (direction) {
				case 'up':
					if (page === 'index')
						this.$router.push({
							name: 'gallery',
							query: { prevRoute: 'index' },
						})
					console.log('swipe up')
					break

				case 'down':
					if (page === 'gallery') {
						const { prevRoute } = this.$route.query,
							name = typeof prevRoute === 'string' ? prevRoute : 'index'
						this.$router.push({ name })
					}
					break

				case 'left':
					console.log('swipe left')
					break

				case 'right':
					console.log('swipe right')
					break

				default:
					break
			}
		},
	},
})
</script>

<style lang="scss"></style>
