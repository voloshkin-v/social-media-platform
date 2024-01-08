export interface IUserAuth {
	_id: string;
	username: string;
	isActivated: boolean;
}

export interface IUser extends IUserAuth {
	profilePicture?: string;
	country?: string;
	gender?: 'Male' | 'Female';
	birthDate?: string;
	description?: string;
	interests?: string[];
}
