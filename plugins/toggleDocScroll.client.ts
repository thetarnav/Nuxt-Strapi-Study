import { Context } from '@nuxt/types'

export default ({ app }: Context) => {
	app.router?.afterEach(({ query, params }) => {
		const displayingOverlay =
				query.productId !== undefined || params.productId !== undefined,
			classList = document.scrollingElement?.classList
		displayingOverlay
			? classList?.add('disable-scroll')
			: classList?.remove('disable-scroll')
	})
}
