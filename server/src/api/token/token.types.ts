export interface AccessToken {
	userId: string;
	isActivated: boolean;
	iat: number;
	exp: number;
}

export interface RefreshToken {
	userId: string;
	iat: number;
	exp: number;
}
