import { getMessages } from '@/services/messages';
import { MessagesStatus } from '@/types/message';
import { useQuery } from '@tanstack/react-query';

const useMessages = (status: MessagesStatus = 'received') => {
	return useQuery({
		queryKey: ['messages', status],
		queryFn: () => getMessages(status),
	});
};

export default useMessages;
