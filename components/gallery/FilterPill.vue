<template>
	<transition appear name="fade">
		<button
			class="pill"
			:class="{ [color]: true, selected: isSelected }"
			@click="handleClick"
		>
			<Icon v-if="icon" :icon="icon" class="icon"></Icon>
			<p class="text">
				<slot></slot>
			</p>
		</button>
	</transition>
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

<style lang="scss"></style>
