import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ACCEPTED_IMAGE_MIME_TYPES } from './constants';

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

export const getImageData = (event: React.ChangeEvent<HTMLInputElement>) => {
	// FileList is immutable, so we need to create a new one
	const dataTransfer = new DataTransfer();

	// Add newly uploaded images
	Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

	const files = dataTransfer.files;
	const displayUrl = URL.createObjectURL(event.target.files![0]);

	return { files, displayUrl };
};
