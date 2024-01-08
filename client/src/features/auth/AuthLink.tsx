import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AuthLinkProps {
	to: string;
	title: string;
	linkTitle: string;
}

const AuthLink = ({ title, linkTitle, to }: AuthLinkProps) => {
	return (
		<div className="flex flex-wrap items-center gap-1 text-[12px]">
			<span>{title}</span>

			<Button
				className="text-[12px] underline hover:no-underline"
				variant="link"
				asChild
			>
				<Link to={to}>{linkTitle}</Link>
			</Button>
		</div>
	);
};

export default AuthLink;
