import { useQuery } from '@tanstack/react-query';
import { UsersResponse } from '@/types/responses';
import useAxios from '@/hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const users2 = [
	{
		_id: '1',
		username: 'Vitalii Voloshyn',
		isActivated: false,
		profilePicture: 'https://github.com/shadcn.png',
		description: 'I want to become fluent in English',
		birthdate: new Date(),
		country: 'UA',
		gender: 'Male',
		interests: ['Sport', 'Music', 'Dance'],
		nativaLanguages: ['ua'],
		studyLanguages: [{ language: 'En', level: 1 }],
	},
	{
		_id: '2',
		username: 'Mark Jonas',
		isActivated: false,
		profilePicture: 'https://github.com/shadcn.png',
		description: 'Hello friends, lets talk',
		birthdate: new Date(),
		country: 'UA',
		gender: 'Male',
		interests: ['It', 'Math'],
		nativaLanguages: ['en'],
		studyLanguages: [{ language: 'en', level: 3 }],
	},
];

const UserList = () => {
	// const {
	// 	data: users,
	// 	isPending,
	// 	isError,
	// } = useQuery({
	// 	queryKey: ['users'],
	// 	queryFn: () =>
	// 		axiosPrivate
	// 			.get<UsersResponse>('/users')
	// 			.then((res) => res.data.data.users),
	// });

	// if (isPending) {
	// 	return <p>Loading...</p>;
	// }

	// if (isError) {
	// 	// navigate('/login');
	// 	return <p>Error</p>;
	// }

	return <h1>users</h1>;

	return (
		<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{JSON.stringify(users, null, 4)}
			{/* {users.map((user) => (
				<User key={user._id} user={user} />
			))} */}
		</ul>
	);
};

export default UserList;
