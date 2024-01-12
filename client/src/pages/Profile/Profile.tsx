import { useParams } from 'react-router-dom';
import useUser from '@/features/profile/hooks/useUser';

import UserProfile from '@/features/profile/UserProfile';
import useCurrentUser from '@/hooks/useCurrentUser';
import Loader from '@/components/Loader';
import InfoMessage from '@/components/InfoMessage';

const Profile = () => {
	const { id } = useParams();
	const { data: user, isPending, isError } = useUser(id || '');
	const { user: currentUser } = useCurrentUser();

	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <InfoMessage title="User not found" />;
	}

	return <UserProfile user={user} isMessagingAvailable={currentUser.isActivated} />;
};

export default Profile;
