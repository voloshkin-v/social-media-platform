import { useAuth } from '@/context/AuthProvider';
import { refresh } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuth, setAuthState } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: refresh,
	});

	useEffect(() => {
		if (data) {
			setAuthState(data.data.user, true);
		}
	}, [data, setAuthState]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!isLoading && !isAuth) {
		return <Navigate to="/login" />;
	}

	// console.log('goes to ProtectedRoute', isAuth);
	// if (!isAuth) return <Navigate to="/login" />;

	if (isAuth) return children;
};

export default ProtectedRoute;
