import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

interface Props<T extends FieldValues> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
}

const DateField = <T extends FieldValues>({ form, name, label }: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					{label && <FormLabel>Date of birth</FormLabel>}

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
	);
};

export default DateField;
