import { useAuth } from '@/features/auth/context/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
	const { isAuth } = useAuth();

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-5 p-5 lg:p-10">
			<div className="rounded-lg p-8 shadow-lg">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
