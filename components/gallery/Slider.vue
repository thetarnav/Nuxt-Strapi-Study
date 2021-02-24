<template>
	<figure ref="swiperEl" v-swiper="swiperOptions" class="slider-container">
		<div class="swiper-wrapper">
			<div
				v-for="(url, slideIndex) in slides"
				:key="url"
				class="swiper-slide"
			>
				<img class="img" :src="url" :alt="slideIndex" />
			</div>
		</div>
		<Button class="swiper-button-prev circle" leading-icon="prev" />
		<Button class="swiper-button-next circle" leading-icon="next" />
	</figure>
</template>

<script lang="ts">
import Vue from 'vue'
// import { Swiper } from 'swiper'
import { directive as swiper } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { Image } from '~/assets/js/queries'

export default Vue.extend({
	name: 'Slider',
	directives: {
		swiper,
	},
	props: {
		images: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			swiperOptions: {
				grabCursor: true,
				watchOverflow: true,
				speed: 400,
				spaceBetween: 30,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
		}
	},
	computed: {
		slides(): string[] {
			const images = this.images as Image[] | null
			let slides: string[] = []

			if (images && images?.length > 1)
				slides = images.map(
					({ formats, url }) =>
						formats.large?.url || formats.medium?.url || url || '',
				)

			return slides
		},
	},
})
</script>

<style lang="scss" scoped>
.slider-container {
	@apply relative w-screen;
	height: 100vw;
}
.swiper-slide {
	@apply relative w-full h-full flex justify-center items-center;
}
.img {
	max-height: 100%;
	max-width: 100%;
}
.swiper-button-prev,
.swiper-button-next {
	transition: opacity 0.2s;
	&:after {
		display: none;
	}
}
</style>
