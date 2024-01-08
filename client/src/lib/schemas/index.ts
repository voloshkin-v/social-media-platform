import { z } from 'zod';

const email = z.string().email('Incorrect format of email address');
const username = z
	.string()
	.trim()
	.min(6, 'Username must be at least 6 characters')
	.max(20, 'Username must not be longer than 20 characters');
const password = z.string().min(8, 'Password must be at least 8 characters');

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
			required_error: 'Please write about yourself',
		})
		.trim()
		.min(10, 'Bio must be at least 10 characters')
		.max(160, 'Bio must not be longer than 160 characters'),
	birthDate: z.date({
		required_error: 'A date of birth is required',
	}),
	gender: z.enum(['Male', 'Female'], {
		required_error: 'You need to select this field',
	}),
	country: z.string({
		required_error: 'Please select a country',
	}),
	interests: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.',
	}),
});
