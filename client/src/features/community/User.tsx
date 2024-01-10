import { calculateUserAge, getLevel } from '@/lib/utils';
import { IUser } from '@/types/user';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface UserProps {
	user: IUser;
}

const User = ({ user }: UserProps) => {
	return (
		<li>
			<Link
				to={`/profile/${user._id}`}
				className="flex h-full gap-6 rounded-xl bg-secondary p-4 text-sm transition-transform hover:-translate-y-[2px] md:p-6"
			>
				<Avatar className="h-14 w-14">
					<AvatarImage src={user.profilePicture} alt="profile picture" />
				</Avatar>

				<div className="space-y-3">
					<div className="flex flex-wrap items-center gap-3">
						<span className="text-base">{user.username}</span>
						{user.birthDate && <span>{calculateUserAge(user.birthDate)}</span>}
						{user.country && <span className={`fi fi-${user.country.toLowerCase()}`}></span>}
					</div>

					<p>
						{user.description && user.description.length > 30
							? user.description.slice(1, 30) + '...'
							: user.description}
					</p>

					<p>Level of english: {user.languageLevel && getLevel(user.languageLevel)}</p>

					<div className="flex flex-wrap gap-1">
						{user.interests.map((item) => (
							<Badge key={item}>{item}</Badge>
						))}
					</div>
				</div>
			</Link>
		</li>
	);
};

export default User;
