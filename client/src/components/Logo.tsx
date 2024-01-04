import { Link } from 'react-router-dom';
import { PersonStanding } from 'lucide-react';

const Logo = () => {
	return (
		<Link to="/">
			<PersonStanding width={40} height={40} />
		</Link>
	);
};

export default Logo;
