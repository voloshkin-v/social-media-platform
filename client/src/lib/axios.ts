import axiosLib from 'axios';

export const baseURL = 'http://localhost:3000/api/v1';

export const axios = axiosLib.create({
	baseURL,
	withCredentials: true,
});

axios.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

//
//
//
//
//
//
//
//
//
// Private instance with interceptors
export const axiosPrivate = axiosLib.create({
	baseURL,
	withCredentials: true,
});
