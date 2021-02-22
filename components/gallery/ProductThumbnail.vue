<template>
	<figure class="product-wrapper bg-gray-100 rounded-xl">
		<transition name="fade" mode="out-in">
			<!-- Product -->
			<a
				v-if="!showSkeleton"
				:key="'product' + listIndex"
				class="product text-gray-900"
				@click="openProduct()"
			>
				<div class="thumbnail-wrapper relative">
					<div
						class="product-thumbnail rounded-xl"
						:lazy-background="product.thumbnail"
					></div>
					<div
						class="absolute top-2 right-0 -mr-2 flex flex-col space-y-2"
					>
						<div v-if="product.isAvailable" class="badge bg-primary">
							a
						</div>
						<div v-if="product.isNew" class="badge bg-secondary">n</div>
						<div v-if="product.isPopular" class="badge bg-gray-800">
							p
						</div>
					</div>
				</div>
				<caption class="product-title text-left px-4 py-2">
					{{
						product.title
					}}
				</caption>
			</a>
			<!-- Skeleton -->
			<div v-else :key="'skeleton' + listIndex" class="product skeleton">
				<div class="product-thumbnail rounded-xl"></div>
				<p class="product-title mx-4 my-2 mt-4"></p>
				<p class="product-title mx-4 my-2 mb-4"></p>
			</div>
		</transition>
	</figure>
</template>

<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import { ProductThumbnail } from '~/assets/js/queries'

export default Vue.extend({
	name: 'ProductThumbnail',
	props: {
		data: {
			type: Object,
			default: null,
		},
		listIndex: {
			type: Number,
			required: true,
		},
		showSkeleton: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		product() {
			const data = this.data as ProductThumbnail | null,
				value = {
					title: '',
					id: '',
					thumbnail: '',
					isAvailable: false,
					isNew: false,
					isPopular: false,
				}

			if (data) {
				const { title, id, thumbnail, isAvailable, timestamp, views } = data
				value.title = title
				value.id = id
				value.thumbnail =
					thumbnail.formats?.large?.url ?? thumbnail?.url ?? ''
				value.isAvailable = isAvailable ?? false
				value.isNew =
					Math.min(this.$lastVisit, Date.now() - 6.048e8) < timestamp
				value.isPopular = views > 100
			}
			return value
		},
	},
	methods: {
		openProduct(): void {
			const { id } = this.product,
				query = qs.stringify(this.$route.query)
			this.$router.push(this.localePath(`/gallery/${id}?${query}`))
		},
	},
})
</script>

<style lang="scss" scoped>
.product-thumbnail {
	// border-radius: 20px;
	aspect-ratio: 1/1;
	padding-bottom: 100%;
	background-size: cover;
	background-position: center;
	@include skeleton($before: true, $loaded-target: '.isLoaded');
	// @apply overflow-visible;
}
.product-title {
	@include limit-lines(2);
}

.skeleton {
	.product-title {
		width: 80%;
		height: 10px;
		border-radius: 20px;
		@include skeleton;
		&:first-of-type {
			// margin-top: 16px;
		}
		&:last-of-type {
			width: 40%;
			// margin-bottom: 16px;
		}
	}
}

.badge {
	@apply h-6 rounded text-white text-center;
	min-width: theme('spacing.6');
}

.dark {
	@apply bg-gray-700;
	.product-title {
		@apply text-gray-100;
	}
}
</style>
