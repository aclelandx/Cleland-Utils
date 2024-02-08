<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import type { CSSProperties } from 'vue';
import { ThemeTypeObject, UserCreatedThemeT } from '@types';
import { AvailableThemes, AvailableThemesRenditions } from '@enums';
import { injectActiveTheme } from '@utilities';
import { SelectedThemeInjectionKey } from '@utilities';
import GridMainScreen from '@components/GridMainScreen.vue';
import NavBar from '@components/NavBar.vue';

const userCustom = computed<UserCreatedThemeT>(() => {
	const storedTheme = localStorage.getItem('userTheme');
	if (storedTheme == null || storedTheme == undefined)
		return {} as UserCreatedThemeT;

	const output: UserCreatedThemeT = JSON.parse(storedTheme);
	return output;
});

const selectedTheme = ref<ThemeTypeObject>({
	name: AvailableThemes.light,
	rendition: AvailableThemesRenditions.two,
	userCustom: userCustom.value,
});

const activeTheme = computed<CSSProperties>(() => {
	return injectActiveTheme(selectedTheme.value);
});

const isNavCollapsed = ref<boolean>(true);

provide(SelectedThemeInjectionKey, selectedTheme);

function toggleCollapse(): void {
	isNavCollapsed.value = !isNavCollapsed.value;
}
</script>

<template>
	<main class="application-wrapper" :style="activeTheme">
		<NavBar
			@toggle-collapse="toggleCollapse"
			:is-nav-collapsed="isNavCollapsed" />
		<GridMainScreen
			:is-nav-collapsed="isNavCollapsed"
			:header="'Awe Shit here we go again'" />
	</main>
</template>

<style lang="scss">
@import '@assets/mixins.scss';
// tool tip CSS
[data-tooltip] {
	position: relative;
	&::after {
		content: attr(data-tooltip);
		position: absolute;
		left: calc(100% + 1.5rem);
		background-color: var(--primary-foreground);
		color: var(--primary-foreground-accent);
		padding: 0rem 0.5rem;
		border-radius: 0.125rem;
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.3s ease-in-out 250ms;
		width: fit-content;
		height: 100%;
		white-space: nowrap;

		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		z-index: 150;
	}

	&:hover::after {
		visibility: visible;
		opacity: 1;
	}
}

main.application-wrapper {
	@include PrimaryFont;
	width: 100%;
	height: 100vh;
	background-color: var(--primary-background);
	overflow: hidden;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	gap: 0;
	color: var(--primary-foreground-accent);

	.modal {
		width: calc(100% - 4rem);
		background-color: var(--primary-background-accent);
		border-radius: 0.5rem;

		flex: 0 0 calc(80% - 4rem);
	}
}
</style>
