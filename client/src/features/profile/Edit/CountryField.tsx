import { EditProfileValues } from './EditProfileForm';
import { UseFormReturn } from 'react-hook-form';
import { getCountryDataList } from 'countries-list';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const CountryField = ({ form }: Props) => {
	return (
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
							{getCountryDataList().map(({ name, iso2 }) => (
								<SelectItem value={iso2} key={iso2}>
									<span className={`fi mr-2 fi-${iso2.toLowerCase()}`}></span>
									{name}
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

export default CountryField;
