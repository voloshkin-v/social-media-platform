import { z } from 'zod';

const email = z.string().email('Incorrect format of email address');
const username = z
	.string()
	.trim()
	.min(6, 'Username must be at least 6 characters')
	.max(20, 'Username must not be longer than 20 characters');
const password = z.string().min(8, 'Password must be at least 8 characters');
const gender = z.enum(['Male', 'Female'], {
	required_error: 'Please fill in this field',
});
const country = z.string({
	required_error: 'Please fill in this field',
});
const languageLevel = z.string({
	required_error: 'Please fill in this field',
});

export const registerSchema = z
	.object({
		email,
		username,
		password,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	email,
	password,
});

export const editProfileSchema = z.object({
	username,
	description: z
		.string({
			required_error: 'Please fill in this field',
		})
		.trim()
		.min(10, 'Bio must be at least 10 characters')
		.max(260, 'Bio must not be longer than 260 characters'),
	birthDate: z.date({
		required_error: 'Please fill in this field',
	}),
	gender,
	country,
	interests: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'Please fill in this field',
	}),
	nativeLanguage: z.string({
		required_error: 'Please fill in this field ',
	}),
	languageLevel,
	// profilePicture: z.any().refine((files) => {
	// 	console.log('FILES', files);

	// 	if (files?.length === 0) {
	// 		return true;
	// 	}

	// 	return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type);
	// }, 'Only .jpg, .jpeg and .png formats are supported.'),
});

export const filterSchema = z.object({
	gender: z.enum(['Male', 'Female', '']),
	languageLevel,
	country,
	age: z.tuple([z.number(), z.number()]),
});

export const messageSchema = z.object({
	message: z.string().min(10),
});
