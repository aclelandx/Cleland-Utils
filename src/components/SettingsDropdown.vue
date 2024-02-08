<script setup lang="ts">
import { SelectedThemeInjectionKey } from '@utilities';
import { computed, inject } from 'vue';
import { AvailableThemes, AvailableThemesRenditions } from '@enums';
import { themeOptions } from '@utilities';

const props = defineProps<{
	isNavCollapsed: boolean;
}>();

const selectedTheme = inject(SelectedThemeInjectionKey);

const computedClass = computed<string>(() => {
	return props.isNavCollapsed ? 'nav-collapsed' : 'nav-open';
});

function changeActiveTheme(
	name: AvailableThemes,
	rendition: AvailableThemesRenditions
) {
	if (selectedTheme != undefined) {
		selectedTheme.value.name = name;
		selectedTheme.value.rendition = rendition;
	}
}
</script>

<template>
	<main class="settings-dropdown-wrapper" :class="computedClass">
		<section class="settings-dropdown-container" :class="computedClass">
			<header class="settings-dropdown-header">Select Color Theme</header>
			<button
				v-for="option in themeOptions"
				class="settings-selection-button"
				@click="changeActiveTheme(option.name, option.rendition)">
				{{ option.displayLabel }}
			</button>
		</section>
	</main>
</template>

<style lang="scss" scoped>
.settings-dropdown-wrapper {
	@import '@assets/mixins.scss';
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 100;

	&.nav-open {
		background-color: var(--primary-background-accent);
	}

	&.nav-collapsed {
		left: calc(100% - 1rem);
		width: calc(100vw - 100% + 1rem);
		background-color: rgba($color: #000000, $alpha: 0.6);
		border-left: 1px solid var(--primary-foreground-accent);
	}

	.settings-dropdown-header {
		text-transform: uppercase;
		font-weight: 600;
		width: 80%;
		height: fit-content;
		padding: 0.5rem 10%;
		text-align: center;
		border-bottom: 1px solid var(--primary-foreground-accent);
	}

	.settings-dropdown-container {
		@include flex-parent(center, stretch, $gap: 1.5rem);
		width: calc(100% - 2rem);
		max-width: 15rem;
		height: calc(100% - 2rem);
		background-color: var(--primary-background-accent);
		padding: 1rem;

		.settings-selection-button {
			@include ButtonTheme1;
			width: 100%;
		}
	}
}
</style>
