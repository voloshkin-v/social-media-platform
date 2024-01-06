import { IUserAuth, IUser } from './user';

type Status = 'success' | 'error';

export interface UsersResponse {
	status: Status;
	data: {
		users: IUser[];
	};
}

export interface AuthResponse {
	status: Status;
	token: string;
	data: {
		user: IUserAuth;
	};
}
