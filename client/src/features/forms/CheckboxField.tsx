import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface Props<T extends FieldValues> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
	data: {
		id: string;
		label: string;
	}[];
}

const CheckboxField = <T extends FieldValues>({ form, name, label, data }: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
						{data.map((item) => (
							<FormField
								key={item.id}
								control={form.control}
								name={name}
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
																		(value: string) => value !== item.label,
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

export default CheckboxField;
