import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IUser } from '@/types/user';
import { editProfileSchema } from '@/lib/schemas';
import { z } from 'zod';
import useUpdateProfile from '../hooks/useUpdateProfile';

import { Form } from '@/components/ui/form';
import FormSubmitButton from '../../auth/FormSubmitButton';
// import UsernameField from './UsernameField';
import DescriptionField from './DescriptionField';
import BirthDateField from './BirthDateField';
import GenderField from './GenderField';
import CountryField from './CountryField';
import InterestsField from './InterestsField';
import NativeLanguageField from './NativeLanguageField';
import LearningLanguagesField from './LanguageLevel';

export type EditProfileValues = z.infer<typeof editProfileSchema>;

export interface EditProfileFormProps {
	user: IUser;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
	const form = useForm<EditProfileValues>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			username: user.username,
			description: user.description,
			gender: user.gender,
			country: user.country,
			interests: user.interests || [],
			birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
			nativeLanguage: user.nativeLanguage,
			languageLevel: user.languageLevel?.toString(),
		},
	});
	const { mutate, isPending } = useUpdateProfile();

	const onSubmit = (values: EditProfileValues) => {
		mutate(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* <UsernameField form={form} label="Username" name="username" /> */}

				{/* <UsernameField<EditProfileForm> form={form} label="LABEL" name="NAME" /> */}
				<DescriptionField form={form} />
				<BirthDateField form={form} />
				<GenderField form={form} />
				<CountryField form={form} />
				<InterestsField form={form} />
				<NativeLanguageField form={form} />
				<LearningLanguagesField form={form} />

				<div className="w-fit">
					<FormSubmitButton isDisabled={!form.formState.isDirty} isSubmitting={isPending}>
						Submit
					</FormSubmitButton>
				</div>
			</form>
		</Form>
	);
};

export default EditProfileForm;
