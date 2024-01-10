import { getCurrentUser } from '@/services/users';
import { IUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = (enabled: boolean = true) => {
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
		enabled,
	});

	return { user: user as IUser, isLoading, isError, isPending, dataUpdatedAt };
};

export default useCurrentUser;
