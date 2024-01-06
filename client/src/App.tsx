import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import { AppLayout, AuthLayout } from '@/layouts';
import { Community, NotFound, Messaging, Profile } from '@/pages';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import Edit from './pages/Profile/Edit';
import UserAuth from './components/UserAuth';

const App = () => {
	return (
		<>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
				</Route>

				<Route element={<UserAuth />}>
					<Route
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route
							index
							element={<Navigate replace to="/community" />}
						/>
						<Route path="/community" element={<Community />} />
						<Route path="/messaging" element={<Messaging />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/edit" element={<Edit />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>

			<Toaster />
		</>
	);
};

export default App;
