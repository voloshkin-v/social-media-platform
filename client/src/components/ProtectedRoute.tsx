import { Navigate } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';
import useCurrentUser from '@/hooks/useCurrentUser';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, isLoading, isError } = useCurrentUser();

	if (isLoading) {
		return <FullScreenLoader />;
	}

	if (isError) {
		return <Navigate to="/login" />;
	}

	if (user) return children;
};

export default ProtectedRoute;
