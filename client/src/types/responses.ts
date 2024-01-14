import { IMessage } from './message';
import { IUser } from './user';
import { MessagesStatus } from './message';

type Status = 'success' | 'error' | 'fail';
export interface UsersResponse {
	status: Status;
	data: {
		users: IUser[];
	};
}

export interface UserResponse {
	status: Status;
	data: {
		user: IUser;
	};
}

export interface MessagesResponse {
	status: Status;
	messagesStatus: MessagesStatus;
	data: {
		messages: IMessage[];
	};
}
