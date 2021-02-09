<template>
	<button
		class="filter-pill"
		:class="{ [color]: true, selected: isSelected }"
		@click="handleClick"
	>
		<Icon v-if="icon" :icon="icon" class="icon"></Icon>
		<p class="text">
			<slot></slot>
		</p>
	</button>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProductTag } from '~/types/types'

export interface PillSelectPayload {
	tag: ProductTag
	selected: boolean
}

export default Vue.extend({
	name: 'FilterPill',
	props: {
		icon: {
			type: String,
			default: '',
		},
		tag: {
			type: String as () => ProductTag,
			required: true,
			// validator: value => productTags.includes(value),
		},
		selected: {
			type: String,
			default: null,
		},
		color: {
			type: String,
			default: '',
		},
	},
	computed: {
		isSelected(): boolean {
			return this.selected !== '' && this.selected === this.tag
		},
	},
	methods: {
		handleClick() {
			const { tag, isSelected } = this,
				payload: PillSelectPayload = {
					tag,
					selected: !isSelected,
				}

			this.$emit('select', payload)
		},
	},
})
</script>

<style lang="scss">
.filter-pill {
	--color: #{$gray1};
	border-radius: 200px;
	height: 34px;
	padding: 0 10px;
	background-color: $white;
	border: 2px solid var(--color);
	color: var(--color);
	display: flex;
	align-items: center;

	&.secondary {
		--color: #{$secondary};
	}
	&.primary {
		--color: #{$primary};
	}

	&.selected {
		background-color: var(--color);
		color: $white;
	}
	.icon:not(.alone) {
		margin-right: 8px;
	}
	.text {
		margin: 0;
	}
}
</style>
