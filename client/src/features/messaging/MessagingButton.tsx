import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const MessagingButton = () => {
	return (
		<Button variant="ghost" size="icon" asChild>
			<Link to="/messaging">
				<Mail />
			</Link>
		</Button>
	);
};

export default MessagingButton;
