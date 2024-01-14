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
	const keyword = searchParams.get('keyword');

	const queryKey = ['users', gender, languageLevel, country, minAge, maxAge, keyword].filter(Boolean);

	return useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) => getUsers({ pageParam, gender, languageLevel, country, minAge, maxAge, keyword }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			console.log(allPages, lastPage);
			const morePagesExist = lastPage.length === 9;
			if (!morePagesExist) return undefined;
			return allPages.length + 1;
		},
	});
};

export default useUsers;
