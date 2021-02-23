<template>
	<!-- <main > -->
	<span>
		<transition-group
			appear
			name="fade"
			tag="main"
			class="gallery-grid overflow-hidden p-6 grid grid-cols-2 gap-4 items-start"
			:class="{ 'hide-results': hideResults }"
		>
			<ProductThumbnail
				v-for="(product, index) in products"
				:key="`${index}`"
				:data="product.data"
				:list-index="index"
				:show-skeleton="!product.isLoaded || hideResults"
			/>
		</transition-group>
		<GlobalEvents @scroll="debouncedScroll" />
	</span>

	<!-- </main> -->
</template>

<script lang="ts">
import debounce from 'lodash.debounce'
import remove from 'lodash.remove'
import Vue from 'vue'
import {
	ProductThumbnail,
	ProductsResponse,
	availableProductsQuery,
	newProductsQuery,
	productsOfCategoryQuery,
	noCategoryProductsQuery,
	allProductsQuery,
} from '~/assets/js/queries'
import { RootState } from '~/store'

interface Product {
	data?: ProductThumbnail
	isLoaded: boolean
}

let retryCount = 0

export default Vue.extend({
	name: 'GalleryGrid',
	props: {
		uid: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			products: [] as Product[],
			hideResults: false,
			debouncedFetch: () => {},
			debouncedScroll: () => {},
			reachedEnd: false,
			paginationStart: 0,
		}
	},
	watch: {
		uid() {
			this.hideResults = true
			this.debouncedFetch()
		},
	},
	mounted() {
		this.hideResults = false
		this.debouncedFetch = debounce(this.filterChange, 800)
		this.debouncedScroll = debounce(this.scroll, 100, { maxWait: 300 })
		this.debouncedFetch()
	},
	methods: {
		scroll() {
			/**
			 * Fetch more products when user scrolls to the bottom of the Grid.
			 */
			if (
				this.reachedEnd ||
				this.products.filter(({ isLoaded }) => isLoaded).length === 0 ||
				this.hideResults
			)
				return

			const { scrollHeight } = document.scrollingElement || this.$el,
				fromBottom = scrollHeight - window.scrollY - window.innerHeight

			if (fromBottom <= 100) this.fetchProducts()
		},
		filterChange() {
			this.reachedEnd = false
			this.paginationStart = 0
			this.fetchProducts(true)
		},
		async fetchProducts(replace: boolean = false): Promise<void> {
			interface QueryVaraibles {
				start: number
				limit: number
				id?: string
				timestamp?: number
			}

			const { id, uid, paginationStart } = this,
				limit = 8,
				variables: QueryVaraibles = {
					start: paginationStart,
					limit,
				}
			let query: string

			this.paginationStart += limit

			if (replace) this.products = []

			/**
			 * Append Skeleton Fields
			 */
			const skeletonProducts: Product[] = []

			for (let i = paginationStart; i < paginationStart + limit; i++) {
				skeletonProducts.push({ isLoaded: false })
			}
			this.products.push(...skeletonProducts)

			/**
			 * Get QUERY:
			 */
			if (uid === '') query = allProductsQuery
			else if (uid === 'available') query = availableProductsQuery
			else if (uid === 'new') {
				query = newProductsQuery
				const weekAgo = Date.now() - 6.048e8,
					lastVisit = this.$lastVisit
				variables.timestamp = Math.min(lastVisit, weekAgo)
			} else if (uid === 'other') query = noCategoryProductsQuery
			else if (id) {
				query = productsOfCategoryQuery
				variables.id = id
			} else return

			/**
			 * Fetch Products:
			 */
			try {
				const data = await this.$graphql.request<ProductsResponse>(
						query,
						variables,
					),
					products = data.category?.products ?? data?.products ?? []
				// ,
				// productCapsules = products.map(product => ({ data: product }))

				products.forEach((product, index) => {
					skeletonProducts[index].data = product
					skeletonProducts[index].isLoaded = true
				})

				// Did reach the END?:
				if (products.length < limit) {
					this.reachedEnd = true
					remove(this.products, ({ isLoaded }) => !isLoaded)
				}

				// replace
				// 	? (this.products = productCapsules)
				// 	: this.products.push(...productCapsules)
			} catch (error) {
				/**
				 * If Fetching Data FAILS:
				 */
				this.paginationStart -= limit
				this.products.splice(this.products.length - limit, 8)
				retryCount++
				if (retryCount < 4) setTimeout(this.fetchProducts, 500)
				else window.addEventListener('online', () => this.fetchProducts())
			}

			this.hideResults = false
		},
	},
})
</script>
