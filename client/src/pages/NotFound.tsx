import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="container flex h-screen flex-col items-center justify-center gap-5">
			<h1>Page NotFound 404</h1>

			<Button asChild>
				<Link to="/">Home</Link>
			</Button>
		</div>
	);
};

export default NotFound;
