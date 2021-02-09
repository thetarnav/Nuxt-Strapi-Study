<template>
	<div class="page gallery">
		<header
			class="gallery-header hide-me"
			:class="{ hidden: showFullFilters || showLineFilters }"
		>
			<h2 class="gallery-title">Galeria</h2>
			<!-- Side Group Filters -->
			<div class="side-filters-group">
				<FilterPill
					v-for="(filter, index) in onSideFilters"
					:key="filter.uid"
					:tag="filter.uid"
					:icon="filter.icon"
					:selected="filter.isSelected"
					:color="filter.color"
					:class="{ 'raise-me': index < 3 }"
					@select="selectFilter"
					>{{ filter.name }}</FilterPill
				>
				<div
					v-if="filters.length > 6"
					class="show-more"
					@click="toggleFullFilters"
				>
					<div class="filter-pill">
						<Icon icon="ellipsis-h" class="icon alone"></Icon>
					</div>
				</div>
			</div>
		</header>
		<!-- Full View Filters -->
		<transition name="blur-top" duration="300">
			<div v-if="showFullFilters" class="full-filters-group">
				<FilterPill
					v-for="filter in availableFilters"
					:key="filter.uid"
					:tag="filter.uid"
					:icon="filter.icon"
					:selected="filter.isSelected"
					:color="filter.color"
					@select="selectFilter"
					>{{ filter.name }}</FilterPill
				>
				<button class="close-button btn-dark" @click="toggleFullFilters">
					<Icon icon="times" class="icon"></Icon>
				</button>
			</div>
		</transition>
		<!-- Single line Filters -->
		<transition name="line-filters">
			<div
				v-if="showLineFilters"
				class="line-filters-group hide-me"
				:class="{ hidden: showFullFilters }"
			>
				<FilterPill
					v-for="filter in availableFilters"
					:key="filter.uid"
					:tag="filter.uid"
					:selected="filter.isSelected"
					:color="filter.color"
					@select="selectFilter"
					>{{ filter.name }}</FilterPill
				>
				<div
					v-if="filters.length > 6"
					class="show-more"
					@click="toggleFullFilters"
				>
					<div class="filter-pill">
						<Icon icon="ellipsis-h" class="icon alone"></Icon>
					</div>
				</div>
			</div>
		</transition>
		<GlobalEvents @scroll="debounceScroll" />

		<!-- Gallery Grid -->
		<Grid :selected="selectedFilters" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import debounce from 'lodash.debounce'
import cloneDeep from 'lodash.clonedeep'
import { CategoriesResponse, categoriesQuery } from '~/assets/js/queries'
import { PillSelectPayload } from '~/components/gallery/FilterPill.vue'
import { ProductTag, pages, Filter } from '~/types/types'
import { RootState } from '~/store'

interface FilterIndexes {
	[name: string]: number
}

export default Vue.extend({
	name: 'Gallery',
	layout: 'galleryLayout',
	scrollToTop: false,
	data() {
		return {
			// Raw input from API:
			filters: [] as Filter[],
			//
			filtersIndexes: {} as FilterIndexes,
			showFullFilters: false,
			showLineFilters: false,
			debounceScroll: () => {},
		}
	},
	async fetch() {
		let filters: Filter[]

		if (this.$store.state.filters.length === 0) {
			filters = await this.generateFilters()
			this.$store.commit('setFilters', filters)
		} else filters = cloneDeep((this.$store.state as RootState).filters)

		this.filters = filters

		this.createFilterIndexes()
		this.selectFilterFromQuery()
	},
	head() {
		return {
			title: 'Renkidzieło - Galeria',
		}
	},
	computed: {
		availableFilters(): Filter[] {
			const { newProductsCount, areAvailable } = this.$store
					.state as RootState,
				namesToDelete: string[] = []

			if (newProductsCount === 0) namesToDelete.push('new')
			if (!areAvailable) namesToDelete.push('available')

			return this.filters.filter(
				filter => !namesToDelete.includes(filter.name),
			)
		},
		selectedFilters(): Set<string> {
			const selectedArray = this.availableFilters
				.filter(filter => filter.isSelected)
				.map(filter => filter.name)
			return new Set(selectedArray)
		},
		onSideFilters(): Filter[] {
			return this.availableFilters.filter(
				(filter, index) =>
					index < 4 || ['available', 'new'].includes(filter.name),
			)
		},
	},
	mounted() {
		this.debounceScroll = debounce(this.handleScroll, 200, { maxWait: 300 })

		// Scroll below upper swipe padding at the beginning
		this.$nextTick(() => {
			window.scrollTo({
				top: this.$store.state.swipeVerticalPadding,
			})
		})

		// Sets Last Visit Timestamp when the gallery is visited
		localStorage.setItem('lastVisit', Date.now().toString())
	},
	methods: {
		async generateFilters(): Promise<Filter[]> {
			const filters: Filter[] = []

			// Fetching Product Categories from Strapi API
			try {
				const data: CategoriesResponse = await this.$graphql.request(
						categoriesQuery,
					),
					{ categories } = data

				// Turn categories to filters
				filters.push(
					...categories.map<Filter>(({ id, uid, name }) => {
						const icon =
							pages.find(({ name }) => name === uid)?.icon ?? null
						return new Filter(name, uid, id, icon)
					}),
				)
			} catch (error) {
				console.error(error)
				return []
			}

			// Add 'other', new and available filters
			filters.push(
				...[
					new Filter('Inne', 'other'),
					new Filter(
						'Dostępne',
						'available',
						null,
						'shopping-bag',
						'primary',
						true,
						false,
					),
					new Filter('Nowe', 'new', null, null, 'secondary', true, false),
				],
			)

			return filters
		},
		/**
		 * Create Dictionary containing indexes of specific filters in 'this.filters' array, to avoid iterating over every time when you want to find some by name
		 */
		createFilterIndexes() {
			const filtersIndexes = {}
			this.filters.forEach(
				(filter, index) => (filtersIndexes[filter.uid] = index),
			)
			this.filtersIndexes = filtersIndexes
		},
		selectFilterFromQuery() {
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
		},
		handleScroll() {
			this.showLineFilters =
				window.scrollY > this.$store.state.swipeVerticalPadding + 90
		},
		toggleFullFilters() {
			this.showFullFilters = !this.showFullFilters
		},
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

<style lang="scss" scoped>
.gallery {
	padding-top: 10px;
	min-height: 100vh;
}
.gallery-title {
	margin-right: 10px;
}
.gallery-header {
	display: flex;
	position: relative;
	margin-right: calc(var(--page-margin) * -1);
}

.hide-me {
	transition: opacity 0.3s 0.1s, transform 0.3s 0.1s;
	&.hidden {
		transition: opacity 0.2s, transform 0.2s;
		opacity: 0;
		transform: translateY(-20px);
	}
}

.side-filters-group {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	> * {
		margin: 6px;
	}
	.show-more {
		position: absolute;
		z-index: 10;
		$pill-height: 34px;
		$v-margin: 6px;
		top: $pill-height + 2 * $v-margin;
		right: var(--page-margin);

		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			top: -2px;
			bottom: -2px;
			right: calc(var(--page-margin) * -1 - 2px);
			width: 40vw;
			background: linear-gradient(90deg, transparent, $white, $white);
		}
	}
	.raise-me {
		position: relative;
		z-index: 20;
	}
}

.full-filters-group {
	position: fixed;
	z-index: 40;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
	> * {
		margin: 6px;
	}

	background: $gray9;

	.close-button {
		$size: 50px;
		border-radius: 50%;
		width: $size;
		height: $size;
		display: flex;
		padding: 0;
		margin: 0;
		> * {
			margin: auto;
		}

		.icon {
			$icon-size: 24px;
			height: $icon-size;
			width: $icon-size;
		}

		position: absolute;
		top: calc(100% - #{$size} / 2);
		right: var(--page-margin);
	}
}

.line-filters-group {
	position: fixed;
	z-index: 30;
	top: 0;
	left: 0;
	// right: 0;
	min-width: 100vw;
	display: flex;
	$group-bg: rgba($gray9, 0.5);
	background: $gray9;
	// backdrop-filter: blur(20px);

	padding: 10px;
	> * {
		margin: 6px;
	}

	.show-more {
		position: absolute;
		z-index: 40;
		// $pill-height: 34px;
		// $v-margin: 6px;
		top: 10px;
		left: calc(100vw - var(--page-margin));
		transform: translateX(-100%);
		// right: var(--page-margin);

		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			top: -2px;
			bottom: -2px;
			right: calc(var(--page-margin) * -1 - 2px);
			width: 30vw;
			background: linear-gradient(
				90deg,
				transparent,
				$gray9,
				$gray9,
				$gray9
			);
		}
	}
}

.line-filters {
	&-leave-active {
		transition: opacity 0.2s 0.1s, transform 0.3s;
	}
	&-enter-active {
		transition: opacity 0.2s, transform 0.3s;
	}
	&-enter,
	&-leave-to {
		opacity: 0;
		transform: translateY(-100%);
	}
}
</style>
