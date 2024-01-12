import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface Props<T extends FieldValues> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
}

const TextareaField = <T extends FieldValues>({ form, name, label }: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Textarea className="resize-none" {...field} />
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default TextareaField;
