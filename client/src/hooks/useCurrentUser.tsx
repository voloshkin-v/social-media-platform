import { getCurrentUser } from '@/services/users';
import { IUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
	const {
		data: user,
		isLoading,
		isPending,
		isError,
		dataUpdatedAt,
	} = useQuery({
		queryKey: ['currentUser'],
		queryFn: getCurrentUser,
		retry: false,
	});

	return { user: user as IUser, isLoading, isError, isPending, dataUpdatedAt };
};

export default useCurrentUser;
