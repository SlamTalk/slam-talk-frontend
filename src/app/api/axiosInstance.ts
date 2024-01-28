import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

let accessToken: string | null = null;

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedRequests: (() => void)[] = [];

const processFailedRequests = (token?: string) => {
  failedRequests.forEach((callback) => {
    if (token) {
      callback();
    }
  });
  failedRequests = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retryFlag) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => {
            originalRequest.retryFlag = true;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
      isRefreshing = true;
      originalRequest.retryFlag = true;

      try {
        const refreshResponse = await axiosInstance.patch(
          '/api/tokens/refresh',
          {}
        );
        const newAccessToken = refreshResponse.data.accessToken;

        accessToken = newAccessToken;

        processFailedRequests(newAccessToken);

        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          console.log('토큰 재발급 실패');
          processFailedRequests();
          // logout 넣기
          const router = useRouter();
          router.push('/login');
        }
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
