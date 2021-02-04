import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	topPagesOrder: ['index', 'lamps', 'belt-bags', 'paintings'],
	topPagesNames: ['Home', 'Lampy', 'Saszetki', 'Obrazy'],
	swipeVerticalPadding: 100,
})
export type ApplicationState = ReturnType<typeof state>

/**
 * GETTERS:
 */
export const getters: GetterTree<ApplicationState, ApplicationState> = {
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
export const mutations: MutationTree<ApplicationState> = {}
