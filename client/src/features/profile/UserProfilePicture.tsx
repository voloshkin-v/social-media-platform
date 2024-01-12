import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
	profilePicture: string;
	size?: 'default' | 'small';
}

const UserProfilePicture = ({ profilePicture, size = 'default' }: Props) => {
	const classNames = size === 'default' ? 'h-24 w-24 shrink-0 md:h-44 md:w-44' : 'h-12 w-12 md:h-20 md:w-20';

	return (
		<Avatar className={classNames}>
			<AvatarImage src={profilePicture} className="h-full w-full rounded-[50%] object-cover" />
			<AvatarFallback className="flex h-full w-full items-center justify-center rounded-[50%] border border-primary">
				<Skeleton />
			</AvatarFallback>
		</Avatar>
	);
};

export default UserProfilePicture;
