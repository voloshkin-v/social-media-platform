import { messageSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TextareaField from '../forms/TextareaField';

type FormValues = z.infer<typeof messageSchema>;

const UserMessageButton = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			message: '',
		},
	});

	const onSubmit = (values: FormValues) => {
		console.log(values);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">Send message</Button>
			</DialogTrigger>

			<DialogContent className="gap-8">
				<DialogHeader>
					<DialogTitle>Drop a line</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<TextareaField form={form} name="message" label="Message" />
						<Button type="submit">Send message</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UserMessageButton;
