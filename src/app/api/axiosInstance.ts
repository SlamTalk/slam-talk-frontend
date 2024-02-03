import useAuthStore from '@/store/authStore';
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
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
    const { setAccessToken } = useAuthStore.getState();

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

        setAccessToken(newAccessToken);

        processFailedRequests(newAccessToken);

        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          console.log('토큰 재발급 실패');
          processFailedRequests();
          try {
            const response = await axiosInstance.post('api/logout');

            if (response.status === 200) {
              setAccessToken(null);
              alert('로그아웃 되었습니다!');
              if (typeof window !== undefined) {
                window.location.href = '/';
                localStorage.setItem('isLoggedIn', 'false');
              }
            }
          } catch (logoutError) {
            console.log('로그아웃 실패: ', logoutError);
            alert(
              '죄송합니다. 로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.'
            );
          }
        }
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
