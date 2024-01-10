import { EditProfileValues } from '@/features/profile/Edit/EditProfileForm';
import { apiAxiosPrivate } from '@/lib/axios';
import { UserResponse, UsersResponse } from '@/types/responses';

export const getUsers = async ({ pageParam }: { pageParam: number }) => {
	return apiAxiosPrivate.get<UsersResponse>(`/users?page=${pageParam}`).then((res) => res.data.data.users);
};

export const getUser = async (id: string) => {
	return apiAxiosPrivate.get<UserResponse>(`/users/${id}`).then((res) => res.data.data.user);
};

export const getCurrentUser = async () => {
	return apiAxiosPrivate.get<UserResponse>('/users/currentUser').then((res) => res.data.data.user);
};

export const updateCurrentUser = async (values: EditProfileValues) => {
	return apiAxiosPrivate.patch('/users', values).then((res) => res.data);
};
