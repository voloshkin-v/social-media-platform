import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './features/auth/context/AuthProvider';
import QueryProvider from './context/QueryProvider';
import ThemeProvider from './context/ThemeProvider';

import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryProvider>
				<ThemeProvider storageKey="theme">
					<AuthProvider>
						<App />
					</AuthProvider>
				</ThemeProvider>
			</QueryProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
