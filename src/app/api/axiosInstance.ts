import axios from 'axios';
import LocalStorage from '@/utils/localstorage';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

export const storeAccessToken = (accessToken: string) => {
  if (accessToken) {
    LocalStorage.setItem('slam', accessToken);
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = LocalStorage.getItem('slam');

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.data?.results) {
      const { accessToken } = response.data.results;
      storeAccessToken(accessToken);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
