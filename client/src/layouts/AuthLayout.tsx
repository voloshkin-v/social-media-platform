import useCurrentUser from '@/hooks/useCurrentUser';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
	const { user } = useCurrentUser(false);

	if (user) {
		return <Navigate to="/" />;
	}

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center p-5 lg:p-10">
			<div className="rounded-lg bg-secondary p-8 shadow-lg">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
