import Filters from './Filters';
import Search from './Search';

const CommunityOperations = () => {
	return (
		<div className="flex flex-wrap items-center justify-between gap-5 lg:gap-10">
			<Filters />
			<Search />
		</div>
	);
};

export default CommunityOperations;
