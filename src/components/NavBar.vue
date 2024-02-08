<script setup lang="ts">
import { ref } from 'vue';
import chevron from '@assets/svg/chevron.svg';
import homeIcon from '@assets/svg/homeicon.svg';
import themeSelectorIcon from '@assets/svg/themeSelectorIcon.svg';
import gearIcon from '@assets/svg/gearicon.svg';
import xIcon from '@assets/svg/xicon.svg';
import { NavOptionT } from '@types';
import SettingsDropdown from './SettingsDropdown.vue';

withDefaults(
	defineProps<{
		isNavCollapsed: boolean;
	}>(),
	{
		isNavCollapsed: false,
	}
);

const emit = defineEmits<{
	toggleCollapse: [void];
}>();

const options: NavOptionT[] = [
	{ displayLabel: 'Theme Selector', icon: themeSelectorIcon },
	{ displayLabel: 'Home', icon: homeIcon },
];

const optionSelectorEl = ref<HTMLElement>();
const settingsAnimationState = ref<boolean>(false);
const isSettingsOpen = ref<boolean>(false);

const settingsClass = ref<string>('closed');

function toggleSettings(): void {
	isSettingsOpen.value ? closeSettings() : openSettings();
}

function openSettings(): void {
	settingsAnimationState.value = true;
	setTimeout(() => (isSettingsOpen.value = true), 250);
	setTimeout(() => {
		settingsAnimationState.value = false;
		settingsClass.value = 'open';
	}, 500);
}

function closeSettings(): void {
	settingsAnimationState.value = true;
	setTimeout(() => (isSettingsOpen.value = false), 250);
	setTimeout(() => {
		settingsAnimationState.value = false;
		settingsClass.value = 'closed';
	}, 500);
}
</script>

<template>
	<nav :class="{ collapsed: isNavCollapsed }" class="primary-nav">
		<section class="settings" :class="settingsClass" @click="toggleSettings">
			<gearIcon
				v-show="!isSettingsOpen"
				class="gear-icon"
				:class="{ animate: settingsAnimationState }" />
			<xIcon
				v-show="isSettingsOpen"
				class="x-icon"
				:class="{ animate: settingsAnimationState }" />
		</section>
		<ul>
			<li
				v-for="option in options"
				ref="optionSelectorEl"
				:key="option.displayLabel"
				:data-tooltip="option.displayLabel">
				<component :is="option.icon" />
				<span :class="{ 'delay-display': !isNavCollapsed }">{{
					option.displayLabel
				}}</span>
			</li>
		</ul>
		<button class="collapse-button" @click="emit('toggleCollapse')">
			<chevron />
		</button>
		<SettingsDropdown
			:is-nav-collapsed="isNavCollapsed"
			v-if="isSettingsOpen" />
	</nav>
</template>

<style lang="scss">
@import '@assets/mixins.scss';
@keyframes delay-display {
	0% {
		position: absolute;
		opacity: 0%;
	}
	1% {
		position: static;
	}
	100% {
		position: static;
		opacity: 100%;
	}
}

.primary-nav {
	width: 15rem;
	height: 100vh;
	position: relative;

	background-color: var(--primary-background-accent);
	color: var(--primary-foreground-accent);

	display: flex;
	flex-flow: row nowrap;

	transition: width 250ms, color 250ms ease-in-out;

	ul {
		height: 100%;
		width: calc(100% - 1rem);
		list-style-type: none;

		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		li {
			width: calc(100% - 1.5rem);
			height: 3rem;
			padding: 0.5rem 0.75rem;

			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: flex-start;
			gap: 0.5rem;

			transition: 250ms ease-in-out;

			> svg {
				height: 2rem;
				display: block;
				fill: var(--primary-foreground-accent);

				transition: fill 250ms ease-in-out;
			}

			span {
				font-family: 'Open sans';
				text-transform: uppercase;
				letter-spacing: 0.05rem;
				font-weight: 600;
				font-size: 1rem;
				line-height: 1.5rem;
				align-self: center;
				opacity: 0;
				text-align: center;
				min-width: fit-content;

				&.delay-display {
					animation-name: delay-display;
					animation-play-state: running;
					animation-delay: 300ms;
					animation-timing-function: ease-out;
					animation-fill-mode: forwards;
					animation-duration: 250ms;
					animation-iteration-count: 1;
				}
			}

			&:hover {
				background-color: var(--primary-foreground);
				cursor: pointer;

				svg {
					transition: fill 250ms ease-in-out;
					fill: var(--primary-background);
				}

				span {
					transition: 250ms ease-in-out;
					color: var(--primary-background);
				}
			}
		}
	}

	button.collapse-button {
		width: 1rem;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 600;
		font-size: 0.5rem;
		border: none;
		text-align: center;
		background-color: var(--primary-foreground);
		color: var(--primary-foreground-accent);

		> svg {
			fill: var(--primary-foreground-accent);
			width: 0.75rem;
			height: 2rem;
			transition: 250ms ease-in-out 250ms;
		}
	}

	&.collapsed {
		width: 5rem;

		transition: 250ms ease-in-out;

		ul {
			width: 4rem;
			transition: 250ms ease-in-out;

			li {
				width: calc(100% - 1.5rem);
				justify-content: center;
				transition: 250ms linear;

				span {
					display: none;
					white-space: nowrap;
				}
			}
		}

		button.collapse-button {
			transition: 250ms ease-in-out;

			> svg {
				rotate: 180deg;
				transition: 250ms ease-in-out;
				transition-delay: 250ms;
			}
		}
	}

	section.settings {
		@include flex-parent;
		position: absolute;
		top: 0.5rem;
		height: 2rem;
		width: 2rem;
		left: 1rem;
		z-index: 150;

		> svg {
			width: 2rem;
			height: 2rem;
			display: block;
			fill: var(--primary-foreground-accent);

			&:hover {
				cursor: pointer;
			}
		}

		&.open {
			.gear-icon.animate {
				@include ShrinkToNothing(250ms, ease-out, reverse, 2rem, 2rem);
			}

			.x-icon.animate {
				@include ShrinkToNothing(250ms, ease-in, normal, 2rem, 2rem);
			}
		}

		&.closed {
			.gear-icon.animate {
				@include ShrinkToNothing(250ms, ease-in, normal, 2rem, 2rem);
			}

			.x-icon.animate {
				@include ShrinkToNothing(250ms, ease-out, reverse, 2rem, 2rem);
			}
		}
	}
}
</style>
