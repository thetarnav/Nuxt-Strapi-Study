<template>
	<div class="page gallery">
		<header
			class="gallery-header hide-me py-4 bg-gray-100"
			:class="{ hidden: showFullFilters || showLineFilters }"
		>
			<h3 class="ml-6 mr-4 mt-1">Galeria</h3>
			<!-- Side Group Filters -->
			<div class="side-filters-group flex flex-wrap">
				<FilterPill
					v-for="(filter, index) in onSideFilters"
					:key="filter.uid"
					class="m-1"
					:tag="filter.uid"
					:icon="filter.icon"
					:selected="selectedFilter"
					:color="filter.color"
					:class="{ 'raise-me': index < 3 }"
					@select="selectFilter"
					>{{
						$te(`filter.${filter.uid}`)
							? $t(`filter.${filter.uid}`)
							: filter.name
					}}</FilterPill
				>
				<!-- Skeleton -->
				<template v-if="filters.length === 0">
					<div class="pill m-1 pill--loading"></div>
					<div class="pill m-1 pill--loading"></div>
					<div class="pill m-1 pill--loading"></div>
					<div class="pill m-1 pill--loading"></div>
				</template>
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
					:selected="selectedFilter"
					:color="filter.color"
					@select="selectFilter"
					>{{
						$te(`filter.${filter.uid}`)
							? $t(`filter.${filter.uid}`)
							: filter.name
					}}</FilterPill
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
				class="line-filters-group hide-me bg-gray-100 w-screen flex space-x-2 py-3 px-4 overflow-x-scroll"
				:class="{ hidden: showFullFilters }"
			>
				<FilterPill
					v-for="filter in availableFilters"
					:key="filter.uid"
					:tag="filter.uid"
					:selected="selectedFilter"
					:color="filter.color"
					@select="selectFilter"
					>{{
						$te(`filter.${filter.uid}`)
							? $t(`filter.${filter.uid}`)
							: filter.name
					}}</FilterPill
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
		<Grid :id="selectedFilterID" :uid="selectedFilter" />

		<transition name="quick-fade" appear>
			<nuxt-child v-if="showOverlay" />
		</transition>
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
			selectedFilter: '',
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
		showOverlay(): boolean {
			const { params, query } = this.$route
			return params.productId !== undefined || query.productId !== undefined
		},
		availableFilters(): Filter[] {
			const { areAvailableProducts, areNewProducts, areOtherProducts } = this
					.$store.state as RootState,
				namesToDelete: string[] = []

			!areNewProducts && namesToDelete.push('new')
			!areAvailableProducts && namesToDelete.push('available')
			!areOtherProducts && namesToDelete.push('other')
			return this.filters.filter(({ uid }) => !namesToDelete.includes(uid))
		},
		onSideFilters(): Filter[] {
			return this.availableFilters.filter(
				({ uid }, index) => index < 4 || ['available', 'new'].includes(uid),
			)
		},
		selectedFilterID(): string {
			return (
				this.filters.find(({ uid }) => uid === this.selectedFilter)?.id ??
				''
			)
		},
	},
	mounted() {
		this.debounceScroll = debounce(this.handleScroll, 180, { maxWait: 250 })

		// Scroll below upper swipe padding at the beginning
		this.$nextTick(() => {
			window.scrollTo({
				top: this.$store.state.swipeVerticalPadding,
			})
		})

		// Sets Last Visit Timestamp when the gallery is visited
		localStorage.setItem('lastVisit', Date.now().toString())

		// Select filters from Query if didn't on fetch
		if (!this.$fetchState.pending) this.selectFilterFromQuery()
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
					),
					new Filter('Nowe', 'new', null, null, 'secondary', true),
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
			const filtersQuery = this.$route.query.filter as string | undefined

			if (!filtersQuery) return
			if (typeof filtersQuery === 'string')
				this.selectedFilter = filtersQuery
		},
		handleScroll() {
			this.showLineFilters =
				window.scrollY > this.$store.state.swipeVerticalPadding + 90
		},
		toggleFullFilters() {
			this.showFullFilters = !this.showFullFilters
		},
		selectFilter(payload: PillSelectPayload) {
			const { tag: name, selected: isSelected } = payload

			// Select clicked Filter and diselect the others.
			// or diselect clicked.
			this.selectedFilter = isSelected ? name : ''

			// Update URL Query
			this.$router.push(
				this.localePath({
					query: {
						...this.$route.query,
						filter: isSelected ? name : undefined,
					},
				}),
			)
		},
	},
})
</script>

<style lang="scss" scoped>
.gallery-header {
	display: flex;
	position: relative;
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

.loading-pill {
	width: 20vw;
	height: 35px;
	background: gray;
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

	@include hide-scrollbar;

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
