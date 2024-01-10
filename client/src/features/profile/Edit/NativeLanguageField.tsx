import { EditProfileValues } from './EditProfileForm';
import { UseFormReturn } from 'react-hook-form';
import { TCountryCode, countries, getCountryData, languages } from 'countries-list';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const NativeLanguageField = ({ form }: Props) => {
	const languagesList = Object.entries(languages).map((item) => {
		return {
			code: item[0],
			language: item[1].name,
		};
	});

	return (
		<FormField
			control={form.control}
			name="nativeLanguage"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Native language</FormLabel>

					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
						</FormControl>

						<SelectContent>
							{languagesList.map(({ code, language }) => (
								<SelectItem value={code} key={code}>
									{language}
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

export default NativeLanguageField;
