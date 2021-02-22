<template>
	<!-- eslint-disable vue/no-v-html -->
	<div class="product-overlay">
		<div class="outer-wrapper">
			<article :key="id" class="inner-wrapper">
				<Slider
					v-if="data.slides && data.slides.length > 1"
					:images="data.slides"
				/>
				<figure v-else-if="data.thumbnail" class="thumbnail">
					<img :src="singleImage" alt="product thumbnail" />
				</figure>
				<div class="card">
					<KeepInView classes="top-buttons-frame stick-top">
						<Button
							leading-icon="share"
							class="circle sticky top-0 left-0"
							:on-click="copyLink"
						/>
						<Button
							leading-icon="times"
							class="circle sticky top-0 left-0"
							:on-click="closeOverlay"
						/>
					</KeepInView>
					<main class="content">
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
							<caption>
								Specyfikacja
							</caption>
						</figure>
						<template v-if="data.isAvailable">
							<p class="self-end">Product na stanie!</p>
							<KeepInView
								class="self-end"
								classes="stick-bottom stick-right"
							>
								<Button
									class="bg-primary"
									leading-icon="shopping-bag"
									:href="data.shopLink"
								>
									Zobacz w sklepie
								</Button>
							</KeepInView>
						</template>
					</main>
				</div>
				<h4>Podobne produkty:</h4>
				<ul class="ties">
					<li v-for="tie in ties" :key="tie.products[0].id">
						<a @click="goToProduct(tie.products[0].id)">
							<h5>{{ tie.products[0].title }}</h5>
						</a>
					</li>
				</ul>
			</article>
		</div>
		<div class="cover"></div>
	</div>
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
} from '~/assets/js/queries'

export default Vue.extend({
	name: 'ProductOverlay',
	asyncData({ params, payload }) {
		return {
			id: params.productId || '',
			data: payload ?? {},
			reload: true,
		}
	},
	data() {
		return {
			id: '',
			data: {} as FullProduct,
			ties: [] as ProductTies,
			reload: false,
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
	},
	watch: {
		id() {
			this.fetchedTies = false
			this.$fetch()
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
	backdrop-filter: blur(20px);
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
		&.smaller {
			@apply text-4xl;
		}
	}
	.number {
		@apply text-gray-500;
	}
}
.table-wrapper {
	@apply relative p-6 mt-6 bg-gray-100;
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
