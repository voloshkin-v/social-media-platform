import { useAuth } from '@/features/auth/context/AuthProvider';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
