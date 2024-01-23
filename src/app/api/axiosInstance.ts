import axios, { AxiosError } from 'axios';
import useAuthStore from '@/store/authStore';
// import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.retryFlag) {
      originalRequest.retryFlag = true;
      // const router = useRouter();

      try {
        const response = await axiosInstance.post(
          '/api/token/refresh',
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;

        useAuthStore.getState().setAccessToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          useAuthStore.getState().setAccessToken(null);

          // 로그아웃 처리되면 로그인 페이지로 리다이렉션
          // router.push('/login');
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
