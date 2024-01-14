import { IUser } from './api/users/user.model';

export {};

declare global {
	namespace Express {
		export interface Request {
			isActivated: boolean;
			userId: string;
			user: IUser;
		}
	}
}
