import { refresh } from '@/services/auth';
import axios, { AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// export const baseURL = 'http://localhost:3000/api/v1';
export const baseURL = 'https://use-speak-40e0qlam5-vitaliis-projects-290ea7d0.vercel.app/api/v1';

export const apiAxios = axios.create({
	baseURL,
	withCredentials: true,
});

// interceptor on 401 unauthorized.
export const apiAxiosPrivate = axios.create({
	baseURL,
	withCredentials: true,
});

const refreshAuth = async () => {
	try {
		await refresh();
		return Promise.resolve();
	} catch (err) {
		if (err instanceof AxiosError && err.response?.status === 401) {
			window.location.href = '/login';
		}

		return Promise.reject();
	}
};

createAuthRefreshInterceptor(apiAxiosPrivate, refreshAuth, {
	statusCodes: [401], // default: [ 401 ]
	pauseInstanceWhileRefreshing: true,
});
