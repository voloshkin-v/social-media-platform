import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center p-5 lg:p-10">
			<div className="rounded-lg p-8 shadow-lg">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
