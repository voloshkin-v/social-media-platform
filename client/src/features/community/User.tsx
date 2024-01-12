import { getLevel } from '@/lib/utils';
import { IUser } from '@/types/user';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import UserProfilePicture from '../profile/UserProfilePicture';

interface UserProps {
	user: IUser;
}

const User = ({ user }: UserProps) => {
	return (
		<li>
			<Link
				to={`/profile/${user._id}`}
				className="flex h-full flex-col gap-6 rounded-xl bg-secondary p-4 text-sm transition-transform hover:-translate-y-[2px] min-[375px]:flex-row md:p-6"
			>
				<UserProfilePicture profilePicture={user.profilePicture} size="small" />

				<div className="space-y-3">
					<div className="flex flex-wrap items-center gap-3">
						<span className="text-base">{user.username}</span>
						{user.age && <span>{user.age}</span>}
						{user.country && <span className={`fi fi-${user.country.toLowerCase()}`}></span>}
					</div>

					<p>
						{user.description && user.description.length > 30
							? user.description.slice(0, 30) + '...'
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
