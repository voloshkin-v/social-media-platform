import { useState, createContext, useContext } from 'react';
import { IUserAuth } from '@/types/user';

interface setAuthStateProps {
	user: IUserAuth;
	isAuth: boolean;
}

interface AuthContext {
	isAuth: boolean;
	user: IUserAuth;
	setAuthState: ({ user, isAuth }: setAuthStateProps) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const initialUser: IUserAuth = {
	_id: '',
	isActivated: false,
	username: '',
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState(initialUser);

	const setAuthState = ({ user, isAuth }: setAuthStateProps) => {
		setIsAuth(isAuth);
		setUser(user);
	};

	return (
		<AuthContext.Provider value={{ isAuth, user, setAuthState }}>
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
