import useUpdateProfilePicture from './hooks/useUpdateProfilePicture';
import useDeleteProfilePicture from './hooks/useDeleteProfilePicture';

import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

const ChangeImage = ({ hasProfilePicture }: { hasProfilePicture: boolean }) => {
	const { mutate, isPending } = useUpdateProfilePicture();
	const { mutate: deletePicture } = useDeleteProfilePicture();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const file = files[0];
		const formData = new FormData();
		formData.append('profilePicture', file);
		mutate(formData);
	};

	return !hasProfilePicture ? (
		<>
			<Input
				disabled={isPending}
				onChange={handleChange}
				className="mx-auto w-fit cursor-pointer text-[0px] file:text-foreground"
				type="file"
			/>
		</>
	) : (
		<div className="flex flex-col gap-4">
			<AlertDialog>
				<AlertDialogTrigger asChild className="mx-auto w-fit">
					<Button variant="outline">Remove</Button>
				</AlertDialogTrigger>

				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={() => deletePicture()}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ChangeImage;
