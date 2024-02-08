import { InjectionKey, Ref } from 'vue';
import { ThemeTypeObject } from '@types';

export const SelectedThemeInjectionKey: InjectionKey<Ref<ThemeTypeObject>> =
	Symbol('SelectedTheme');
