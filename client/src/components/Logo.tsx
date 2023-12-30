import { Link } from 'react-router-dom';
import { PersonStanding } from 'lucide-react';
import { Button } from './ui/button';

const Logo = () => {
	return (
		<Button asChild variant="ghost" size="icon">
			<Link to="/">
				<PersonStanding width={40} height={40} />
			</Link>
		</Button>
	);
};

export default Logo;
