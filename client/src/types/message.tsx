export type MessagesStatus = 'received' | 'sent';

interface IMessageUser {
	_id: string;
	username: string;
	profilePicture?: string;
}

export interface IMessage {
	_id: string;
	sender: IMessageUser;
	recipient: IMessageUser;
	message: string;
	createdAt: string;
}
