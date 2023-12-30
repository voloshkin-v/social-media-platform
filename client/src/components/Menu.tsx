import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ProfileButton from '@/features/auth/ProfileButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import MessagingButton from '@/features/messaging/MessagingButton';

const Menu = () => {
	return (
		<nav>
			<ul className="flex items-center gap-3">
				<li>
					<Button asChild variant="link">
						<Link to="/community">Community</Link>
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
