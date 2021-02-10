import { GetterTree, ActionTree, MutationTree, Store } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import { Filter } from '~/types/types'

interface SeenProducts {
	[id: string]: number
}

export const state = () => ({
	topPagesOrder: ['index', 'lamps', 'belt-bags', 'paintings'],
	topPagesNames: ['Home', 'Lampy', 'Saszetki', 'Obrazy'],
	swipeVerticalPadding: 100,
	newProductsCount: 0,
	areAvailableProducts: false,
	areOtherProducts: false,
	filters: [] as Filter[],
	seenProducts: {} as SeenProducts,
})
export type RootState = ReturnType<typeof state>

/**
 * GETTERS:
 */
export const getters: GetterTree<RootState, RootState> = {
	pageIndex: ({ topPagesOrder }) => (page: string) =>
		topPagesOrder.findIndex(x => page === x),
	pageName: ({ topPagesNames }, { pageIndex }) => (page: string | number) =>
		typeof page === 'number'
			? topPagesNames[page]
			: topPagesNames[pageIndex(page)],
}

/**
 * MUTATIONS:
 */
export const mutations: MutationTree<RootState> = {
	setFilterCount: (state, { countNew, countAvailable, countOther }) => {
		if (typeof countNew === 'number') state.newProductsCount = countNew
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
	},
	RESET_VIEWS: store => (store.seenProducts = {}),
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
		commit('VIEW_PRODUCT', id)
	},
	emitViews({ state, commit }) {
		this.$axios.post(`${process.env.strapiUrl}/products/view`, {
			entries: Object.entries(state.seenProducts),
		})
		commit('RESET_VIEWS')
	},
	debounceEmitViews: debounce(
		({ dispatch }) => dispatch('emitViews'),
		100000,
		{ maxWait: 180000 },
	),
	// async setNewProductsCount({ commit }, promise: Promise<number>) {
	// 	const count = await promise
	// 	if (typeof count !== 'number') return
	// 	commit('setNewProductsCount', count)
	// },
}
