import { apiAxiosPrivate } from '@/lib/axios';
import { MessagesStatus } from '@/types/message';
import { MessagesResponse } from '@/types/responses';

export const getMessages = (status: MessagesStatus = 'received') => {
	return apiAxiosPrivate.get<MessagesResponse>(`/messages?status=${status}`).then((res) => res.data);
};

export const sendMessage = ({ message, recipientId }: { message: string; recipientId: string }) => {
	return apiAxiosPrivate
		.post('/messages/send', {
			message,
			recipientId,
		})
		.then((res) => res.data);
};
