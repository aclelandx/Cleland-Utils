import { ThemeTypeObject, ActiveThemeT } from '@types';
import { AvailableThemes, AvailableThemesRenditions } from '@enums';
import { CSSProperties } from 'vue';

/**
 * @param Theme Theme type object
 * @returns - Array of css formatted variables.
 * Takes in a theme type object and populates the scss variables accordingly.
 */
export function populateActivetheme(theme: ThemeTypeObject): ActiveThemeT {
	const output = {} as ActiveThemeT;

	if (theme.name == undefined || theme.rendition == undefined) return output;

	if (
		theme.name == AvailableThemes.custom &&
		theme.rendition == AvailableThemesRenditions.custom
	) {
		output.backgroundColor = theme.userCustom.background;
		output.backgroundColorAccent = theme.userCustom.backgroundAccent;
		output.foregroundColor = theme.userCustom.foreground;
		output.foregroundColorAccent = theme.userCustom.foregroundAccent;

		return output;
	} else {
		const background = `--${theme.name}-background-${theme.rendition}`;
		const backgroundAccent = `--${theme.name}-background-${theme.rendition}-accent`;
		const foreground = `--${theme.name}-foreground-${theme.rendition}`;
		const foregroundAccent = `--${theme.name}-foreground-${theme.rendition}-accent`;

		output.backgroundColor = background;
		output.backgroundColorAccent = backgroundAccent;
		output.foregroundColor = foreground;
		output.foregroundColorAccent = foregroundAccent;

		return output;
	}
}

/**
 * @param theme Takes in ThemeTypeObject
 * @returns CSSProperties to add to a :style attribute on an HTML element
 */
export function injectActiveTheme(theme: ThemeTypeObject): CSSProperties {
	if (
		theme.name == AvailableThemes.custom &&
		theme.rendition == AvailableThemesRenditions.custom
	) {
		const activeThemeObject = populateActivetheme(theme);
		const output = {
			'--primary-background': `${activeThemeObject.backgroundColor}`,
			'--primary-background-accent': `${activeThemeObject.backgroundColorAccent}`,
			'--primary-foreground': `${activeThemeObject.foregroundColor}`,
			'--primary-foreground-accent': `${activeThemeObject.foregroundColorAccent}`,
		};
		return output;
	} else {
		const activeThemeObject = populateActivetheme(theme);
		const output = {
			'--primary-background': `var(${activeThemeObject.backgroundColor})`,
			'--primary-background-accent': `var(${activeThemeObject.backgroundColorAccent})`,
			'--primary-foreground': `var(${activeThemeObject.foregroundColor})`,
			'--primary-foreground-accent': `var(${activeThemeObject.foregroundColorAccent})`,
		};
		return output;
	}
}
