import { useAuth } from '@/context/AuthProvider';
import { axiosPrivate } from '@/lib/axios';
import { useEffect } from 'react';
import useRefresh from './useRefresh';

const useAxios = () => {
	const { auth } = useAuth();
	const { refresh } = useRefresh();

	useEffect(() => {
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth.token}`;
				}

				return config;
			},
			(err) => Promise.reject(err),
		);

		const responseInterceptor = axiosPrivate.interceptors.response.use(
			function (response) {
				return response;
			},
			async function (error) {
				const prevRequest = error?.config;

				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] =
						`Bearer ${newAccessToken}`;
					return axiosPrivate(prevRequest);
				}

				return Promise.reject(error);
			},
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestInterceptor);
			axiosPrivate.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return { axiosPrivate };
};

export default useAxios;
