<script setup lang="ts">
import { ref, onMounted, computed, inject, nextTick } from 'vue';
import { UserCreatedThemeT } from '@types';
import { CustomTheme } from '@/enums';
import { SelectedThemeInjectionKey } from '@utilities';
import ColorPicker from '@components/ColorPicker.vue';

const background = ref<string>('#ffffff');
const backgroundAccent = ref<string>('#ffffff');
const foreground = ref<string>('#ffffff');
const foregroundAccent = ref<string>('#ffffff');

const userCreatedTheme = computed<UserCreatedThemeT>(() => {
	const output: UserCreatedThemeT = {
		background: background.value,
		backgroundAccent: backgroundAccent.value,
		foreground: foreground.value,
		foregroundAccent: foregroundAccent.value,
	};
	return output;
});

const injectedSelectedTheme = inject(SelectedThemeInjectionKey);

function getValuesFromLocalStorage(): void {
	const storedTheme = localStorage.getItem('userTheme');

	if (storedTheme == null || storedTheme == undefined) {
		setValuesToLocalStorage();
	}

	if (storedTheme != null || storedTheme != undefined) {
		const storedUserCreatedTheme: UserCreatedThemeT = JSON.parse(storedTheme);
		background.value = storedUserCreatedTheme.background;
		backgroundAccent.value = storedUserCreatedTheme.backgroundAccent;
		foreground.value = storedUserCreatedTheme.foreground;
		foregroundAccent.value = storedUserCreatedTheme.foregroundAccent;
	}
}

function setValuesToLocalStorage(): void {
	const jsonConvertedTheme = JSON.stringify(userCreatedTheme.value);
	localStorage.setItem('userTheme', jsonConvertedTheme);
}

function saveCustomTheme(): void {
	setValuesToLocalStorage();
}

function applyCustomTheme(): void {
	if (injectedSelectedTheme == undefined) return;
	injectedSelectedTheme.value.userCustom = userCreatedTheme.value;
}

async function resetColorTheme(): Promise<void> {
	localStorage.removeItem('userTheme');
	await nextTick();
	getValuesFromLocalStorage();
}

onMounted(() => {
	getValuesFromLocalStorage();
});
</script>

<template>
	<main class="modal theme-selector">
		<header>Cleland Theme Creator</header>
		<section class="color-picker-wrapper">
			<ColorPicker
				v-model="background"
				:existing-color="background"
				:style-target="CustomTheme.background" />
			<ColorPicker
				v-model="backgroundAccent"
				:existing-color="backgroundAccent"
				:style-target="CustomTheme.backgroundAccent" />
			<ColorPicker
				v-model="foreground"
				:existing-color="foreground"
				:style-target="CustomTheme.foreground" />
			<ColorPicker
				v-model="foregroundAccent"
				:existing-color="foregroundAccent"
				:style-target="CustomTheme.foregroundAccent" />
			<section class="button-wrapper">
				<button class="theme-button save" @click="saveCustomTheme()">
					Save Custom Theme
				</button>
				<button class="theme-button reset" @click="resetColorTheme()">
					Reset Custom Theme
				</button>
				<button class="theme-button apply" @click="applyCustomTheme">
					Apply Custom theme
				</button>
			</section>
		</section>
		<footer>Created by Adam Cleland &copy;</footer>
	</main>
</template>

<style lang="scss" scoped>
@import '@assets/mixins.scss';
.theme-selector {
	@include flex-parent($justify: space-between, $align: center);
	height: 100%;
	width: 100%;

	header,
	footer {
		height: 4rem;
		text-align: center;
		width: 80%;
		@include flex-parent($direction: row, $wrap: nowrap);
	}
	header {
		box-shadow: 0 0.2rem 0.125rem -0.125rem var(--primary-foreground-accent);
	}
	footer {
		box-shadow: 0 -0.2rem 0.125rem -0.125rem var(--primary-foreground-accent);
	}

	.color-picker-wrapper {
		@include flex-parent(
			$direction: row,
			$wrap: wrap,
			$justify: space-between,
			$gap: 2rem 0
		);
		height: fit-content;
		position: relative;
		width: 100%;

		.button-wrapper {
			@include flex-parent($direction: row, $gap: 1rem, $wrap: wrap);
			width: 100%;
			flex: 0 0 100%;

			.theme-button {
				@include ButtonTheme1;
			}
		}
	}
}
</style>
