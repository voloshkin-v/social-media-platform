// import { UseFormReturn } from 'react-hook-form';
// import { EditProfileValues } from './EditProfileForm';

// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';

// interface Props {
// 	form: UseFormReturn<EditProfileValues>;
// }

// const UsernameField = ({ form }: Props) => {
// 	return (
// 		<FormField
// 			control={form.control}
// 			name="username"
// 			render={({ field }) => (
// 				<FormItem>
// 					<FormLabel>Username</FormLabel>

// 					<FormControl>
// 						<Input {...field} />
// 					</FormControl>

// 					<FormMessage />
// 				</FormItem>
// 			)}
// 		/>
// 	);
// };

// export default UsernameField;

// import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { HTMLInputTypeAttribute } from 'react';

// interface Props<T extends FieldValues> {
// 	name: Path<T>;
// 	form: UseFormReturn<T>;
// 	label?: string;
// 	placeholder?: string;
// 	type?: HTMLInputTypeAttribute;
// }

// const InputField = <T extends FieldValues>({ form, name, label, placeholder = '', type = 'text' }: Props<T>) => {
// 	return (
// 		<FormField
// 			control={form.control}
// 			name={name}
// 			render={({ field }) => (
// 				<FormItem>
// 					{label && <FormLabel>{label}</FormLabel>}

// 					<FormControl>
// 						<Input type={type} placeholder={placeholder} {...field} />
// 					</FormControl>

// 					<FormMessage />
// 				</FormItem>
// 			)}
// 		/>
// 	);
// };

// export default InputField;
