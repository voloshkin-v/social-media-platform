import CommunityOperations from '@/features/community/CommunityOperations';
import UserList from '@/features/community/UserList';

const Community = () => {
	return (
		<>
			<h1>Explore our community 🤘</h1>

			<CommunityOperations />
			<UserList />
		</>
	);
};

export default Community;
