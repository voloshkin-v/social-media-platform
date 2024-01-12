import { Pencil, CircleUser, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { logout } from '@/services/auth';
import useCurrentUser from '@/hooks/useCurrentUser';

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
import { useQueryClient } from '@tanstack/react-query';

const ProfileButton = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { user } = useCurrentUser();
	const queryClient = useQueryClient();

	const handleLogout = async () => {
		try {
			await logout();
			queryClient.removeQueries();
			navigate('/login');
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<CircleUser />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>{user.username}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem asChild disabled={!user.isActivated}>
						<Link to={`/profile`}>
							<User className="mr-2 h-4 w-4" />
							<span>Profile {!user.isActivated && <span className="ml-1 text-xs">not active</span>}</span>
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
