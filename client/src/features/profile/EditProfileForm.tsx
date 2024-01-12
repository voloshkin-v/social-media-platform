import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IUser } from '@/types/user';
import { editProfileSchema } from '@/lib/schemas';
import { z } from 'zod';
import useUpdateProfile from './hooks/useUpdateProfile';
import { levels, countries, interests, languagesList } from '@/lib/constants';

import { Form } from '@/components/ui/form';
import FormSubmitButton from '../auth/FormSubmitButton';
import InputField from '@/features/forms/InputField';
import TextareaField from '@/features/forms/TextareaField';
import SelectField from '@/features/forms/SelectField';
import CheckboxField from '@/features/forms/CheckboxField';
import RadioField from '@/features/forms/RadioField';
import DateField from '@/features/forms/DateField';

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
				<InputField form={form} name="username" label="Username" />
				<TextareaField form={form} name="description" label="About me" />
				<DateField form={form} name="birthDate" label="Date of birth" />
				<RadioField<EditProfileValues, EditProfileValues['gender']>
					form={form}
					name="gender"
					label="Gender"
					data={['Male', 'Female']}
				/>
				<SelectField form={form} name="country" label="Country of residence" data={countries} />
				<CheckboxField form={form} name="interests" label="Interests" data={interests} />
				<SelectField form={form} name="nativeLanguage" label="Native language" data={languagesList} />
				<SelectField form={form} name="languageLevel" label="Select your level of English" data={levels} />
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
