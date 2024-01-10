import { useParams } from 'react-router-dom';
import useUser from '@/features/profile/hooks/useUser';

import UserProfile from '@/features/profile/UserProfile';
import useCurrentUser from '@/hooks/useCurrentUser';
import UserProfileSkeleton from '@/features/profile/UserProfileSkeleton';

const Profile = () => {
	const { id } = useParams();
	const { data: user, isPending, isError } = useUser(id || '');
	const { user: currentUser } = useCurrentUser();

	if (isPending) {
		return <UserProfileSkeleton isActivated={currentUser.isActivated} />;
	}

	if (isError) {
		return <h1>User not found</h1>;
	}

	return <UserProfile user={user} isMessagingAvailable={currentUser.isActivated} />;
};

export default Profile;
