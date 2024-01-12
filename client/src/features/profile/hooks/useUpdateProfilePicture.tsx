import { useToast } from '@/components/ui/use-toast';
import { updateProfilePicture } from '@/services/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useUpdateProfilePicture = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: updateProfilePicture,
		onSuccess: () => {
			toast({
				title: 'Profile picture has been successfully updated',
			});

			queryClient.invalidateQueries({ queryKey: ['currentUser'], exact: true });
		},
		onError: (err) => {
			let title = 'Something went wrong';

			if (err instanceof AxiosError) {
				title = err.response?.data.message;
			}

			toast({
				title,
				variant: 'destructive',
			});
		},
	});
};

export default useUpdateProfilePicture;
