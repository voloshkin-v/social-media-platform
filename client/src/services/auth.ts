import { apiAxios } from '@/lib/axios';
import { AuthResponse } from '@/types';

export const login = (data: { email: string; password: string }) => {
	return apiAxios
		.post<AuthResponse>('/auth/login', data)
		.then((res) => res.data);
};

export const register = (data: {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
}) => {
	return apiAxios
		.post<AuthResponse>('/auth/register', data)
		.then((res) => res.data);
};

export const logout = () => {
	return apiAxios.post('/auth/logout');
};
