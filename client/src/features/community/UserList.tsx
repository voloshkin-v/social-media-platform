import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/users';
import User from './User';
import { useAuth } from '../auth/context/AuthProvider';

const UserList = () => {
	console.log('user list');
	const { user } = useAuth();
	return user.username;

	const {
		data: users,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	if (isPending) {
		return <p>Loading...</p>;
	}

	if (isError) {
		console.log(error);
		return <p>Error!</p>;
	}

	return (
		<ul className="grid grid-cols-3 gap-10">
			{users.map((user) => (
				<User key={user._id} user={user} />
			))}
		</ul>
	);
};

export default UserList;
