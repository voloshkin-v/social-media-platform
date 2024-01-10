import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { register } from '@/services/auth';
import { registerSchema } from '@/lib/schemas';

import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthLink from './AuthLink';
import FormSubmitButton from './FormSubmitButton';
import InputField from '../forms/InputField';
// import UsernameField from '../profile/Edit/UsernameField';
// import InputField from '../profile/Edit/UsernameField';

type RegisterValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
	const form = useForm<RegisterValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: 'user@aa.aa',
			username: 'username__v',
			password: '123123123',
			confirmPassword: '123123123',
		},
	});

	const navigate = useNavigate();
	const { toast } = useToast();
	const { isSubmitting } = form.formState;

	const onSubmit = async (values: RegisterValues) => {
		try {
			await register(values);
			navigate('/');
		} catch (err) {
			let description = 'There was a problem with your request.';

			if (err instanceof AxiosError) {
				description = err.response?.data?.message;
			}

			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description,
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<h1 className="text-center">Register</h1>

				<InputField form={form} name="email" placeholder="Email" type="email" />
				<InputField form={form} name="username" placeholder="Username" />
				<InputField form={form} name="password" placeholder="Password" type="password" />
				<InputField form={form} name="confirmPassword" placeholder="Confirm password" type="password" />

				<FormSubmitButton isSubmitting={isSubmitting}>Create an account</FormSubmitButton>
				<AuthLink title="Already have an accout?" to="/login" linkTitle="Login" />
			</form>
		</Form>
	);
};

export default RegisterForm;
