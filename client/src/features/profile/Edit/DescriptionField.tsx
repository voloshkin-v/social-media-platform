import { UseFormReturn } from 'react-hook-form';
import { EditProfileValues } from './EditProfileForm';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface Props {
	form: UseFormReturn<EditProfileValues>;
}

const DescriptionField = ({ form }: Props) => {
	return (
		<FormField
			control={form.control}
			name="description"
			render={({ field }) => (
				<FormItem>
					<FormLabel>About me</FormLabel>

					<FormControl>
						<Textarea className="resize-none" {...field} />
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default DescriptionField;
