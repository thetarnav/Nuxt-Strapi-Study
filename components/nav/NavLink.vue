<template>
	<nuxt-link
		:to="localePath($attrs.to || '')"
		class="nav-link link-text"
		:class="name"
	>
		<Icon :icon="icon" class="link-icon"></Icon>
		<span class="text-slot mt-1">
			<slot></slot>
		</span>
	</nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'NavLink',
	props: {
		name: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: 'image',
		},
	},
})
</script>

<style lang="scss" scoped>
.text-slot {
	max-width: 100%;
	@apply text-center break-words;
}
</style>
