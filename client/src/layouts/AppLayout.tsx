import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

const AppLayout = () => {
	return (
		<>
			<Header />

			<main className="container flex flex-col gap-10 pt-10 lg:px-10">
				<Outlet />
			</main>
		</>
	);
};

export default AppLayout;
