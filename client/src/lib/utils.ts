import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
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
