<template>
	<div
		v-waypoint="{ active: true, callback: onWaypoint }"
		:style="{ '--height': `${height}px`, '--width': `${width}px` }"
	>
		<div
			ref="content"
			class="inner"
			:class="`${classes} ${isVisible ? '' : 'keep-in-view'}`"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'KeepInView',
	inheritAttrs: false,
	props: {
		classes: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isVisible: false,
			height: null as number | null,
			width: null as number | null,
		}
	},
	methods: {
		onWaypoint(payload: any) {
			this.isVisible = payload?.going === 'in' || false

			this.$nextTick(() => {
				this.height =
					(this.$refs.content as HTMLElement).clientHeight || this.height
				this.width =
					(this.$refs.content as HTMLElement).clientWidth || this.width
			})
		},
	},
})
</script>

<style lang="scss" scoped>
.inner {
	width: max-content;
	height: max-content;
}
.keep-height {
	height: var(--height);
}
.keep-width {
	width: var(--width);
}
.keep-in-view {
	@apply fixed;
	@keyframes from-top {
		0% {
			transform: translateY(calc(-100% - theme('spacing.2')));
		}
	}
	@keyframes from-bottom {
		0% {
			transform: translateY(calc(100% + theme('spacing.4')));
		}
	}

	&.stick {
		&-top {
			@apply top-2;
			animation: from-top 0.3s forwards;
		}
		&-right {
			@apply right-4;
		}
		&-left {
			@apply left-4;
		}
		&-bottom {
			@apply bottom-4;
			animation: from-bottom 0.3s forwards;
		}
	}
}
// .element:not(.keep-in-view) {
// 	&.stick {
// 		&-top {
// 			animation: from-bottom 0.3s forwards;
// 		}
// 		&-bottom {
// 			animation: from-top 0.3s forwards;
// 		}
// 	}
// }
</style>
