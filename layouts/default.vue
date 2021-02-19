<template>
	<div>
		<Nuxt />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'DefaultLayout',
	head() {
		return this.$nuxtI18nHead({
			addSeoAttributes: true,
			addDirAttribute: true,
		})
	},
})
</script>
