import { IMessage, MessagesStatus } from '@/types/message';
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
	message: IMessage;
	onMessageSelect: (item: IMessage) => void;
	isSelected: boolean;
	status: MessagesStatus;
}

const Message = ({ message, onMessageSelect, isSelected, status }: MessageProps) => {
	console.log(status);
	return (
		<button
			onClick={() => onMessageSelect(message)}
			key={message._id}
			className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left text-sm transition-all hover:bg-accent ${
				isSelected && 'bg-accent'
			}`}
		>
			<div className="flex w-full flex-col gap-1">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<div className="font-semibold">
							{status === 'received' ? message.sender.username : `To: ${message.recipient.username}`}
						</div>
					</div>

					<div className="text-xs text-foreground">
						{formatDistanceToNow(new Date(message.createdAt), {
							addSuffix: true,
						})}
					</div>
				</div>
			</div>

			<div className="line-clamp-2 text-xs text-muted-foreground">{message.message}</div>
		</button>
	);
};

export default Message;
