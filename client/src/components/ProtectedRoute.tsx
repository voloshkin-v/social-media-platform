import { useAuth } from '@/context/AuthProvider';
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuth } = useAuth();

	// if (!isAuth) return <Navigate to="/login" />;

	return children;
};

export default ProtectedRoute;
