import { useAuth } from '@/context/AuthProvider';
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuth } = useAuth();
	console.log('---- GOES TO PROTECTED ROUTE -----');

	if (!isAuth) return <Navigate to="/login" />;

	return children;
};

export default ProtectedRoute;
