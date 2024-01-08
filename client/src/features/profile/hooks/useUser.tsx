import { getUser } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

const useUser = (id: string) => {
	return useQuery({
		queryKey: ['user', id],
		queryFn: () => getUser(id),
	});
};

export default useUser;
