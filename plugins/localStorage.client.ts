import { Context } from '@nuxt/types'
import Vue from 'vue'
import { countQuery, CountResponse } from '~/assets/js/queries'
// import { ApplicationState } from '~/store'

declare module 'vue/types/vue' {
	interface Vue {
		$lastVisit: number
	}
}

export default function ({ store, $graphql }: Context) {
	const lastVisit =
		parseInt(localStorage.getItem('lastVisit') || '') || Date.now()
	Vue.prototype.$lastVisit = lastVisit

	checkFilterPopulation()

	async function checkFilterPopulation() {
		try {
			const {
				new: {
					aggregate: { count: countNew },
				},
				available: {
					aggregate: { count: countAvailable },
				},
				other: {
					aggregate: { count: countOther },
				},
				views: {
					aggregate: {
						avg: { views },
					},
				},
			} = await $graphql.request<CountResponse>(countQuery, {
				timestamp: lastVisit,
			})

			store.commit('setFilterCount', {
				countNew,
				countAvailable,
				countOther,
			})
			store.commit('setAverageViews', views)
		} catch (err) {
			console.error(err)
		}
	}
}
