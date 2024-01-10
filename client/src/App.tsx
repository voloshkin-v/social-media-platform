import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import { AppLayout, AuthLayout } from '@/layouts';
import { Community, NotFound, Messaging, Profile, Edit } from '@/pages';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import MyProfile from './pages/Profile/MyProfile';

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
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Navigate replace to="/community" />} />
					<Route path="/community" element={<Community />} />
					<Route path="/messaging" element={<Messaging />} />
					<Route path="/profile" element={<MyProfile />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/profile/edit" element={<Edit />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>

			<Toaster />
		</>
	);
};

export default App;
