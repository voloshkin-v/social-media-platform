import MessagingList from '@/features/messaging/MessagingList';
import useMessages from '@/features/messaging/hooks/useMessages';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '@/components/Loader';
import InfoMessage from '@/components/InfoMessage';

const Messaging = () => {
	const { data: receivedMessages, isPending: isPendingReceived, isError: isErrorReceived } = useMessages();
	const { data: sentMessages, isPending: isPendingSent, isError: isErrorSent } = useMessages('sent');

	if (isPendingReceived || isPendingSent) {
		return <Loader />;
	}

	if (isErrorReceived || isErrorSent) {
		return <InfoMessage title="Something went wrong" />;
	}

	return (
		<Tabs defaultValue="received">
			<div className="mb-10 flex flex-wrap justify-between">
				<h1>Box</h1>

				<TabsList>
					<TabsTrigger value="received">Received</TabsTrigger>
					<TabsTrigger value="sent">Sent</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="received">
				<MessagingList messages={receivedMessages.data.messages} status={receivedMessages.messagesStatus} />
			</TabsContent>

			<TabsContent value="sent">
				<MessagingList messages={sentMessages.data.messages} status={sentMessages.messagesStatus} />
			</TabsContent>
		</Tabs>
	);
};

export default Messaging;
