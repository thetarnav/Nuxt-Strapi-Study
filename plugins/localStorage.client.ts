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
				sinceLastWeek: {
					aggregate: { count: sinceLastWeek },
				},
				sinceLastVisit: {
					aggregate: { count: sinceLastVisit },
				},
				available: {
					aggregate: { count: countAvailable },
				},
				other: {
					aggregate: { count: countOther },
				},
			} = await $graphql.request<CountResponse>(countQuery, {
				lastVisit,
				weekAgo: Date.now() - 6.048e8,
			})

			store.commit('setFilterCount', {
				sinceLastVisit,
				sinceLastWeek,
				countAvailable,
				countOther,
			})
		} catch (err) {
			console.error(err)
		}
	}
}
