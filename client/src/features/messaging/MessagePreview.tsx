import { IMessage, MessagesStatus } from '@/types/message';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

import UserProfilePicture from '../profile/UserProfilePicture';

const MessagePreviewReceived = ({ message }: { message: IMessage }) => {
	return (
		<>
			<div className="border-b p-4">
				<Link to={`/profile/${message.sender._id}`} className="flex items-center gap-4">
					{message.sender.profilePicture && (
						<UserProfilePicture size="mini" profilePicture={message.sender.profilePicture} />
					)}
					<h3 className="text-sm">{message.sender.username}</h3>
				</Link>
			</div>

			<div className="p-4 text-sm">
				<p>{message.message}</p>

				<p className="mt-10 flex items-center gap-2 border-t pt-4 text-xs opacity-70">
					<Info className="h-4 w-4" />
					<span>To reply click on the user profile</span>
				</p>
			</div>
		</>
	);
};

const MessagePreviewSent = ({ message }: { message: IMessage }) => {
	return (
		<>
			<div className="border-b p-4">
				<Link to={`/profile/${message.recipient._id}`} className="flex items-center gap-4">
					{message.recipient.profilePicture && (
						<UserProfilePicture size="mini" profilePicture={message.recipient.profilePicture} />
					)}
					<h3 className="text-sm">{message.recipient.username}</h3>
				</Link>
			</div>

			<div className="p-4 text-sm">
				<p>{message.message}</p>
			</div>
		</>
	);
};

interface MessagePreviewProps {
	selectedMessage: IMessage;
	status: MessagesStatus;
}

const MessagePreview = ({ selectedMessage, status }: MessagePreviewProps) => {
	return (
		<div className="h-fit rounded-xl border">
			{status === 'received' ? (
				<MessagePreviewReceived message={selectedMessage} />
			) : (
				<MessagePreviewSent message={selectedMessage} />
			)}
		</div>
	);
};

export default MessagePreview;
