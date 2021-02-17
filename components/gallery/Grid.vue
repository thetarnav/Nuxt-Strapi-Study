<template>
	<!-- <main > -->
	<span>
		<transition-group
			appear
			name="fade"
			tag="main"
			class="gallery-grid"
			:class="{ 'hide-results': hideResults }"
		>
			<figure
				v-for="(product, index) in products"
				:key="`${index}`"
				class="product-wrapper"
			>
				<transition name="fade" mode="out-in">
					<!-- Product -->
					<a
						v-if="product.isLoaded && !hideResults"
						:key="'product' + index"
						class="product"
						@click="openProduct(getData(product).id)"
					>
						<div
							class="product-thumbnail"
							:lazy-background="getData(product).thumbnail"
						></div>
						<p class="product-title">
							{{ getData(product).title }}
						</p>
					</a>
					<!-- Skeleton -->
					<div v-else :key="'skeleton' + index" class="product skeleton">
						<div class="product-thumbnail"></div>
						<p class="product-title"></p>
						<p class="product-title"></p>
					</div>
				</transition>
			</figure>
		</transition-group>
		<GlobalEvents @scroll="debouncedScroll" />
	</span>

	<!-- </main> -->
</template>

<script lang="ts">
import debounce from 'lodash.debounce'
import remove from 'lodash.remove'
import qs from 'qs'
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
			// hash: random(0, 10000),
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
			if (this.reachedEnd || this.products.length === 0) return

			const { scrollHeight } = document.scrollingElement || this.$el,
				fromBottom = scrollHeight - window.scrollY - window.innerHeight

			if (fromBottom <= 100) this.fetchProducts()
		},
		getData(product: Product) {
			const value = {
				title: '',
				id: '',
				thumbnail: '',
			}

			if (product?.data) {
				const {
					data: { title, id, thumbnail },
				} = product
				value.title = title
				value.id = id
				value.thumbnail =
					thumbnail.formats?.large?.url ?? thumbnail?.url ?? ''
			}
			return value
		},
		filterChange() {
			this.reachedEnd = false
			this.paginationStart = 0
			// this.hash = random(0, 10000)
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
		openProduct(productId: ProductThumbnail['id']): void {
			const query = qs.stringify(this.$route.query)
			this.$router.push(`gallery/${productId}?${query}`)
		},
	},
})
</script>

<style lang="scss" scoped>
.gallery-grid {
	// background: $gray9;
	display: grid;
	// grid-template-columns: repeat(2, 1fr);
	grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
	grid-gap: 20px;
	padding: 20px;
}
// .hide-results {
// 	// background: $gray9;
// 	.product:not(.skeleton) {
// 		> * {
// 			opacity: 0;
// 		}
// 	}
// }
.product-wrapper {
	overflow: hidden;
	border-radius: 20px;
	background-color: $gray9;
}
.product {
	padding: 0;
}
.product-thumbnail {
	border-radius: 20px;
	aspect-ratio: 1/1;
	padding-bottom: 100%;
	background-size: cover;
	background-position: center;
	@include skeleton($before: true, $loaded-target: '.isLoaded');
}
.product-title {
	margin: 10px 16px;
}

.skeleton {
	.product-title {
		width: 80%;
		height: 10px;
		border-radius: 20px;
		@include skeleton;
		&:first-of-type {
			margin-top: 16px;
		}
		&:last-of-type {
			width: 40%;
			margin-bottom: 16px;
		}
	}
}
</style>
