import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	topPagesOrder: ['index', 'lamps', 'belt-bags', 'paintings'],
	topPagesNames: ['Home', 'Lampy', 'Saszetki', 'Obrazy'],
	swipeVerticalPadding: 100,
	newProductsCount: 0,
	areAvailable: false,
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
	setSpecialCount: (state, { countNew, countAvailable }) => {
		if (typeof countNew === 'number') state.newProductsCount = countNew
		if (typeof countAvailable === 'number' && countAvailable > 0)
			state.areAvailable = true
	},
}

/**
 * ACTIONS:
 */
export const actions: ActionTree<RootState, RootState> = {
	// async setNewProductsCount({ commit }, promise: Promise<number>) {
	// 	const count = await promise
	// 	if (typeof count !== 'number') return
	// 	commit('setNewProductsCount', count)
	// },
}
