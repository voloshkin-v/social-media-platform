import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const calculateUserAge = (date: string) => {
	const today = new Date();
	const birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age;
};

export const getLevel = (level: number) => {
	switch (level) {
		case 1:
			return 'A1';
		case 2:
			return 'A2';
		case 3:
			return 'B1';
		case 4:
			return 'B2';
		case 5:
			return 'C1';
		case 6:
			return 'C2';
		default:
			return null;
	}
};
