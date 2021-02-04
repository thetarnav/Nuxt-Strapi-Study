import { Context } from '@nuxt/types'
import Vue from 'vue'
import { ApplicationState } from '~/store/application'

// export default function ({ store }: Context) {
// 	// Setting Last Visit Timestamp in the Application Store
// 	store.commit('application/setLastVisit')
// }

declare module 'vue/types/vue' {
	interface Vue {
		$lastVisit: number
	}
}

Vue.prototype.$lastVisit =
	parseInt(localStorage.getItem('lastVisit') || '') || Date.now()

localStorage.setItem('lastVisit', Date.now().toString())
