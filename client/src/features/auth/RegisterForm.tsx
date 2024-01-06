import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterValues, registerSchema } from './schemas';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { register } from '@/services/auth';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthLink from './AuthLink';
import FormSubmitButton from './FormSubmitButton';

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
	const { setAuthState } = useAuth();
	const { isSubmitting } = form.formState;

	const onSubmit = async (values: RegisterValues) => {
		try {
			const {
				token,
				data: { user },
			} = await register(values);

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
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<h1 className="text-center">Register</h1>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Username" {...field} />
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

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="password"
										placeholder="Confirm password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormSubmitButton isSubmitting={isSubmitting}>
						Create an account
					</FormSubmitButton>

					<AuthLink
						title="Already have an accout?"
						to="/login"
						linkTitle="Login"
					/>
				</form>
			</Form>
		</>
	);
};

export default RegisterForm;
