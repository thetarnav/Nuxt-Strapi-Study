import { GetterTree, ActionTree, MutationTree } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import { Filter } from '~/types/types'

interface SeenProducts {
	[id: string]: number
}

export const state = () => ({
	swipeVerticalPadding: 100,
	newProductsCount: 0,
	areNewProducts: false,
	areAvailableProducts: false,
	areOtherProducts: false,
	filters: [] as Filter[],
	seenProducts: {} as SeenProducts,
	relatedProducts: new Set() as Set<string>,
})
export type RootState = ReturnType<typeof state>

/**
 * GETTERS:
 */
export const getters: GetterTree<RootState, RootState> = {}

/**
 * MUTATIONS:
 */
export const mutations: MutationTree<RootState> = {
	setFilterCount: (
		state,
		{ sinceLastVisit, sinceLastWeek, countAvailable, countOther },
	) => {
		if (typeof sinceLastVisit === 'number') {
			state.newProductsCount = sinceLastVisit
			if (sinceLastVisit > 0) state.areNewProducts = true
		}
		if (typeof sinceLastWeek === 'number' && sinceLastWeek > 0)
			state.areNewProducts = true

		if (typeof countAvailable === 'number' && countAvailable > 0)
			state.areAvailableProducts = true
		if (typeof countOther === 'number' && countOther > 0)
			state.areOtherProducts = true
	},
	setFilters: (store, filters: Filter[]) =>
		(store.filters = cloneDeep(filters)),
	VIEW_PRODUCT: (store, id: string) => {
		const current = store.seenProducts[id]
		store.seenProducts[id] = typeof current === 'number' ? current + 1 : 1
		store.relatedProducts.add(id)
	},
	RESET_VIEWS: store => (store.seenProducts = {}),
	RESET_RELATIONS: store => store.relatedProducts.clear(),
	// openProduct: (store, id: unknown) => {
	// 	if (typeof id === 'number') store.productId = id
	// },
	// closeProduct: store => (store.productId = null),
}

/**
 * ACTIONS:
 */
export const actions: ActionTree<RootState, RootState> = {
	seeProduct({ dispatch, commit }, id) {
		dispatch('debounceEmitViews')
		dispatch('debounceEmitRelations')
		commit('VIEW_PRODUCT', id)
	},
	emitViews({ state, commit }) {
		this.$axios.post(`${process.env.strapiUrl}/products/view`, {
			entries: Object.entries(state.seenProducts),
		})
		commit('RESET_VIEWS')
	},
	debounceEmitViews: debounce(({ dispatch }) => dispatch('emitViews'), 60000, {
		maxWait: 100000,
	}),
	emitRelations({ state, commit }) {
		const { relatedProducts } = state
		if (relatedProducts.size > 1)
			this.$axios.post(`${process.env.strapiUrl}/ties/increase`, {
				entries: [...relatedProducts],
			})
		commit('RESET_RELATIONS')
	},
	debounceEmitRelations: debounce(
		({ dispatch }) => dispatch('emitRelations'),
		100000,
		{ maxWait: 200000 },
	),
	// async setNewProductsCount({ commit }, promise: Promise<number>) {
	// 	const count = await promise
	// 	if (typeof count !== 'number') return
	// 	commit('setNewProductsCount', count)
	// },
}
