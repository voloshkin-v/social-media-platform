import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Props<T extends FieldValues> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
}

const InputField = <T extends FieldValues>({ form, name, label, placeholder = '', type = 'text' }: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Input type={type} placeholder={placeholder} {...field} />
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default InputField;
