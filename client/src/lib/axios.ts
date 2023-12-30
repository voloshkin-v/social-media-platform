import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1';

// LOGIN, REGISTER, REFRESH
export const apiAxios = axios.create({
	baseURL,
	withCredentials: true,
});

// apiAxios.interceptors.request.use((config) => {
// 	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
// 	return config;
// });
