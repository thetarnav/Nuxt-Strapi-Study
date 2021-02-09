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
				{{ product.Name }}
			</p>
		</a>
	</div>
</template>

<script lang="ts">
import debounce from 'lodash.debounce'
import stringify from 'qs-stringify'
import Vue from 'vue'

interface ImageFromat {
	url: string
	height: number
	width: number
}
interface Image extends ImageFromat {
	formats: {
		thumbnail: ImageFromat
		small: ImageFromat
		medium: ImageFromat
		large: ImageFromat
	}
}
interface Product {
	id: number
	Available: boolean
	Images: Image[]
	Name: string
	Timestamp: number
	Slug: string
}

export default Vue.extend({
	name: 'GalleryGrid',
	props: {
		selected: {
			type: Set,
			required: true,
		},
	},
	data() {
		return {
			products: [] as Product[],
			hideResults: false,
			debouncedDisplay: () => {},
		}
	},
	watch: {
		selected() {
			this.hideResults = true
			this.debouncedDisplay()
		},
	},
	mounted() {
		this.hideResults = false
		this.debouncedDisplay = debounce(this.displaySearch, 800)
		this.debouncedDisplay()
	},
	methods: {
		getImageUrl(product: Product): string {
			const host = process.env.strapiUrl,
				url = product.Images[0]?.formats.small.url ?? product.Images[0]?.url
			if (!url) return ''
			return `http://${host}${url}`
		},
		getSelectedFromURL() {
			const { filters: queryFilters } = this.$route.query

			// For array query
			if (typeof queryFilters === 'object')
				return queryFilters.filter(
					item => typeof item === 'string',
				) as string[]
			// For string query
			else if (typeof queryFilters === 'string') return [queryFilters]
		},
		async displaySearch() {
			this.hideResults = false

			const categories = filterStringArray([...this.selected]) ?? []
			interface Query {
				[key: string]: string | boolean | number | Query | any
			}
			let query: Query = {}
			// If selected AVAILABLE
			if (categories.includes('available')) query = { Available: true }
			// If selected NEW
			else if (categories.includes('new'))
				query = { Timestamp_gte: this.$lastVisit }
			// If selected OTHER
			else if (categories.includes('other')) {
				// Only OTHER
				if (categories.length === 1) query = { product_category_null: true }
				// OTHER with some other filters
				else
					query = {
						_where: {
							_or: [
								{
									'product_category.CategoryID': categories.filter(
										item => item !== 'other',
									) as any,
								},
								{
									product_category_null: true as any,
								},
							],
						},
					}
			} else if (categories.length === 0) query = {}
			// If selected any number of product categories
			else
				query = {
					_where: {
						'product_category.CategoryID': categories as any,
					},
				}

			query._sort = 'Timestamp:desc'

			this.products = await this.$strapi.find('products', stringify(query))
		},
		openProduct(productId: number): void {
			// this.$store.commit('openProduct', productId)
			this.$router.push({
				params: { productId: productId.toString() },
				query: { ...this.$route.query, productId: productId.toString() },
			})
		},
	},
})

function filterStringArray(array: unknown[]): string[] {
	// eslint-disable-next-line valid-typeof
	return array.filter(item => typeof item === 'string') as string[]
}
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
