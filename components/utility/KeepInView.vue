<template>
	<div
		v-waypoint="{ active: true, callback: onWaypoint }"
		class="wrapper"
		:style="{ '--height': height }"
	>
		<div
			ref="content"
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
		}
	},
	mounted() {
		this.height = (this.$refs.content as HTMLElement).clientHeight
	},
	methods: {
		onWaypoint(payload: any) {
			this.isVisible = payload?.going === 'in' || false
		},
	},
})
</script>

<style lang="scss" scoped>
.wrapper {
	height: var(--height);
}
.keep-in-view {
	@apply fixed;
	@keyframes from-top {
		0% {
			transform: translateY(-120%);
		}
	}
	@keyframes from-bottom {
		0% {
			transform: translateY(120%);
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
