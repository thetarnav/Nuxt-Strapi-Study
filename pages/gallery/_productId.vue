<template>
	<div class="product-overlay">
		<div class="content-wrapper">
			<button class="close-button btn-dark" @click="closeOverlay">
				<Icon icon="times" class="icon"></Icon>
			</button>
			<button class="close-button share btn-dark" @click="copyLink">
				<Icon icon="share" class="icon"></Icon>
			</button>
			<h2>{{ data.title }}</h2>
			<h6 v-if="data.number">#{{ data.number }}</h6>
			<pre class="desc">
            {{ data.description }}
         </pre>
			<pre class="desc">
				{{ data.table }}
			</pre
			>
			<a v-if="data.isAvailable" :href="data.shopLink" target="_blank"
				>link do sklepu</a
			>
			<h4>Podobne produkty:</h4>
			<ul class="ties">
				<li v-for="tie in ties" :key="tie.products[0].id">
					<a @click="goToProduct(tie.products[0].id)">
						<h5>{{ tie.products[0].title }}</h5>
					</a>
					<!-- <nuxt-link :to="`/gallery/${tie.products[0].id}?{}`"></nuxt-link> -->
				</li>
			</ul>
		</div>
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
			this.$router.push(`/gallery/${id}?${query}`)
		},
		closeOverlay() {
			const { $route, $router } = this,
				query = qs.stringify($route.query)

			$router.push(`/gallery?${query}`)
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
	@include full-fixed(3000);
	background-color: rgba($black, 0.9);
	backdrop-filter: blur(20px);
	display: flex;
	flex-direction: column;
	// justify-content: center;
	align-items: center;
	overflow: auto;
}
.content-wrapper {
	position: relative;
	width: 80vmin;
	padding: 30px;
	border-radius: 20px;
	background: $white;
	margin: 100px auto;
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
