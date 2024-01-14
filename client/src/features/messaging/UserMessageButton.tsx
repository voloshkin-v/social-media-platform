import { messageSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useSendMessage from './hooks/useSendMessage';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TextareaField from '../forms/TextareaField';

type FormValues = z.infer<typeof messageSchema>;

interface UserMessageButtonProps {
	_id: string;
}

const UserMessageButton = ({ _id }: UserMessageButtonProps) => {
	const [open, setOpen] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			message: '',
		},
	});
	const { mutate, isPending } = useSendMessage();

	const onSubmit = (values: FormValues) => {
		const body = {
			message: values.message,
			recipientId: _id,
		};

		mutate(body, {
			onSuccess: () => {
				setOpen(false);
				form.reset();
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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

						<Button type="submit" disabled={isPending}>
							{isPending ? <span>Loading...</span> : <span>Send message</span>}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UserMessageButton;
