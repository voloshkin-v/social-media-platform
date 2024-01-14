import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
	profilePicture: string;
	size?: 'default' | 'small' | 'mini';
}

const UserProfilePicture = ({ profilePicture, size = 'default' }: Props) => {
	let classNames = '';

	switch (size) {
		case 'default':
			classNames = 'h-24 w-24 shrink-0 md:h-44 md:w-44';
			break;
		case 'small':
			classNames = 'h-12 w-12 md:h-20 md:w-20';
			break;
		case 'mini':
			classNames = 'h-12 w-12';
			break;
	}

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
