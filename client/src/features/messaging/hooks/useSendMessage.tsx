import { useToast } from '@/components/ui/use-toast';
import { sendMessage } from '@/services/messages';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useSendMessage = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: (values: { message: string; recipientId: string }) => sendMessage(values),
		onSuccess: () => {
			toast({
				title: 'The message has been successfully sent',
			});
		},
		onError: (err) => {
			let title = 'Ops, something went wrong';

			if (err instanceof AxiosError) {
				title = err.response?.data.message;
			}

			toast({
				title,
				variant: 'destructive',
			});
		},
	});
};

export default useSendMessage;
