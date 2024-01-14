import { getLevel } from '@/lib/utils';
import { IUser } from '@/types/user';
import { getCountryData, languages } from 'countries-list';
import useCurrentUser from '@/hooks/useCurrentUser';

import { Badge } from '@/components/ui/badge';
import UserMessageButton from '../messaging/UserMessageButton';
import ChangeImage from './ChangeImage';
import UserProfilePicture from './UserProfilePicture';

interface UserProfileProps {
	user: IUser;
	isMessagingAvailable?: boolean;
}

const UserProfile = ({ user, isMessagingAvailable }: UserProfileProps) => {
	const { user: currentUser } = useCurrentUser();
	const isMe = currentUser._id === user._id;

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:flex-nowrap md:gap-20">
				<div className="max-w-44 space-y-5">
					<UserProfilePicture profilePicture={user.profilePicture} />

					{!isMe && isMessagingAvailable && <UserMessageButton _id={user._id} />}
					{isMe && <ChangeImage hasProfilePicture={!user.profilePicture.includes('default')} />}
				</div>

				<div className="flex flex-col gap-5">
					<h1>{user.username}</h1>

					<ul className="flex flex-wrap gap-5 md:gap-10">
						<li className="flex flex-col">
							<div>{user.age ? user.age : 'Unknown'}</div>
							<span className="text-xs opacity-85">Age</span>
						</li>

						<li className="flex flex-col">
							<div>{user.gender || 'Unknown'}</div>
							<span className="text-xs opacity-85">Gender</span>
						</li>

						<li className="flex flex-col">
							<div className="space-x-2">
								{user.country ? (
									<>
										<span>{getCountryData(user.country).name || 'Unknown'}</span>
										<span className={`fi fi-${user.country.toLowerCase()}`}></span>
									</>
								) : (
									'Unknown'
								)}
							</div>

							<span className="text-xs opacity-85">Country of residence</span>
						</li>

						<li className="flex flex-col">
							<div>{user.nativeLanguage ? languages[user.nativeLanguage]?.name : 'Unknown'}</div>
							<span className="text-xs opacity-85">Native language</span>
						</li>
					</ul>

					<ul className="flex flex-wrap gap-2">
						{user.interests.map((interest) => (
							<li key={interest} className="flex">
								<Badge variant="secondary">{interest}</Badge>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="rounded-xl bg-secondary p-4 md:p-6">
				<h2 className="mb-3">About me</h2>
				<p className="text-sm">{user.description}</p>
			</div>

			<div className="rounded-xl bg-secondary p-4 md:p-6">
				<h2 className="mb-3">English level</h2>
				<p className="text-sm">{getLevel(user.languageLevel || -1)}</p>
			</div>
		</div>
	);
};

export default UserProfile;
