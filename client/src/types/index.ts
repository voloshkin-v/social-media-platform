// axios responses
export interface UsersResponse {
	// users: IUser[];
}

// export interface AuthResponse {
// token: string;
// user: IUserContext;
// }

// auth context
// export interface IUserContext {
// 	// _id: string;
// 	// username: string;
// 	// isActivated: boolean;
// }

interface Auth {
	// token: string;
	// user: IUserContext;
}

export interface IAuthContext {
	// login: (values: { email: string; password: string }) => void;
	// user: IUserContext | null;
}

// community user
export interface IUser {
	// _id: string;
	// username: string;
	// isActivated: boolean;
	// other fields...
}

// MAIN NEW

export interface IUserContext {
	_id: string;
	username: string;
	isActivated: boolean;
}

// axios responses
export interface AuthResponse {
	user: IUserContext;
}
