import { useAuth } from '@/context/AuthProvider';
import { Link } from 'react-router-dom';

import CommunityOperations from '@/features/community/CommunityOperations';
import UserList from '@/features/community/UserList';
import { Button } from '@/components/ui/button';

const Community = () => {
	const { user } = useAuth();

	if (!user.isActivated) {
		return (
			<div className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
				<h1>
					🌟 To activate your account, please complete your profile
					information first 🌟
				</h1>

				<Button asChild className="w-fit">
					<Link to="/profile/edit">Activate</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<h1>Explore our community 🤘</h1>

			<CommunityOperations />
			<UserList />
		</>
	);
};

export default Community;
