import { EditProfileValues } from './EditProfileForm';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const GenderField = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name="gender"
			render={({ field }) => (
				<FormItem className="space-y-2">
					<FormLabel>Gender</FormLabel>

					<FormControl>
						<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col">
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
	);
};

export default GenderField;
