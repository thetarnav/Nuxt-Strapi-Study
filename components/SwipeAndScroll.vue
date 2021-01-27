<template>
	<div
		class="swipe-and-scroll outer-wrapper"
		:class="directions"
		@touchstart="touchStart"
		@touchmove="debouncedHandleTouchMove"
		@touchend="touchend"
		@wheel="wheel"
	>
		<div class="inner-wrapper">
			<slot></slot>
		</div>
		<div
			v-if="directions.includes('down')"
			class="swipe-space swipe-space--top"
		>
			<p>
				{{ prevRouteName }}
			</p>
		</div>
		<div
			v-if="directions.includes('up')"
			class="swipe-space swipe-space--bottom"
		>
			<p>Gallery</p>
		</div>
		<GlobalEvents @scroll="debouncedHandleScroll"></GlobalEvents>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import debounce from 'lodash.debounce'
import { SwipeDirection } from '~/plugins/types'

interface SwipeStart {
	timestamp: number
	x: number
}

export default Vue.extend({
	name: 'SwipeAndScroll',
	props: {
		directions: {
			type: Array,
			default: () => ['up', 'down', 'left', 'right'],
		},
	},
	data() {
		return {
			timeLimit: 700,
			distanceThreshold: 90,
			// swipeStart - Object that holds the information about when and where touch happend.
			swipeStart: null as SwipeStart | null,
			// allowSwipe is a boolean-contition for the VERTICAL scroll to happen. So that the swiping will not happen immediately when scrolled down too quickly.
			allowSwipe: false,
			// a Placeholder for lodash debounced scroll handler.
			debouncedHandleScroll: () => {},
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			debouncedHandleTouchMove: (e: TouchEvent) => {},
		}
	},
	computed: {
		parent() {
			return this.$parent.$el
		},
		prevRouteName() {
			const prevRoute = this.$route.query.prevRoute || 'index'
			return this.$store.getters['application/pageName'](prevRoute) || 'Home'
		},
	},
	mounted() {
		this.debouncedHandleScroll = debounce(this.handleScrollingEnd, 100)
		this.debouncedHandleTouchMove = debounce(this.touchmove, 70, {
			maxWait: 70,
		})
		this.parent.addEventListener('scroll', this.debouncedHandleScroll)
	},
	beforeDestroy() {
		this.parent.removeEventListener('scroll', this.debouncedHandleScroll)
	},
	methods: {
		triggerSwipe(direction: SwipeDirection) {
			// Function that Ends an user swipe interaction.
			this.swipeStart = null
			this.$emit('swipe', direction)
		},
		handleScrollingEnd() {
			/*
			It is a DEBOUNCED scroll handler.
			Used to scroll away from swipe padding OR trigger the Swipe.
			*/
			this.swipeStart = null
			this.checkVerticalSwipe()
			this.allowSwipe = false
		},
		touchStart(e: TouchEvent) {
			/**
			 * Touch Start Event Handler
			 * Used to set the swipe starting point
			 * and allow vertical swipe for the current 'user swipe'
			 */
			this.allowSwipe = true
			const { timeStamp: timestamp, touches } = e,
				{ clientX: x } = touches[0] || [0, 0]

			this.swipeStart = {
				timestamp,
				x,
			}
			setTimeout(() => (this.swipeStart = null), this.timeLimit)
		},
		touchmove(e: TouchEvent) {
			/**
			 * Triggers Swipe Check
			 */
			if (!this.swipeStart) return

			const { timeStamp } = e,
				{ clientX } = e.touches[0] || [0, 0]

			this.checkMovement(clientX, timeStamp)
		},
		touchend() {
			this.swipeStart = null
			setTimeout(() => (this.allowSwipe = false), 100)
		},
		wheel() {
			this.allowSwipe = true
		},
		checkMovement(x: number, timestamp: number) {
			if (!this.swipeStart) return

			const { swipeStart, timeLimit, distanceThreshold, triggerSwipe } = this

			if (swipeStart && timestamp - swipeStart.timestamp < timeLimit) {
				if (x - swipeStart.x > distanceThreshold) triggerSwipe('right')
				else if (swipeStart.x - x > distanceThreshold) triggerSwipe('left')
			}
		},
		checkVerticalSwipe() {
			const { directions, allowSwipe } = this,
				verticalPadding = this.$store.state.application
					.swipeVerticalPadding,
				{ innerHeight: windowHeight } = window,
				{ scrollHeight } = this.$el,
				fromTop = this.parent.scrollTop,
				fromBottom = scrollHeight - fromTop - windowHeight

			if (allowSwipe && directions.includes('down') && fromTop < 5)
				this.triggerSwipe('down')
			else if (allowSwipe && directions.includes('up') && fromBottom < 5)
				this.triggerSwipe('up')
			else {
				let scrollToY = -1
				if (directions.includes('down') && fromTop < verticalPadding)
					scrollToY = verticalPadding
				else if (directions.includes('up') && fromBottom < verticalPadding)
					scrollToY = scrollHeight - windowHeight - verticalPadding - 1

				if (scrollToY !== -1)
					this.parent.scrollTo({
						top: scrollToY,
						behavior: 'smooth',
					})
			}
		},
	},
})
</script>

<style lang="scss" scoped>
$vertical-swipe-space: 90px;
.outer-wrapper {
	position: relative;
	// background-color: $secondary;
	&.down {
		padding-top: $vertical-swipe-space;
	}
	&.up {
		padding-bottom: $vertical-swipe-space;
	}
}
.swipe-space {
	position: absolute;
	left: 0;
	right: 0;
	height: $vertical-swipe-space;
	display: flex;

	&--top {
		top: 0;
		background: linear-gradient($gray7, transparent);
	}
	&--bottom {
		bottom: 0;
		background: linear-gradient(transparent, $gray7);
	}

	p {
		margin: auto;
	}
}
</style>
