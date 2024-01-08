import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IUser } from '@/types/user';
import { editProfileSchema } from '@/lib/schemas';
import { z } from 'zod';
import useUpdateProfile from './hooks/useUpdateProfile';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import FormSubmitButton from '../auth/FormSubmitButton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/constants/countries';
import { interests } from '@/lib/constants/interests';
import { Checkbox } from '@/components/ui/checkbox';

export type EditProfileValues = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
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
			interests: user.interests,
			birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
		},
	});
	const { mutate, isPending } = useUpdateProfile();

	const onSubmit = (values: EditProfileValues) => {
		mutate(values);
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

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>About me</FormLabel>

							<FormControl>
								<Textarea className="resize-none" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="birthDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date of birth</FormLabel>

							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn('w-[240px] pl-3 text-left font-normal hover:bg-background')}
										>
											{field.value ? format(field.value, 'PPP') : null}
											<CalendarIcon className="ml-auto h-4 w-4" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										defaultMonth={new Date(2002, 3)}
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Gender</FormLabel>

							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col"
								>
									<FormItem className="flex items-center space-x-2 space-y-0">
										<FormControl>
											<RadioGroupItem value="Male" />
										</FormControl>
										<FormLabel className="font-normal text-foreground">Male</FormLabel>
									</FormItem>

									<FormItem className="flex items-center space-x-2 space-y-0">
										<FormControl>
											<RadioGroupItem value="Female" />
										</FormControl>
										<FormLabel className="font-normal text-foreground">Female</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country of residence</FormLabel>

							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>

								<SelectContent>
									{countries.map(({ code, name }) => (
										<SelectItem value={name} key={code}>
											<span className={`fi mr-2 fi-${code}`}></span>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="interests"
					render={() => (
						<FormItem>
							<FormLabel>Interests</FormLabel>

							<div className="grid grid-cols-4 gap-4">
								{interests.map((item) => (
									<FormField
										key={item.id}
										control={form.control}
										name="interests"
										render={({ field }) => {
											return (
												<FormItem
													key={item.id}
													className="flex flex-row items-center space-x-2 space-y-0"
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(item.id)}
															onCheckedChange={(checked) => {
																return checked
																	? field.onChange([...field.value, item.id])
																	: field.onChange(
																			field.value?.filter(
																				(value) => value !== item.id,
																			),
																		);
															}}
														/>
													</FormControl>

													<FormLabel className="font-normal text-foreground">
														{item.label}
													</FormLabel>
												</FormItem>
											);
										}}
									/>
								))}
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-fit">
					<FormSubmitButton isSubmitting={isPending}>Submit</FormSubmitButton>
				</div>
			</form>
		</Form>
	);
};

export default EditProfileForm;
