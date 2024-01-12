import { useToast } from '@/components/ui/use-toast';
import { updateCurrentUser } from '@/services/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EditProfileValues } from '../EditProfileForm';

const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: (values: EditProfileValues) => updateCurrentUser(values),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['currentUser'],
				exact: true,
			});

			toast({
				title: 'Profile has been successfully updated.',
				variant: 'default',
			});
		},
		onError: (err) => {
			let errMessage = 'Could not update your data';

			if (err instanceof AxiosError) {
				errMessage = err.response?.data.message;
			}

			toast({
				title: errMessage,
				variant: 'destructive',
			});
		},
	});
};

export default useUpdateProfile;
