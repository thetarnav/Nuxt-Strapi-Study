<template>
	<button
		class="flex items-center justify-center space-x-2 px-3 h-10 bg-gray-800 shadow-md rounded text-white whitespace-nowrap"
		@click="click"
	>
		<Icon v-if="leadingIcon" :icon="leadingIcon" />
		<span v-if="$slots.default">
			<slot></slot>
		</span>
		<Icon v-if="trailingIcon" :icon="trailingIcon" />
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
		href: {
			type: String,
			default: null,
		},
		leadingIcon: {
			type: String,
			default: null,
		},
		trailingIcon: {
			type: String,
			default: null,
		},
		onClick: {
			type: Function,
			default: null,
		},
	},
	methods: {
		click() {
			const { route, onClick, href } = this
			if (route) this.$router.push(this.localePath(route))
			if (onClick) onClick()
			if (href) window.open(href, '_blank')
		},
	},
})
</script>

<style lang="scss" scoped>
.primary {
	@apply bg-primary space-x-3 px-5 h-14 rounded-md shadow-lg text-lg font-semibold;
}
.circle {
	@apply rounded-full h-12 w-12;
	svg {
		@apply w-6 h-6;
	}
}
</style>
