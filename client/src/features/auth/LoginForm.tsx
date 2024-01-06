import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { LoginValues, loginSchema } from './schemas';
import { login } from '@/services/auth';

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
import { useAuth } from '@/context/AuthProvider';

const SignUpForm = () => {
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: 'user@aa.aa',
			password: '123123123',
		},
	});

	const { setAuthState } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();
	const { isSubmitting } = form.formState;

	const onSubmit = async (values: LoginValues) => {
		try {
			const {
				token,
				data: { user },
			} = await login(values);

			localStorage.setItem('token', token);
			setAuthState(user, true);

			navigate('/');
		} catch (err) {
			console.log(err);
			let description = 'There was a problem with your request.';

			if (err instanceof AxiosError) {
				description = 'axios error';
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
