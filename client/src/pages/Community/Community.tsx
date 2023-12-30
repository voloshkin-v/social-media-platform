import { useAuth } from '@/features/auth/context/AuthProvider';
import CommunityOperations from '@/features/community/CommunityOperations';
import UserList from '@/features/community/UserList';

const Community = () => {
	// const {
	// 	auth: { user },
	// } = useAuth();

	// if (!user.isActivated) {
	// 	return (
	// 		<div className="gap flex flex-col gap-4">
	// 			<h1>
	// 				Activate your account to get full access to application 🔓🚀
	// 			</h1>

	// 			<Button asChild className="w-fit">
	// 				<Link to="/profile/edit">Edit my profile</Link>
	// 			</Button>
	// 		</div>
	// 	);
	// }

	return (
		<>
			<h1>Explore our community 🤘</h1>

			<CommunityOperations />
			<UserList />
		</>
	);
};

export default Community;
