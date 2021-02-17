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
			<h6>Podobne produkty:</h6>
			<ul>
				<li v-for="tie in data.ties" :key="tie.products[0].id">
					<h5>{{ tie.products[0].title }}</h5>
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
} from '~/assets/js/queries'

export default Vue.extend({
	name: 'ProductOverlay',
	data() {
		return {
			data: {} as FullProduct,
		}
	},
	async fetch(): Promise<void> {
		console.log('FETCHING')

		const product = await this.fetchData()
		if (product) this.data = product
	},
	computed: {
		id(): string {
			const { params, query } = this.$route,
				id = params.productId ?? query.productId

			if (!id) {
				this.closeOverlay()
				return ''
			}

			return id
		},
	},
	mounted() {
		this.$store.dispatch('seeProduct', this.id)

		console.log('MOUNTED', this.data.title, this.$fetchState.pending)
		if (this.data.title === undefined && this.$fetchState.pending === false)
			this.$fetch()
	},
	methods: {
		async fetchData(): Promise<FullProduct | undefined> {
			const { id, $graphql } = this,
				query = fullProductQuery

			if (!id) {
				this.closeOverlay()
				return
			}

			try {
				const { product } = await $graphql.request<FullProductResponse>(
					query,
					{ id },
				)

				// Remove "Broken Ties"
				remove(product.ties, ({ products }) => products.length === 0)

				return product
			} catch (error) {
				console.error(error)
				this.closeOverlay()
			}
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
