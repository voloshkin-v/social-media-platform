import { getUsers } from '@/services/users';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const useUsers = () => {
	const [searchParams] = useSearchParams();
	const gender = searchParams.get('gender');
	const languageLevel = searchParams.get('languageLevel');
	const country = searchParams.get('country');
	const minAge = searchParams.get('minAge');
	const maxAge = searchParams.get('maxAge');

	return useInfiniteQuery({
		queryKey: ['users', gender, languageLevel, country, minAge, maxAge],
		queryFn: ({ pageParam }) => getUsers({ pageParam, gender, languageLevel, country, minAge, maxAge }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const morePagesExist = lastPage.length === 9;
			if (!morePagesExist) return undefined;
			return allPages.length + 1;
		},
	});
};

export default useUsers;
