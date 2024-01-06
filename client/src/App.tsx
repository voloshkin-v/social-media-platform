import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import { AppLayout, AuthLayout } from '@/layouts';
import { Community, NotFound, Messaging, Profile } from '@/pages';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import Edit from './pages/Profile/Edit';

// TEST
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthProvider';
import { refresh } from './services/auth';

// const PersistUserAuth = ({ children }: { children: React.ReactNode }) => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const { setAuthState } = useAuth();

// 	useEffect(() => {
// 		const token = localStorage.getItem('token');

// 		const refreshToken = async () => {
// 			console.log('RENDERING PERSIST USER AND REFRESHINH TOKEN!');

// 			try {
// 				const {
// 					data: { user },
// 					token,
// 				} = await refresh();

// 				localStorage.setItem('token', token);
// 				setAuthState(user, true);
// 			} catch (err) {
// 				console.log(err);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		token ? refreshToken() : setIsLoading(false);
// 	}, []);

// 	if (isLoading) {
// 		return <p>loading...</p>;
// 	}

// 	return children;
// };

const App = () => {
	return (
		<>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
				</Route>

				<Route
					element={
						// <PersistUserAuth>
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
						// </PersistUserAuth>
					}
				>
					<Route index element={<Navigate to="/community" />} />
					<Route path="/community" element={<Community />} />
					<Route path="/messaging" element={<Messaging />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/edit" element={<Edit />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>

			<Toaster />
		</>
	);
};

export default App;
