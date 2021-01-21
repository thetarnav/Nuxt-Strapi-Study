<template>
	<div class="page gallery">
		Gallery
		<nuxt-link to="/">To home</nuxt-link>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Gallery',
	transition(to) {
		return {
			name: to.name !== 'gallery' ? 'slide-top' : 'slide-bottom',
			// name: 'page',
			// mode: '',
		}
	},
	mounted() {
		// if (!document || !window) return
		// console.log(this.$el)
		// const hammer = new Hammer(this.$el)
		// console.log(hammer)
	},
	methods: {},
})
</script>

<style lang="scss"></style>
