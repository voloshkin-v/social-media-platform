import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface Props<T extends FieldValues> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
	placeholder?: string;
	data: {
		icon?: string;
		label: string;
		value: string;
	}[];
}
const SelectField = <T extends FieldValues>({ form, name, label, data }: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<Select onValueChange={field.onChange} value={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
						</FormControl>

						<SelectContent>
							{data.map((item) => (
								<SelectItem value={item.value} key={item.value}>
									{item.icon && <span className={`fi mr-2 fi-${item.icon}`}></span>}
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectField;
