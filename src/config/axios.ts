import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
	headers: {
		Accept: "application/json",
  },
});

export default axiosInstance;
