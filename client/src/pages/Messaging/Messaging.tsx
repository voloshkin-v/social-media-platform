import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Messaging = () => {
	return (
		<div className="flex h-full flex-1">
			<div className="w-1/3">mess</div>

			<div className="2/3">
				<div className="flex gap-5">
					<Input />
					<Button>Send</Button>
				</div>
			</div>
		</div>
	);
};

export default Messaging;
