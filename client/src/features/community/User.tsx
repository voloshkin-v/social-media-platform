import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface IUser {
	_id: string;
	username: string;
	isActivated: boolean;
	profilePicture: string;
	description: string;
	birthdate: Date;
	country: string;
	gender: string;
	interests: string[];
	nativaLanguages: string[];
	studyLanguages: {
		language: string;
		level: number;
	}[];
}

interface UserProps {
	user: IUser;
}

const User = ({ user }: UserProps) => {
	return (
		<li className="flex gap-4 rounded-md bg-secondary p-4 text-sm">
			<Avatar className="h-[75px] w-[75px]">
				<AvatarImage
					src={user.profilePicture}
					alt={`${user.username}'s profile picture`}
				/>

				<AvatarFallback>404</AvatarFallback>
			</Avatar>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<h4>{user.username}</h4>
					<span>26</span>
				</div>

				<p>{user.description}</p>

				<div className="flex gap-1">
					{user.interests.map((interest) => (
						<Badge key={interest}>{interest}</Badge>
					))}
				</div>

				<div>
					<span>Speaks</span>
					{user.nativaLanguages.map((language) => (
						<Badge key={language}>{language}</Badge>
					))}
				</div>

				<div>
					<span>Learns</span>
					{user.studyLanguages.map(({ language }) => (
						<Badge key={language}>{language}</Badge>
					))}
				</div>
			</div>
		</li>
	);
};

export default User;
