import { z } from 'zod';

export const editProfileSchema = z.object({
	username: z.string(),
});

export type EditProfileValues = z.infer<typeof editProfileSchema>;
