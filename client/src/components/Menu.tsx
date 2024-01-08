import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

import { Button } from './ui/button';
import ProfileButton from '@/features/profile/ProfileButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import MessagingButton from '@/features/messaging/MessagingButton';

const Menu = () => {
	return (
		<nav>
			<ul className="flex items-center gap-1 lg:gap-3">
				<li>
					<Button variant="ghost" size="icon" asChild>
						<Link to="/community">
							<Users />
						</Link>
					</Button>
				</li>

				<li>
					<MessagingButton />
				</li>

				<li>
					<DarkModeToggle />
				</li>

				<li>
					<ProfileButton />
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
