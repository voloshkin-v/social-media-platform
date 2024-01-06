import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import ProfileButton from '@/features/auth/ProfileButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import MessagingButton from '@/features/messaging/MessagingButton';

const Menu = () => {
	return (
		<nav>
			<ul className="flex items-center gap-1 lg:gap-3">
				<li>
					<Button asChild variant="link">
						<Link to="/community">Community</Link>
					</Button>
				</li>

				<li>
					<Link to="/login">Login</Link>
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
