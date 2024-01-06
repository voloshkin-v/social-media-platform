import { AuthResponse } from '@/types/responses';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';
import { baseURL } from '@/lib/axios';

export const login = (data: { email: string; password: string }) => {
	return axios
		.post<AuthResponse>('/auth/login', data)
		.then((res) => res.data);
};

export const register = (data: {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
}) => {
	return axios
		.post<AuthResponse>('/auth/register', data)
		.then((res) => res.data);
};

export const logout = () => {
	return axios.post('/auth/logout');
};

export const refresh = () => {
	return axiosDefault
		.get<AuthResponse>(`${baseURL}/auth/refresh`, {
			withCredentials: true,
		})
		.then((res) => res.data);
};
