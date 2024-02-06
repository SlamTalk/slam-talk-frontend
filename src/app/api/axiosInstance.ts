import axios, { AxiosError } from 'axios';

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
      try {
        const refreshResponse = await axiosInstance.patch(
          '/api/tokens/refresh',
          {}
        );
        const newAccessToken = refreshResponse.data.accessToken;
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          console.log('토큰 재발급 실패');
          try {
            const response = await axiosInstance.post('/api/logout');

            if (response.status === 200) {
              alert('로그아웃 되었습니다!');
              if (typeof window !== undefined) {
                localStorage.setItem('isLoggedIn', 'false');
                window.location.href = '/login';
              }
            }
          } catch (logoutError) {
            console.log('로그아웃 실패: ', logoutError);
            alert(
              '죄송합니다. 로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.'
            );
          }
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
