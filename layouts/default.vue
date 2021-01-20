<template>
	<div class="wrapper">
		<Nuxt />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
//v-hammer:swipe.up.left.right="swipe"

export default Vue.extend({
	methods: {
		swipe(event: Event) {
			switch (event.type) {
				case 'swipeup':
					console.log('swipeup')
					break
				case 'swipeleft':
					console.log('swipeleft')

					break
				case 'swiperight':
					console.log('swiperight')
					break

				default:
					break
			}
		},
	},
})
</script>

<style lang="scss">
.wrapper {
	overflow-y: auto;
	touch-action: pan-y;
}
</style>
