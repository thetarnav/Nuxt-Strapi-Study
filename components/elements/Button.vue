<template>
	<button class="bg-gray-800 shadow-md rounded p-2 px-3" @click="click">
		<span class="button-content text-white fony-medium">
			<slot></slot>
		</span>
	</button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Button',
	props: {
		route: {
			type: Object,
			default: null,
		},
	},
	methods: {
		click() {
			const { route } = this
			if (route) this.$router.push(this.localePath(route))
		},
	},
})
</script>

<style lang="scss" scoped>
.primary {
	@apply bg-primary flex justify-center items-center p-5 rounded-md shadow-lg;
	.button-content {
		@apply text-lg font-semibold;
	}
}
</style>
