import { useState } from 'react';
import { IMessage, MessagesStatus } from '@/types/message';

import Message from './Message';
import MessagePreview from './MessagePreview';
import InfoMessage from '@/components/InfoMessage';

interface Props {
	messages: IMessage[];
	status: MessagesStatus;
}

const MessagingList = ({ messages, status }: Props) => {
	const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);

	const handleMessageSelect = (item: IMessage) => {
		setSelectedMessage(item);
	};

	if (!messages.length) {
		return <InfoMessage title="You have no messages yet 😉" />;
	}

	return (
		<div className="grid gap-10 sm:grid-cols-2">
			<div className="flex flex-col gap-5">
				{messages.map((message) => (
					<Message
						isSelected={message._id === selectedMessage?._id}
						key={message._id}
						message={message}
						onMessageSelect={handleMessageSelect}
						status={status}
					/>
				))}
			</div>

			{selectedMessage && <MessagePreview selectedMessage={selectedMessage} status={status} />}
		</div>
	);
};

export default MessagingList;
