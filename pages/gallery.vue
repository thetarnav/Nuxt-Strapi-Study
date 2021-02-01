<template>
	<div class="page gallery">
		<header
			class="gallery-header hide-me"
			:class="{ hidden: showFullFilters || showLineFilters }"
		>
			<h2 class="gallery-title">Galeria</h2>
			<div class="side-filters-group">
				<FilterPill
					v-for="(filter, index) in onSideFilters"
					:key="filter.name"
					:tag="filter.name"
					:icon="filter.icon"
					:selected="filter.isSelected"
					:color="filter.color"
					:class="{ 'raise-me': index < 3 }"
					@select="selectFilter"
					>{{ filter.title }}</FilterPill
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
		<transition name="blur-top" duration="300">
			<div v-if="showFullFilters" class="full-filters-group">
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
				<button class="close-button btn-dark" @click="toggleFullFilters">
					<Icon icon="times" class="icon"></Icon>
				</button>
			</div>
		</transition>
		<transition name="line-filters">
			<div
				v-if="showLineFilters"
				class="line-filters-group hide-me"
				:class="{ hidden: showFullFilters }"
			>
				<FilterPill
					v-for="filter in filters"
					:key="filter.name"
					:tag="filter.name"
					:selected="filter.isSelected"
					:color="filter.color"
					@select="selectFilter"
					>{{ filter.title }}</FilterPill
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
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import debounce from 'lodash.debounce'
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
			showFullFilters: false,
			showLineFilters: false,
			debounceScroll: () => {},
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

		interface Category {
			title: string
			name: string
		}

		// Later from API:
		const otherCategories: Category[] = [
			{ title: 'Przykład', name: 'example' },
			{ title: 'Kolejny', name: 'another' },
		]

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
					'shopping-bag',
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
	computed: {
		onSideFilters(): Filter[] {
			return this.filters.filter(
				(filter, index) =>
					index < 4 || ['available', 'new'].includes(filter.name),
			)
		},
	},
	mounted() {
		this.debounceScroll = debounce(this.handleScroll, 200, { maxWait: 300 })

		// Scroll below upper swipe padding at the beginning
		this.$nextTick(() =>
			window.scrollTo({
				top: this.$store.state.application.swipeVerticalPadding,
			}),
		)

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
		handleScroll() {
			this.showLineFilters =
				window.scrollY >
				this.$store.state.application.swipeVerticalPadding + 90
			console.log(window.scrollY)
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
	min-height: 150vh;
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
	backdrop-filter: blur(20px);

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
