import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email('Incorrect format of email address'),
		username: z.string().min(6, 'Username must be at least 6 characters'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	email: z.string().email('Incorrect format of email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
