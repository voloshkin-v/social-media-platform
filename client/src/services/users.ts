import { apiAxios } from '@/lib/axios';
import { UsersResponse } from '@/types';

export const getUsers = async () => {
	return apiAxios.get<UsersResponse>('/users').then((res) => res.data.users);
};
