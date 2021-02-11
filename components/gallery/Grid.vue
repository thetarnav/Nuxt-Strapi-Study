<template>
	<div class="gallery-grid" :class="{ 'hide-results': hideResults }">
		<a
			v-for="product in products"
			:key="product.id"
			class="product"
			@click="openProduct(product.id)"
		>
			<img :src="getImageUrl(product)" />
			<p>
				{{ product.title }}
			</p>
		</a>
		<GlobalEvents @scroll="debouncedScroll" />
	</div>
</template>

<script lang="ts">
import debounce from 'lodash.debounce'
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
			products: [] as ProductThumbnail[],
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
			if (this.reachedEnd || this.products.length === 0) return

			const { scrollHeight } = document.scrollingElement || this.$el,
				fromBottom = scrollHeight - window.scrollY - window.innerHeight

			if (fromBottom <= 100) this.fetchProducts()
		},
		getImageUrl(product: ProductThumbnail): string {
			return (
				product.thumbnail?.formats.small.url ?? product.thumbnail?.url ?? ''
			)
		},
		filterChange() {
			this.reachedEnd = false
			this.paginationStart = 0
			this.fetchProducts(true)
		},
		async fetchProducts(replace: boolean): Promise<void> {
			interface QueryVaraibles {
				start: number
				limit: number
				id?: string
				timestamp?: number
			}

			const { id, uid } = this,
				limit = 8,
				variables: QueryVaraibles = {
					start: this.paginationStart,
					limit,
				}
			let query: string

			this.paginationStart += limit

			if (uid === '') query = allProductsQuery
			else if (uid === 'available') query = availableProductsQuery
			else if (uid === 'new') {
				query = newProductsQuery
				variables.timestamp = this.$lastVisit
			} else if (uid === 'other') query = noCategoryProductsQuery
			else if (id) {
				query = productsOfCategoryQuery
				variables.id = id
			} else return

			try {
				const data = await this.$graphql.request<ProductsResponse>(
						query,
						variables,
					),
					products = data.category?.products ?? data?.products ?? []

				// Update Component DATA:
				if (products.length < limit) this.reachedEnd = true
				replace
					? (this.products = products)
					: this.products.push(...products)
			} catch (error) {
				this.paginationStart -= limit
				console.error(error)
			}

			this.hideResults = false
		},
		openProduct(productId: ProductThumbnail['id']): void {
			this.$router.push({
				params: { productId },
				query: { ...this.$route.query, productId },
			})
		},
	},
})
</script>

<style lang="scss" scoped>
.gallery-grid {
	// background: $gray9;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
}
.hide-results {
	background: $gray9;
}
</style>
