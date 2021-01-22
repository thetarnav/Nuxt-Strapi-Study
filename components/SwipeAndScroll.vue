<template>
	<div
		class="swipe-and-scroll"
		@touchstart="touchStart"
		@touchmove="touchmove"
		@touchend="resetSwipe"
		@wheel="wheel"
	>
		<slot></slot>
		<GlobalEvents @scroll="scroll"></GlobalEvents>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwipeDirection } from '~/plugins/types'

interface SwipeStart {
	timestamp: number
	x: number
	y: number
}

let deltaTotal = {
	x: 0,
	y: 0,
}

export default Vue.extend({
	name: 'SwipeAndScroll',
	data() {
		return {
			timeLimit: 700,
			distanceThreshold: 150,
			hugging: {
				top: false,
				left: false,
				right: false,
				bottom: false,
			},
			swipeStart: null as SwipeStart | null,
			swiped: false,
		}
	},
	mounted() {
		this.$nextTick(this.checkIfHugging)
		// this.checkIfHugging()
	},
	methods: {
		swipe(direction: SwipeDirection) {
			this.swiped = true
			this.resetSwipe()
			this.$emit('swipe', direction)
		},
		scroll() {
			this.checkIfHugging()
			this.resetSwipe()
		},
		touchStart(e: TouchEvent) {
			const { timeStamp: timestamp, touches } = e,
				{ clientX: x, clientY: y } = touches[0] || [0, 0]
			this.swipeStart = {
				timestamp,
				x,
				y,
			}
		},
		touchmove(e: TouchEvent) {
			const { timeStamp } = e,
				{ clientX, clientY } = e.touches[0] || [0, 0]
			this.checkMovement(clientX, clientY, timeStamp)
		},
		wheel(e: WheelEvent) {
			const { timeStamp: timestamp } = e
			if (!this.swipeStart) {
				this.swipeStart = { timestamp, x: 0, y: 0 }
				deltaTotal = {
					x: 0,
					y: 0,
				}
				setTimeout(this.resetSwipe, this.timeLimit)
			} else {
				const { deltaX: x, deltaY: y } = e
				deltaTotal.x -= x
				deltaTotal.y -= y

				this.checkMovement(deltaTotal.x, deltaTotal.y, timestamp)
			}
		},
		resetSwipe() {
			this.swipeStart = null
			this.swiped = false
		},
		checkMovement(x: number, y: number, timestamp: number) {
			if (this.swiped) return

			const {
				swipeStart,
				hugging,
				timeLimit,
				distanceThreshold,
				swipe,
			} = this

			if (swipeStart && timestamp - swipeStart.timestamp < timeLimit) {
				if (hugging.top && y - swipeStart.y > distanceThreshold)
					swipe('down')
				else if (hugging.bottom && swipeStart.y - y > distanceThreshold)
					swipe('up')
				else if (hugging.left && x - swipeStart.x > distanceThreshold)
					swipe('right')
				else if (hugging.right && swipeStart.x - x > distanceThreshold)
					swipe('left')
			}
		},
		checkIfHugging(): void {
			const {
					innerHeight: height,
					innerWidth: width,
					scrollY: scrollTop,
					scrollX: scrollLeft,
				} = window,
				{ scrollHeight, scrollWidth } = this.$el

			this.hugging = {
				top: Math.floor(scrollTop) === 0,
				left: Math.floor(scrollLeft) === 0,
				bottom: scrollHeight - scrollTop - height < 1,
				right: scrollWidth - scrollLeft - width < 1,
			}
		},
	},
})
</script>

<style lang="scss" scoped></style>
