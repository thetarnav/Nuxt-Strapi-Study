<template>
	<component :is="componentName" :icon="icon"></component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'MyIcon',
	components: {
		lang: () => import('~/assets/icons/lang.svg?inline'),
		prev: () => import('~/assets/icons/prev.svg?inline'),
		next: () => import('~/assets/icons/next.svg?inline'),
		x: () => import('~/assets/icons/x.svg?inline'),
		chain: () => import('~/assets/icons/chain.svg?inline'),
		'shopping-bag': () => import('~/assets/icons/shopping-bag.svg?inline'),
		'shopping-bag-full': () =>
			import('~/assets/icons/shopping-bag-full.svg?inline'),
	},
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
	computed: {
		isInList(): boolean {
			return this.$options.components?.[this.icon] !== undefined
		},
		componentName(): string {
			return this.isInList ? this.icon : 'icon'
		},
	},
})
</script>
