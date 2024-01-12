import type { TCountryCode, TLanguageCode } from 'countries-list';

export interface IUserAuth {} // ?

type Gender = 'Male' | 'Female';

export interface IUser {
	_id: string;
	isActivated: boolean;
	username: string;
	profilePicture: string;
	interests: string[];
	languageLevel?: number;
	nativeLanguage?: TLanguageCode;
	country?: TCountryCode;
	gender?: Gender;
	birthDate?: string;
	description?: string;
	age?: number;
}
