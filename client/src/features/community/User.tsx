import { IUser } from '@/types/users';

interface UserProps {
	user: IUser;
}

const User = ({ user }: UserProps) => {
	return (
		<li className="rounded-md bg-gray-100 p-5">
			<div>{user.username}</div>
			<div>{user.isActivated ? 'Activated' : 'NOT Activated'}</div>
		</li>
	);
};

export default User;
