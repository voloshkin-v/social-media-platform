import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { login } from '@/services/auth';
import { loginSchema } from '@/lib/schemas';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import { Form } from '@/components/ui/form';
import AuthLinks from './AuthLink';
import FormSubmitButton from './FormSubmitButton';
import InputField from '../forms/InputField';

type LoginValues = z.infer<typeof loginSchema>;

const SignUpForm = () => {
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: 'voloshin.v.02@gmail.com',
			password: '123123123',
		},
	});

	const navigate = useNavigate();
	const { toast } = useToast();
	const { isSubmitting } = form.formState;

	const onSubmit = async (values: LoginValues) => {
		try {
			await login(values);
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
				<h1 className="text-center">Login</h1>

				<InputField form={form} name="email" placeholder="Email" type="email" />
				<InputField form={form} name="password" placeholder="Password" type="password" />

				<FormSubmitButton isSubmitting={isSubmitting}>Login</FormSubmitButton>
				<AuthLinks title="Not registered yet?" to="/register" linkTitle="Register" />
			</form>
		</Form>
	);
};

export default SignUpForm;
