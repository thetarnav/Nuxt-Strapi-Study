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
		const countNew = await $strapi.count('products', {
				Timestamp_gte: lastVisit,
			}),
			countAvailable = await $strapi.count('products', {
				Available: true,
			})

		store.commit('setSpecialCount', {
			countNew,
			countAvailable,
		})
	}
}
