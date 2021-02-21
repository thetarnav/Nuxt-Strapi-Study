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
				<div class="content">
					<button class="close-button btn-dark" @click="closeOverlay">
						<Icon icon="times" class="icon"></Icon>
					</button>
					<button class="close-button share btn-dark" @click="copyLink">
						<Icon icon="share" class="icon"></Icon>
					</button>
					<header>
						<h2>{{ data.title }}</h2>
					</header>
					<h6 v-if="data.number">#{{ data.number }}</h6>
					<main
						v-if="data.description"
						class="prose"
						v-html="$md.render(data.description)"
					>
						{{ data.description }}
					</main>
					<pre class="desc">
				{{ data.table }}
			</pre
					>
					<a v-if="data.isAvailable" :href="data.shopLink" target="_blank"
						>link do sklepu</a
					>
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
	backdrop-filter: blur(20px);
}
.cover {
	@apply bg-gray-900 opacity-90 absolute -z-1 inset-0;
}
.outer-wrapper {
	@apply absolute inset-20 overflow-y-auto flex justify-center;
}
.inner-wrapper {
	@apply flex flex-col w-screen max-w-md items-stretch overflow-hidden;
	height: max-content;
}
.thumbnail {
	@apply relative w-screen p-6 flex justify-center items-center;
	max-height: 100vw;
	img {
		max-height: 100%;
		max-width: 100%;
	}
}
.content {
	@apply relative z-30 -mt-6 p-6 bg-white rounded-2xl;
	@include shadow-around;
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
