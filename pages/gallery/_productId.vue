<template>
	<p class="product-id">{{ productId }}</p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	asyncData({ params }) {
		const { productId } = params
		return { productId }
	},
	data() {
		return {
			productId: '',
		}
	},
	mounted() {
		console.log(this.productId)
	},
})
</script>

<style lang="scss" scoped>
.product-id {
	position: fixed;
}
</style>
