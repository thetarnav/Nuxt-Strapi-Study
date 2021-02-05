<template>
	<div class="product-overlay">
		<div class="content-wrapper">
			<button class="close-button btn-dark" @click="closeOverlay">
				<Icon icon="times" class="icon"></Icon>
			</button>
			<button class="close-button share btn-dark" @click="copyLink">
				<Icon icon="share" class="icon"></Icon>
			</button>
			<h2>{{ data.Name }}</h2>
			<h6 v-if="data.Number">#{{ data.Number }}</h6>
			<pre class="desc">
            {{ data.Description }}
         </pre>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '~/store'

export default Vue.extend({
	name: 'ProductOverlay',
	data() {
		return {
			data: {},
		}
	},
	async fetch() {
		const { $strapi, id } = this
		try {
			const data = await $strapi.find(`products/${id}`)
			this.data = data
		} catch (error) {
			console.error(error)
			this.closeOverlay()
		}
	},
	computed: {
		id(): number {
			const { params, query } = this.$route
			return (
				parseInt(params.productId) ||
				// (this.$store.state as RootState).productId
				parseInt(query.productId)
			)
		},
	},
	mounted() {
		// this.setProductId()
	},
	methods: {
		// setProductId(): void {
		// 	const { id: productId } = this
		// 	this.$router.push({
		// 		params: { productId },
		// 		query: { ...this.$route.query, productId },
		// 	})
		// },
		closeOverlay() {
			const { $route, $router, $store } = this
			// When opened in gallery
			if ($route.name?.includes('gallery'))
				$router.push({
					params: { productId: undefined },
					query: { ...$route.query, productId: undefined },
				})
			// When opened in other page
			else
				$router.push({
					query: { ...$route.query, productId: undefined },
				})

			// $store.commit('closeProduct')
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
