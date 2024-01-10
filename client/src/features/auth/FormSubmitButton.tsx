import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormSubmitButtonProps {
	isSubmitting: boolean;
	isDisabled?: boolean;
	children: React.ReactNode;
}

const FormSubmitButton = ({ children, isSubmitting, isDisabled }: FormSubmitButtonProps) => {
	return (
		<Button className="w-full" type="submit" disabled={isSubmitting || isDisabled}>
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
