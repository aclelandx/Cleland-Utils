import { AvailableThemes, AvailableThemesRenditions } from '@enums';

export interface ThemeOptionValuesT {
	name: AvailableThemes;
	rendition: AvailableThemesRenditions;
	displayLabel: string;
}

export const themeOptions: ThemeOptionValuesT[] = [
	{
		name: AvailableThemes.dark,
		rendition: AvailableThemesRenditions.one,
		displayLabel: `${AvailableThemes.dark} ${AvailableThemesRenditions.one}`,
	},
	{
		name: AvailableThemes.dark,
		rendition: AvailableThemesRenditions.two,
		displayLabel: `${AvailableThemes.dark} ${AvailableThemesRenditions.two}`,
	},
	{
		name: AvailableThemes.dark,
		rendition: AvailableThemesRenditions.three,
		displayLabel: `${AvailableThemes.dark} ${AvailableThemesRenditions.three}`,
	},
	{
		name: AvailableThemes.dark,
		rendition: AvailableThemesRenditions.four,
		displayLabel: `${AvailableThemes.dark} ${AvailableThemesRenditions.four}`,
	},
	{
		name: AvailableThemes.dark,
		rendition: AvailableThemesRenditions.five,
		displayLabel: `${AvailableThemes.dark} ${AvailableThemesRenditions.five}`,
	},
	{
		name: AvailableThemes.light,
		rendition: AvailableThemesRenditions.one,
		displayLabel: `${AvailableThemes.light} ${AvailableThemesRenditions.one}`,
	},
	{
		name: AvailableThemes.light,
		rendition: AvailableThemesRenditions.two,
		displayLabel: `${AvailableThemes.light} ${AvailableThemesRenditions.two}`,
	},
	{
		name: AvailableThemes.light,
		rendition: AvailableThemesRenditions.three,
		displayLabel: `${AvailableThemes.light} ${AvailableThemesRenditions.three}`,
	},
	{
		name: AvailableThemes.light,
		rendition: AvailableThemesRenditions.four,
		displayLabel: `${AvailableThemes.light} ${AvailableThemesRenditions.four}`,
	},
	{
		name: AvailableThemes.light,
		rendition: AvailableThemesRenditions.five,
		displayLabel: `${AvailableThemes.light} ${AvailableThemesRenditions.five}`,
	},
	{
		name: AvailableThemes.custom,
		rendition: AvailableThemesRenditions.custom,
		displayLabel: `${AvailableThemes.custom} Theme`,
	},
];
