import { Context } from '@nuxt/types'
import Vue from 'vue'
// import { ApplicationState } from '~/store'

declare module 'vue/types/vue' {
	interface Vue {
		$lastVisit: number
	}
}

export default function ({ store, $strapi }: Context) {
	const lastVisit =
		parseInt(localStorage.getItem('lastVisit') || '') || Date.now()
	Vue.prototype.$lastVisit = lastVisit

	checkFilterPopulation()

	async function checkFilterPopulation() {
		try {
			const countNew = await $strapi.count('products', {
					timestamp_gte: lastVisit,
				}),
				countAvailable = await $strapi.count('products', {
					isAvailable: true,
				}),
				countOther = await $strapi.count('products', {
					category_null: true,
				})

			store.commit('setFilterCount', {
				countNew,
				countAvailable,
				countOther,
			})
		} catch (err) {
			console.error(err)
		}
	}
}
