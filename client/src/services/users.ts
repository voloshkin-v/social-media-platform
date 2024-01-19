import { EditProfileValues } from '@/features/profile/EditProfileForm';
import { apiAxiosPrivate } from '@/lib/axios';
import { UserResponse, UsersResponse } from '@/types/responses';

interface GetUsersProps {
	pageParam: number;
	gender: string | null;
	languageLevel: string | null;
	country: string | null;
	minAge: string | null;
	maxAge: string | null;
	keyword: string | null;
}

export const getUsers = async ({
	pageParam,
	gender,
	languageLevel,
	country,
	minAge,
	maxAge,
	keyword,
}: GetUsersProps) => {
	let query = `/users?page=${pageParam}`;

	if (gender) {
		query = query + `&gender=${gender}`;
	}

	if (languageLevel) {
		query = query + `&languageLevel=${languageLevel}`;
	}

	if (country) {
		query = query + `&country=${country}`;
	}

	if (minAge) {
		query = query + `&minAge=${minAge}`;
	}

	if (maxAge) {
		query = query + `&maxAge=${maxAge}`;
	}

	if (keyword) {
		query = query + `&keyword=${keyword}`;
	}

	return apiAxiosPrivate.get<UsersResponse>(query).then((res) => res.data.data.users);
};

export const getUser = async (id: string) => {
	return apiAxiosPrivate.get<UserResponse>(`/users/${id}`).then((res) => res.data.data.user);
};

export const getCurrentUser = async () => {
	return apiAxiosPrivate.get<UserResponse>('/users/currentUser').then((res) => res.data.data.user);
};

export const updateCurrentUser = async (values: EditProfileValues) => {
	return apiAxiosPrivate.patch('/users/currentUser', values).then((res) => res.data);
};

export const updateProfilePicture = (formData: FormData) => {
	return apiAxiosPrivate
		.patch('/users/profilePicture', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((res) => res.data);
};

export const deleteProfilePicture = () => {
	return apiAxiosPrivate.delete('/users/profilePicture').then((res) => res.data);
};
