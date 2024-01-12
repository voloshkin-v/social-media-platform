import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Input } from '@/components/ui/input';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [text, setText] = useState(searchParams.get('keyword') || '');
	const [value] = useDebounce(text, 1000);

	useEffect(() => {
		if (!value) {
			searchParams.delete('keyword');
			setSearchParams(searchParams);

			return;
		}

		searchParams.set('keyword', value);
		setSearchParams(searchParams);
	}, [value, setSearchParams, searchParams]);

	return (
		<Input
			className="max-w-72"
			value={text}
			onChange={(e) => {
				setText(e.target.value);
			}}
			type="text"
			placeholder="Search"
		/>
	);
};

export default Search;
