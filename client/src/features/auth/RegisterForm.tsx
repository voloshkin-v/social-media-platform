import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterValues, registerSchema } from './schemas';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './context/AuthProvider';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthLink from './AuthLink';

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

	const { toast } = useToast();
	const { register } = useAuth();
	const { isSubmitting } = form.formState;

	const onSubmit = async (values: RegisterValues) => {
		try {
			await register(values);
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
									<Input placeholder="Password" {...field} />
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
										placeholder="Confirm password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						className="w-full"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Loading...
							</>
						) : (
							<span>Create an account</span>
						)}
					</Button>

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
