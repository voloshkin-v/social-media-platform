import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import Loader from '@/components/Loader';
import User from './User';
import useUsers from './hooks/useUsers';
import InfoMessage from '@/components/InfoMessage';

const UserList = () => {
	const { ref, inView } = useInView();
	const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useUsers();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <InfoMessage title="Something went wrong" />;
	}

	if (!data.pages[0].length) {
		return <InfoMessage title="Nobody was found 😔" description="Try changing the filters" />;
	}

	return (
		<div>
			<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
