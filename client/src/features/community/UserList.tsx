import User from './User';

const users = [
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
	return (
		<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{users.map((user) => (
				<User key={user._id} user={user} />
			))}
		</ul>
	);
};

export default UserList;
