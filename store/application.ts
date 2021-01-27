import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	topPagesOrder: ['index', 'lamps', 'belt-bags', 'paintings'],
	topPagesNames: ['Home', 'Lampy', 'Saszetki', 'Obrazy'],
	swipeVerticalPadding: 90,
})
export type State = ReturnType<typeof state>

/**
 * GETTERS:
 */
export const getters: GetterTree<State, State> = {
	pageIndex: ({ topPagesOrder }) => (page: string) =>
		topPagesOrder.findIndex(x => page === x),
	pageName: ({ topPagesNames }, { pageIndex }) => (page: string | number) =>
		typeof page === 'number'
			? topPagesNames[page]
			: topPagesNames[pageIndex(page)],
}
