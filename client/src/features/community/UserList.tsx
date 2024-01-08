import { getUsers } from '@/services/users';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const UserList = () => {
	const {
		data: users,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	if (isPending) {
		return <p>PENDING</p>;
	}

	if (isError) {
		return <p>ERROR</p>;
	}

	console.log(typeof users[0].birthDate);

	return (
		<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{users.map((user) => (
				<li className="border p-2">
					<h2>
						{user.username} - {user._id} - {JSON.stringify(user.isActivated)}
					</h2>
					<p key={user._id}>{user.description}</p>
					<Link to={`/profile/${user._id}`}>LINK</Link>
				</li>
			))}
		</ul>
	);
};

export default UserList;
