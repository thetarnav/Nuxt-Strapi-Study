<template>
	<button
		class="filter-pill"
		:class="{ [color]: true, selected: selected }"
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
import { ProductTag } from '~/plugins/types'

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
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isSelected: false,
		}
	},

	methods: {
		handleClick() {
			const { tag, selected } = this
			const payload: PillSelectPayload = {
				tag: tag as ProductTag,
				selected: !this.selected,
			}

			this.$emit('select', payload)
			// if (((productTags as unknown) as string).includes(tag)) {
			// 	const payload: PillSelectPayload = {
			// 		tag: tag as ProductTag,
			// 		selected: !selected,
			// 	}
			// 	this.$emit('select', payload)
			// } else
			// 	console.warn(`Tag property (${tag}) doesn't match ProductTag Type`)
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
	background-color: transparent;
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
