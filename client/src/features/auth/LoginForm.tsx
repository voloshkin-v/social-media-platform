import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { login } from '@/services/auth';
import { loginSchema } from '@/lib/schemas';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthLinks from './AuthLink';
import FormSubmitButton from './FormSubmitButton';
import { useNavigate } from 'react-router-dom';

type LoginValues = z.infer<typeof loginSchema>;

const SignUpForm = () => {
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: 'user@aa.aa',
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

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="email"
									placeholder="Email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									placeholder="Password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormSubmitButton isSubmitting={isSubmitting}>
					Login
				</FormSubmitButton>

				<AuthLinks
					title="Not registered yet?"
					to="/register"
					linkTitle="Register"
				/>
			</form>
		</Form>
	);
};

export default SignUpForm;
