import { useAuth } from '@/context/AuthProvider';
import { refresh } from '@/services/auth';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';

const UserAuth = () => {
	// const [isLoading, setIsLoading] = useState(true);
	// const { setAuthState } = useAuth();

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');

	// 	const verifyAuth = async () => {
	// 		try {
	// 			const {
	// 				data: { user },
	// 				token,
	// 			} = await refresh();

	// 			localStorage.setItem('token', token);
	// 			setAuthState({ user, isAuth: true });
	// 		} catch (err) {
	// 			console.log(err);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	token ? verifyAuth() : setIsLoading(false);
	// }, []);

	// if (isLoading) {
	// 	return <FullScreenLoader />;
	// }

	return <Outlet />;
};

export default UserAuth;
