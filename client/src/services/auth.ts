import { apiAxios } from '@/lib/axios';

export const login = (data: { email: string; password: string }) => {
	return apiAxios.post('/auth/login', data).then((res) => res.data);
};

export const register = (data: { email: string; password: string; confirmPassword: string; username: string }) => {
	return apiAxios.post('/auth/register', data).then((res) => res.data);
};

export const logout = () => {
	return apiAxios.post('/auth/logout');
};

export const refresh = () => {
	return apiAxios.get('/auth/refresh').then((res) => res.data);
};
