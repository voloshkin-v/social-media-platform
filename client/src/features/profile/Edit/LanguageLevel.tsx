import { EditProfileValues } from './EditProfileForm';
import { levels } from '@/lib/constants/level';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const LanguageLevel = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name="languageLevel"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Select your level of English</FormLabel>

					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
						</FormControl>

						<SelectContent>
							{levels.map(({ level, rating }) => (
								<SelectItem value={rating.toString()} key={rating}>
									{level}
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

export default LanguageLevel;
