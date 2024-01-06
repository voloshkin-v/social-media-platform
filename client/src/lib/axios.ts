import { refresh } from '@/services/auth';
import axiosLib from 'axios';

export const baseURL = 'http://localhost:3000/api/v1';

export const axiosDefault = axiosLib.create({
	baseURL,
	withCredentials: true,
});

export const axios = axiosLib.create({
	baseURL,
	withCredentials: true,
});

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axios.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				const res = await refresh();
				localStorage.setItem('token', res.token);
				return axios.request(originalRequest);
			} catch (err) {
				console.log(err);
			}
		}
		throw error;
	},
);
