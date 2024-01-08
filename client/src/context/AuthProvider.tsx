import { IUserAuth } from '@/types/user';
import { useState, createContext, useContext } from 'react';

interface AuthContext {
	user: IUserAuth;
	setUser: (user: IUserAuth) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const initialUser: IUserAuth = {
	_id: '',
	isActivated: false,
	username: '',
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(initialUser);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
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
