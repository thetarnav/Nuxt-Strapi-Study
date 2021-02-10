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
		this.debouncedFetch = debounce(this.fetchProducts, 800)
		this.debouncedFetch()
	},
	methods: {
		getImageUrl(product: ProductThumbnail): string {
			return (
				product.thumbnail?.formats.small.url ?? product.thumbnail?.url ?? ''
			)
		},
		async fetchProducts(): Promise<void> {
			interface Varaibles {
				start?: number
				id?: string
				timestamp?: number
			}

			const { id, uid } = this,
				variables: Varaibles = {
					start: 0,
				}
			let query: string

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
				)
				this.products = data.category?.products ?? data?.products ?? []
			} catch (error) {
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
