import { AvailableThemes, AvailableThemesRenditions } from '@enums';
import { UserCreatedThemeT } from '@types';

export interface ThemeTypeObject {
	name: AvailableThemes;
	rendition: AvailableThemesRenditions;
	userCustom: UserCreatedThemeT;
}
