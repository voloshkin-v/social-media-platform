import { axios } from '@/lib/axios';
import { UsersResponse } from '@/types/responses';

export const getUsers = async () => {
	return axios
		.get<UsersResponse>('/users')
		.then((res) => res.data.data.users);
};
