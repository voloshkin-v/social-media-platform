import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import QueryProvider from './context/QueryProvider';
import ThemeProvider from './context/ThemeProvider';

import App from './App';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryProvider>
				<ThemeProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ThemeProvider>
			</QueryProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
