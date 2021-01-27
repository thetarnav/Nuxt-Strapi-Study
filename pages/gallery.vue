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
	layout: 'galleryLayout',
	scrollToTop: false,
	mounted() {
		this.$nextTick(() => window.scrollTo({ top: 120 }))
	},
	methods: {},
})
</script>

<style lang="scss">
// .gallery {
// 	min-height: calc(100vh + 10px);
// }
</style>
