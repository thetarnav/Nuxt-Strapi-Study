<template>
	<!-- eslint-disable vue/no-v-html -->
	<transition name="quick-fade" appear>
		<div class="product-overlay">
			<div ref="scrollingEl" class="outer-wrapper">
				<!-- <transition name="fade"> -->
				<!-- v-if="!$fetchState.pending"
						:key="id" -->
				<article class="inner-wrapper">
					<transition name="quick-fade" mode="out-in">
						<!-- Slider / Image -->
						<div v-if="!$fetchState.pending" :key="`${id}-Media`">
							<Slider
								v-if="data.slides && data.slides.length > 1"
								:images="data.slides"
							/>
							<figure v-else-if="data.thumbnail" class="thumbnail">
								<img :src="singleImage" alt="product thumbnail" />
							</figure>
						</div>
						<!-- Skeleton -->
						<div
							v-else
							:key="`${id}-Media-Skeleton`"
							class="thumbnail p-12"
						>
							<div
								class="skeleton w-full h-full rounded-2xl opacity-20"
							></div>
						</div>
					</transition>

					<div class="card">
						<!-- Card Buttons -->
						<KeepInView classes="top-buttons-frame stick-top">
							<Button
								leading-icon="chain"
								class="circle top-0 left-0"
								:on-click="copyLink"
							/>
							<Button
								leading-icon="x"
								class="circle top-0 left-0"
								:on-click="closeOverlay"
							/>
						</KeepInView>
						<!-- <transition name="quick-fade" mode="out-in" appear> -->
						<!-- The CONTENT -->
						<main
							v-if="!$fetchState.pending"
							:key="`${id}-content`"
							class="content"
						>
							<header class="header">
								<h2
									class="title"
									:class="{ smaller: BluuTitle.length > 25 }"
								>
									{{ BluuTitle }}
								</h2>
								<h6 v-if="data.number" class="number">
									#{{ data.number }}
								</h6>
							</header>
							<div
								v-if="data.description"
								class="prose"
								v-html="$md.render(data.description)"
							>
								{{ data.description }}
							</div>
							<figure
								v-if="data.table && table.length > 0"
								class="table-wrapper"
							>
								<table class="table">
									<tbody class="table-body">
										<tr
											v-for="(pair, index) in table"
											:key="pair[0] + index"
											class="row"
										>
											<th class="key">{{ pair[0] }}</th>
											<td class="value">{{ pair[1] }}</td>
										</tr>
									</tbody>
								</table>
							</figure>
							<div
								v-if="data.isAvailable"
								class="pb-6 mx-6 mt-2 self-end"
							>
								<p class="text-sm mb-1">
									{{ $t('product.available.info') }}
								</p>
								<KeepInView
									class="keep-height keep-width"
									classes="stick-bottom stick-right"
								>
									<Button
										class="bg-primary primary"
										leading-icon="shopping-bag-full"
										:href="data.shopLink"
									>
										{{ $t('product.available.button') }}
									</Button>
								</KeepInView>
							</div>
						</main>
						<!-- Skeleton Content -->
						<div v-else key="skeleton-content" class="content">
							<div class="header">
								<h6 class="title skeleton mb-4"></h6>
								<h6 class="title skeleton w-4/12"></h6>
							</div>
							<div class="prose pb-6">
								<p class="skeleton"></p>
								<p class="skeleton"></p>
								<p class="skeleton w-9/12"></p>
								<br />
								<p class="skeleton"></p>
								<p class="skeleton"></p>
								<p class="skeleton"></p>
								<p class="skeleton w-4/12"></p>
								<br />
								<p class="skeleton"></p>
								<p class="skeleton"></p>
								<p class="skeleton w-4/12"></p>
							</div>
						</div>
						<!-- </transition> -->
					</div>
					<client-only>
						<footer v-if="ties.length > 1" class="similar-products">
							<h4 class="title">{{ $t('product.similar') }}</h4>
							<div class="list-wrapper">
								<ul class="list">
									<li
										v-for="(tie, index) in similarProducts"
										:key="`${index}`"
										class="list-item"
									>
										<ProductThumbnail
											class="dark"
											:data="tie.data"
											:list-index="index"
											:show-skeleton="!tie.isLoaded"
										/>
										<!-- :show-skeleton="!product.isLoaded || hideResults" -->
									</li>
								</ul>
							</div>
						</footer>
					</client-only>
				</article>
				<!-- </transition> -->
			</div>
			<div class="cover"></div>
		</div>
	</transition>
</template>

<script lang="ts">
import Vue from 'vue'
import remove from 'lodash.remove'
import qs from 'qs'
import {
	fullProductQuery,
	FullProductResponse,
	FullProduct,
	ProductTies,
	productTiesQuery,
	ProductTiesResponse,
	ProductThumbnail,
} from '~/assets/js/queries'

export default Vue.extend({
	name: 'ProductOverlay',
	asyncData({ params, payload }) {
		return {
			id: params.productId || '',
			data: payload ?? {},
		}
	},
	data() {
		return {
			id: '',
			data: {} as FullProduct,
			ties: [] as ProductTies,
			fetchedTies: false,
		}
	},
	async fetch(): Promise<void> {
		const { id, $graphql, data } = this,
			query = fullProductQuery

		// if (data.title) return
		if (!id) {
			this.closeOverlay()
			return
		}

		/**
		 * Fetch Product Data
		 */
		// Fetch only if data is empty
		if (!data.title)
			try {
				const {
					product,
				}: FullProductResponse = await $graphql.request(query, { id })

				this.data = product
			} catch (error) {
				console.error(error)
				this.closeOverlay()
			}

		/**
		 * Fetch Ties
		 */
		await this.fetchTies()
	},
	head() {
		return {
			title: this.$data.data.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.$data.data.description,
				},
			],
		}
	},
	computed: {
		singleImage(): string {
			return (
				this.data.slides?.[0]?.formats.large.url ||
				this.data.thumbnail?.url ||
				''
			)
		},
		BluuTitle(): string {
			const { title } = this.data

			return title
				? `${title}`
						.replace(/ą/g, 'a')
						.replace(/Ą/g, 'A')
						.replace(/ę/g, 'e')
						.replace(/Ę/g, 'E')
				: ''
		},
		table(): string[][] {
			const input = this.data.table
			if (!input) return []

			const rows = input.split('\n').filter(text => text.includes(':')),
				table = rows
					.map(text => text.split(':'))
					.filter(pair => pair.length === 2)

			return table
		},
		similarProducts(): { data?: ProductThumbnail; isLoaded: boolean }[] {
			const { ties } = this

			if (ties.length === 0) {
				const skeleton = { isLoaded: false },
					skeletonList = [...Array(4).keys()].map(() => skeleton)
				return skeletonList
			}
			return ties.map(({ products }) => ({
				data: products[0],
				isLoaded: true,
			}))
		},
	},
	watch: {
		id() {
			this.fetchedTies = false
			this.$fetch()
			this.$refs.scrollingEl.scrollTo({ top: 0, behavior: 'smooth' })
		},
	},
	mounted() {
		const { id, data, $fetchState } = this
		if (!id) {
			this.closeOverlay()
			return
		}
		this.$store.dispatch('seeProduct', id)

		if (
			(data.title === undefined || this.ties.length === 0) &&
			$fetchState.pending === false
		)
			this.$fetch()
	},
	methods: {
		async fetchTies() {
			const { id } = this,
				query = productTiesQuery
			if (!id) return

			try {
				const {
					product: { ties },
				}: ProductTiesResponse = await this.$graphql.request(query, { id })

				// Remove "Broken Ties"
				remove(ties, ({ products }) => products.length === 0)

				this.ties = ties
				this.fetchedTies = true
			} catch (error) {
				console.error(error)
			}
		},
		goToProduct(id: string) {
			const query = qs.stringify(this.$route.query)
			this.$router.push(this.localePath(`/gallery/${id}?${query}`))
		},
		closeOverlay() {
			const { $route, $router } = this,
				query = qs.stringify($route.query)

			$router.push(this.localePath(`/gallery?${query}`))
		},
		copyLink() {
			const { id } = this,
				host = process.env.baseUrl,
				link = `${host}/gallery/${id}`

			console.log(link)
		},
	},
})
</script>

<style lang="scss" scoped>
.product-overlay {
	@apply fixed -inset-20;
	z-index: 3000;
}
.cover {
	@apply bg-opacity-90 bg-gray-900 absolute -z-1 inset-0;
	backdrop-filter: blur(25px);
}
.outer-wrapper {
	@apply absolute inset-20 overflow-y-auto flex justify-center;
}
.inner-wrapper {
	@apply flex flex-col w-screen max-w-md items-stretch overflow-hidden;
	height: max-content;
}
.thumbnail {
	@apply relative w-screen flex justify-center items-center;
	height: 100vw;
	max-height: 100vw;
	img {
		max-height: 100%;
		max-width: 100%;
	}
}
.card {
	@apply relative z-30 -mt-4;
}
.content {
	@apply bg-white rounded-2xl overflow-hidden shadow-around flex flex-col;
	> * {
		@apply mb-6 last:mb-0;
	}
}
.header {
	@apply p-6 bg-gray-100;
	.title {
		@apply break-words;
		&.smaller {
			@apply text-4xl;
		}
	}
	.number {
		@apply text-gray-500;
	}
}
.table-wrapper {
	@apply relative p-6 bg-gray-100;
	caption {
		@apply absolute bottom-full mb-1 text-xs text-gray-500;
	}
}
.table {
	@apply w-full;
	.row {
		@apply my-2 border-b-2 last:border-0;
	}
	.key,
	.value {
		@apply text-left py-1.5 leading-tight align-text-top;
	}
	.key {
		@apply pr-4 font-semibold;
		max-width: 8rem;
	}
}
.similar-products {
	@apply mt-6 mb-10;
	.title {
		@apply ml-6 mb-4 text-gray-100;
	}
	.list-wrapper {
		@apply overflow-x-auto;
	}
	.list {
		@apply flex space-x-6 px-10;
		width: max-content;
	}
	.list-item {
		width: 40vmin;
	}
}

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
	top: $size / -2;
	right: 20px;

	&.share {
		right: $size + 40px;
	}
}
.desc {
	white-space: pre-wrap;
}
</style>
