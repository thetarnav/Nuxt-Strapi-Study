<template>
	<div class="gallery-grid" :class="{ 'hide-results': hideResults }">
		<a v-for="product in products" :key="product.id" class="product">
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
	async fetch() {
		/**
		 * 1. Takes filters from URL query
		 * 2. Calls displaySearch
		 */
		const filters = this.getSelectedFromURL()

		await this.displaySearch(filters)
	},
	watch: {
		selected() {
			this.hideResults = true
			this.debouncedDisplay()
		},
	},
	mounted() {
		setTimeout(() => {
			this.hideResults = false
			this.debouncedDisplay = debounce(this.displaySearch, 800)
		}, 500)
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
		async displaySearch(fetchCategories?: string[]) {
			this.hideResults = false
			// if (this.displayedInitially)
			const categories =
				fetchCategories ?? filterStringArray([...this.selected]) ?? []
			interface Query {
				[key: string]: string | boolean | number
			}
			let query: undefined | string | Query
			// If selected AVAILABLE
			if (categories.includes('available')) query = { Available: true }
			// If selected NEW
			else if (categories.includes('new'))
				query = { Timestamp_gte: 1611103552796 }
			// If selected OTHER
			else if (categories.includes('other')) {
				// Only OTHER
				if (categories.length === 1) query = { product_category_null: true }
				// OTHER with some other filters
				else
					query = stringify({
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
					})
			} else if (categories.length === 0) query = undefined
			// If selected any number of product categories
			else
				query = stringify({
					_where: {
						'product_category.CategoryID': categories as any,
					},
				})

			this.products = await this.$strapi.find('products', query)
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
