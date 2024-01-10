import { interests } from '@/lib/constants/interests';
import { EditProfileValues } from './EditProfileForm';
import { UseFormReturn } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const InterestsField = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name="interests"
			render={() => (
				<FormItem>
					<FormLabel>Interests</FormLabel>

					<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
													checked={field.value?.includes(item.label)}
													onCheckedChange={(checked) => {
														return checked
															? field.onChange([...field.value, item.label])
															: field.onChange(
																	field.value?.filter(
																		(value) => value !== item.label,
																	),
																);
													}}
												/>
											</FormControl>

											<FormLabel className="font-normal text-foreground">{item.label}</FormLabel>
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
	);
};

export default InterestsField;
