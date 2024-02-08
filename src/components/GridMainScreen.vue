<script setup lang="ts">
import { computed, defineProps } from 'vue';
import ThemeSelector from '@components/ThemeSelector.vue';

const props = defineProps<{
	header: string;
	isNavCollapsed: boolean;
}>();

const computedHeader = computed<string>(() => {
	return props.header;
});
</script>

<template>
	<main :class="{ 'nav-collapsed': isNavCollapsed }">
		<h1>
			{{ computedHeader }}
		</h1>
		<ThemeSelector />
	</main>
</template>

<style lang="scss" scoped>
main {
	width: calc(100% - 19rem);
	height: 100%;
	transition: 250ms ease-in-out;
	padding: 0 2rem;
	background-color: var(--primary-background);

	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	&.nav-collapsed {
		width: calc(100% - 9rem);
		overflow-y: auto;
		overflow-x: hidden;
	}

	h1 {
		height: 2rem;
		width: 100%;
		text-align: center;
		color: var(--primary-foreground-accent);
		font-family: 'open sans';
		text-transform: uppercase;
		font-weight: 300;
		font-size: 2rem;
		border-radius: 0.25rem;
		padding: 0.5rem 0;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		background-color: var(--primary-foreground);
	}
}
</style>
