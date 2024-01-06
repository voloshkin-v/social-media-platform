import { useAuth } from '@/context/AuthProvider';
import { axios } from '@/lib/axios';
import { AuthResponse } from '@/types/responses';

const useRefresh = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const {
			data: { user },
			token,
		} = await axios
			.get<AuthResponse>('/auth/refresh')
			.then((res) => res.data);

		setAuth({ token, user });

		return token;
	};

	return { refresh };
};

export default useRefresh;
