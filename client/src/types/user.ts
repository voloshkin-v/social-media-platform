export interface IUserAuth {
	_id: string;
	username: string;
	isActivated: boolean;
}

export interface IUser extends IUserAuth {
	// Others
}
