import { getUsers } from '@/services/users';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import Loader from '@/components/Loader';
import User from './User';

const UserList = () => {
	const { ref, inView } = useInView();
	const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['users'],
		queryFn: getUsers,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const morePagesExist = lastPage.length === 9;
			if (!morePagesExist) return undefined;
			return allPages.length + 1;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <p>ERROR</p>;
	}

	return (
		<div>
			<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{data.pages.map((users) => users.map((user) => <User key={user._id} user={user} />))}
			</ul>
			<span className="absolute opacity-0" ref={ref}></span>

			{isFetchingNextPage && (
				<div className="mt-5 flex justify-center">
					<Loader />
				</div>
			)}
		</div>
	);
};

export default UserList;
