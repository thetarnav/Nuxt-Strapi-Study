<template>
	<figure ref="swiperEl" class="slider-container">
		<div class="swiper-wrapper">
			<div
				v-for="(url, slideIndex) in slides"
				:key="url"
				class="swiper-slide"
			>
				<img class="img" :src="url" :alt="slideIndex" data-not-lazy />
			</div>
		</div>
		<button v-show="!isBeginning" class="navigation prev" @click="go(-1)">
			<svg
				class="mr-0.5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				></path>
			</svg>
		</button>
		<button v-show="!isEnd" class="navigation next" @click="go(1)">
			<svg
				class="ml-0.5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"
				></path>
			</svg>
		</button>
	</figure>
</template>

<script lang="ts">
import Vue from 'vue'
import { Swiper } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Image } from '~/assets/js/queries'

export default Vue.extend({
	name: 'Slider',
	props: {
		images: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			swiper: null as Swiper | null,
		}
	},
	computed: {
		slides(): string[] {
			const images = this.images as Image[] | null
			let slides: string[] = []

			if (images && images?.length > 1)
				slides = images.map(({ formats }) => formats.large.url)

			return slides
		},
		isBeginning(): boolean {
			return this.swiper?.isBeginning || false
		},
		isEnd(): boolean {
			return this.swiper?.isEnd || false
		},
	},
	mounted() {
		this.initSwiper()
	},
	beforeDestroy() {
		this.swiper?.destroy()
	},
	methods: {
		initSwiper() {
			if (this.swiper) {
				this.swiper.update()
				return
			}
			const el = this.$refs.swiperEl as HTMLElement | undefined,
				swiperConfig = {
					grabCursor: true,
					watchOverflow: true,
					speed: 400,
					spaceBetween: 30,
				}

			if (!el) return
			this.swiper = new Swiper(el, swiperConfig)
		},
		go(n: number) {
			n > 0 ? this.swiper?.slideNext() : this.swiper?.slidePrev()
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
.navigation {
	@apply absolute z-10 w-10 h-10 top-1/2 -mt-5 flex justify-center items-center bg-gray-700 text-white rounded-full;

	&.prev {
		@apply left-2;
	}
	&.next {
		@apply right-2;
	}
	svg {
		@apply w-full h-full;
	}
}
</style>
