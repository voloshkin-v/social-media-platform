import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { editProfileSchema, EditProfileValues } from './schema';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const EditProfileForm = () => {
	const form = useForm<EditProfileValues>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			username: '',
		},
	});

	const onSubmit = (values: EditProfileValues) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>

							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default EditProfileForm;
