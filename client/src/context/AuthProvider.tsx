import { createContext, useContext, useState } from 'react';
import * as authService from '@/services/auth';
import { LoginValues, RegisterValues } from '../features/auth/schemas';
import { IUserAuth } from '@/types';
import { useNavigate } from 'react-router-dom';

const initialUser: IUserAuth = {
	_id: '',
	isActivated: false,
	username: '',
};

interface IAuthContext {
	isAuth: boolean;
	user: IUserAuth;
	login: (values: LoginValues) => Promise<IUserAuth>;
	register: (values: RegisterValues) => Promise<IUserAuth>;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<IUserAuth>(() => {
		const _user = localStorage.getItem('userData');
		if (_user) {
			return JSON.parse(_user);
		}

		return initialUser;
	});
	const isAuth = !!user._id;

	const login = async (data: LoginValues) => {
		const { user } = await authService.login(data);

		localStorage.setItem('userData', JSON.stringify(user));
		setUser(user);
		navigate('/');

		return user;
	};

	const register = async (data: RegisterValues) => {
		const { user } = await authService.register(data);

		localStorage.setItem('userData', JSON.stringify(user));
		setUser(user);
		navigate('/');

		return user;
	};

	const logout = async () => {
		await authService.logout();

		localStorage.removeItem('userData');
		setUser(initialUser);
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout, isAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth has to be used within <AuthContext.Provider>');
	}

	return context;
};

export default AuthProvider;
