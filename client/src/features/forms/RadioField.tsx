import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props<T extends FieldValues, U> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
	data: U[];
}

const RadioField = <T extends FieldValues, U extends string>({ form, name, label, data }: Props<T, U>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-2">
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col">
							{data.map((item) => (
								<FormItem key={item} className="flex items-center space-x-2 space-y-0">
									<FormControl>
										<RadioGroupItem value={item} />
									</FormControl>
									<FormLabel className="font-normal text-foreground">{item}</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default RadioField;
