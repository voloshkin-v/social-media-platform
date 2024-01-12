import UserProfile from '@/features/profile/UserProfile';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Navigate } from 'react-router-dom';

const MyProfile = () => {
	const { user } = useCurrentUser();

	if (!user.isActivated) {
		return <Navigate to="/profile/edit" />;
	}

	return <UserProfile user={user} isMe={true} />;
};

export default MyProfile;
