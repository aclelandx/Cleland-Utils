<script setup lang="ts">
import { computed, ref } from 'vue';
import { CustomTheme } from '@enums';

const props = defineProps<{
	modelValue: string;
	existingColor?: string;
	styleTarget: CustomTheme;
}>();

const emit = defineEmits<{
	updateColor: [value: string, styleTarget: CustomTheme];
	'update:modelValue': [value: string];
}>();

const inputElement = ref<HTMLInputElement>();

const hasExistingColor = ref<boolean>(
	props.existingColor != '' || props.existingColor != undefined
);

const computedInitialValue = computed<string>(() => {
	return props.existingColor ?? '';
});

function handleEmit(): void {
	if (inputElement.value) {
		emit('update:modelValue', inputElement.value.value);
	}
}
</script>

<template>
	<section class="color-picker-container">
		<p class="color-header">{{ styleTarget }}</p>
		<section class="color-view-box"></section>
		<input
			v-if="hasExistingColor"
			type="text"
			class="user-input"
			:value="computedInitialValue"
			ref="inputElement"
			placeholder="Enter in hexcode..."
			@input="handleEmit" />
	</section>
</template>

<style lang="scss" scoped>
@import '@assets/mixins.scss';
.color-picker-container {
	@include flex-parent($gap: 1.5rem);
	width: 100%;
	height: fit-content;
	max-height: 25rem;
	flex: 0 0 calc((100% - 3rem) / 4);

	.color-header {
		width: 100%;
		height: fit-content;
		text-align: center;
	}
	.color-view-box {
		width: 100%;
		height: 8rem;
		background-color: v-bind(existingColor);
		border-radius: 0.5rem;
		box-shadow: 0 0.5rem var(--primary-foreground-accent);
	}
	.user-input {
		@include PrimaryFont;
		padding: 0.25rem 0.5rem;
		width: calc(100% - 1rem);
	}
}
</style>
