import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormSubmitButtonProps {
	isSubmitting: boolean;
	children: React.ReactNode;
}

const FormSubmitButton = ({
	children,
	isSubmitting,
}: FormSubmitButtonProps) => {
	return (
		<Button className="w-full" type="submit" disabled={isSubmitting}>
			{isSubmitting ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading...
				</>
			) : (
				children
			)}
		</Button>
	);
};

export default FormSubmitButton;
