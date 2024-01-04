import { Pencil, User, CircleUser, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useToast } from '@/components/ui/use-toast';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const ProfileButton = () => {
	const { toast } = useToast();
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		console.log('logout...');
		// try {
		// 	await logout();
		// } catch (err) {
		// 	toast({
		// 		variant: 'destructive',
		// 		title: 'Uh oh! Something went wrong.',
		// 		description: 'There was a problem with your request.',
		// 	});
		// }
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<CircleUser />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>username</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link to="/profile">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link to="/profile/edit">
							<Pencil className="mr-2 h-4 w-4" />
							<span>Edit</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileButton;
