<template>
	<div
		class="lang-switch absolute top-0 right-0 m-4 bg-gray-100 rounded-md shadow"
	>
		<i
			v-show="!listVisible"
			v-click-outside="outsideClick"
			class="flex p-3"
			@click="click"
		>
			<LangIcon class="w-6 fill-current" />
		</i>
		<div v-show="listVisible" class="flex flex-col divide-y divide-gray-300">
			<nuxt-link
				v-for="locale in availableLocales"
				:key="locale.code"
				:to="switchLocalePath(locale.code)"
				class="px-3 py-2 link-text"
				>{{ locale.name }}</nuxt-link
			>
		</div>
	</div>
</template>

<script lang="ts">
import { NuxtVueI18n } from 'nuxt-i18n/types/nuxt-i18n'
import Vue from 'vue'

export default Vue.extend({
	name: 'LanguageSwitch',
	components: {
		LangIcon: () => import('~/assets/icons/lang.svg?inline'),
	},
	data() {
		return {
			listVisible: false,
		}
	},
	computed: {
		availableLocales(): NuxtVueI18n.Options.LocaleObject[] {
			return (
				(this.$i18n.locales?.filter(
					i => typeof i === 'object' && i.code !== this.$i18n.locale,
				) as NuxtVueI18n.Options.LocaleObject[] | undefined) || []
			)
		},
	},
	methods: {
		click() {
			this.listVisible = !this.listVisible
		},
		outsideClick(e: TouchEvent) {
			const touchedList = ((e as any)
				.path as HTMLElement[]).findIndex(({ classList }) =>
				classList?.contains('lang-switch'),
			)

			if (touchedList === -1) this.listVisible &&= false
		},
	},
})
</script>

<style lang="postcss" scoped>
.link-text {
	@apply font-semibold text-gray-900;
	&:hover {
		@apply text-primary;
	}
}
</style>
