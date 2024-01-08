import { IUser } from './user';

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
