import { UseFormReturn } from 'react-hook-form';
import { EditProfileValues } from './EditProfileForm';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const BirthDateField = ({ form }: Props) => {
	return (
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
	);
};

export default BirthDateField;
