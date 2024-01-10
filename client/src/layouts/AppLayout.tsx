import { Link, Outlet, useLocation } from 'react-router-dom';
import { Info } from 'lucide-react';
import useCurrentUser from '@/hooks/useCurrentUser';

import Header from '@/components/Header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const AppLayout = () => {
	const { user } = useCurrentUser();

	return (
		<>
			<Header />

			<main className="container flex flex-col gap-10 py-10">
				{!user.isActivated && (
					<Alert>
						<Info className="h-4 w-4" />
						<AlertTitle>Hey, {user.username} 👋</AlertTitle>
						<AlertDescription>
							To unlock all features, please activate your account. As soon as you fill in all data your
							account will be activated 🌟
							<Button className="mt-4 block w-fit underline hover:no-underline" variant="link" asChild>
								<Link to="/profile/edit">Activate</Link>
							</Button>
						</AlertDescription>
					</Alert>
				)}

				<Outlet />
			</main>
		</>
	);
};

export default AppLayout;
