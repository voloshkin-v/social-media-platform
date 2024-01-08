import { refresh } from '@/services/auth';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const baseURL = 'http://localhost:3000/api/v1';

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
		return Promise.reject();
	}
};

createAuthRefreshInterceptor(apiAxiosPrivate, refreshAuth, {
	statusCodes: [401], // default: [ 401 ]
	pauseInstanceWhileRefreshing: true,
});
