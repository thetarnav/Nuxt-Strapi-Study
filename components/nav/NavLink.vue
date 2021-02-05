<template>
	<nuxt-link :to="{ name: to }" class="nav-link" :class="name">
		<Icon :icon="icon" class="link-icon"></Icon>
		<p class="link-text">
			<slot></slot>
		</p>
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
		to: {
			type: String,
			default: 'index',
		},
		icon: {
			type: String,
			default: 'image',
		},
	},
	// computed: {
	// 	display() {
	// 		return this.to !== this.route?.name && this.to !== this.route?.path
	// 	},
	// },
})
</script>

<style lang="scss" scoped>
.link-text {
	margin: 0;
	line-height: 70%;
	margin-top: 5px;
}
</style>
