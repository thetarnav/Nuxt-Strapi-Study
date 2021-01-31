<template>
	<div class="page gallery">
		<header class="gallery-header">
			<h2 class="gallery-title">Galeria</h2>
			<div class="filters-group">
				<FilterPill
					v-for="filter in filters"
					:key="filter.name"
					:tag="filter.name"
					:icon="filter.icon"
					:selected="filter.isSelected"
					:color="filter.color"
					@select="selectFilter"
					>{{ filter.title }}</FilterPill
				>
			</div>
		</header>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PillSelectPayload } from '~/components/gallery/FilterPill.vue'
import { ProductTag, pages } from '~/plugins/types'

class Filter {
	title
	name
	icon
	color
	isSpecial
	isSelected
	constructor(
		title: String,
		name: ProductTag,
		icon: string | null = null,
		color: 'primary' | 'secondary' | 'black' = 'black',
		isSpecial = false,
		isSelected = false,
	) {
		this.title = title
		this.name = name
		this.icon = icon
		this.color = color
		this.isSpecial = isSpecial
		this.isSelected = isSelected
	}
}

export default Vue.extend({
	name: 'Gallery',
	layout: 'galleryLayout',
	scrollToTop: false,
	data() {
		return {
			// selectedFilters: new Set() as Set<ProductTag>,
			filters: [] as Filter[],
			filtersIndexes: {},
		}
	},
	fetch() {
		// Add filters from pages
		pages.forEach(page => {
			const { name, icon, title } = page

			// Ignore Home and Gallery
			if (['gallery', 'index'].includes(name)) return

			this.filters.push(new Filter(title, name, icon))
		})

		// Later from API:
		const otherCategories = [{ title: 'Przykład', name: 'example' }]

		// Add filters from Database
		otherCategories.forEach(category =>
			this.filters.push(new Filter(category.title, category.name)),
		)

		// Add 'other' filter
		this.filters.push(new Filter('Inne', 'others'))

		// Add new and available
		this.filters.push(
			...[
				new Filter(
					'Dostępne',
					'available',
					'image',
					'primary',
					true,
					false,
				),
				new Filter('Nowe', 'new', null, 'secondary', true, false),
			],
		)

		// Create Dictionary containing indexes of specific filters in 'this.filters' array, to avoid iterating over every time when you want to find some by name
		this.filters.forEach(
			(filter, index) => (this.filtersIndexes[filter.name] = index),
		)
	},
	head() {
		return {
			title: 'Renkidzieło - Galeria',
		}
	},
	mounted() {
		// Scroll below upper swipe padding at the beginning
		this.$nextTick(() => window.scrollTo({ top: 120 }))

		// Select filters from URL
		;(() => {
			const { filtersIndexes, filters } = this,
				filtersQuery = this.$route.query.filters as
					| string
					| string[]
					| undefined

			if (!filtersQuery) return
			if (typeof filtersQuery === 'string') {
				if (filters[filtersIndexes[filtersQuery]])
					filters[filtersIndexes[filtersQuery]].isSelected = true
			} else
				filtersQuery.forEach((filterName: string) => {
					if (filters[filtersIndexes[filterName]])
						filters[filtersIndexes[filterName]].isSelected = true
				})
		})()
	},
	methods: {
		selectFilter(payload: PillSelectPayload) {
			const { filters, filtersIndexes } = this,
				{ tag: name, selected: isSelected } = payload,
				filter = filters[filtersIndexes[name]]
			if (!filter) return

			if (isSelected) {
				// When selecting special filter:
				if (filter.isSpecial)
					filters.forEach(item => (item.isSelected = false))
				// When selecting category filter:
				else
					filters.forEach(
						item =>
							(item.isSelected = item.isSpecial
								? false
								: item.isSelected),
					)
			}

			filter.isSelected = isSelected

			/**
			 * Set URL query to the selected filters:
			 */
			const selectedFilters = filters
				.filter(item => item.isSelected)
				.map(item => item.name)

			this.$router.push({
				query: {
					...this.$route.query,
					filters:
						selectedFilters.length > 0 ? selectedFilters : undefined,
				},
			})
		},
	},
})
</script>

<style lang="scss">
.gallery {
	padding-top: 10px;
}
.gallery-title {
	margin-right: 10px;
}
.gallery-header {
	display: flex;
	position: relative;
	margin-right: calc(var(--page-margin) * -1);
}
.filters-group {
	display: flex;
	flex-wrap: wrap;
	> * {
		margin: 6px;
	}
}
</style>
