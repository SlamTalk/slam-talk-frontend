import axiosInstance from './axiosInstance';

export const fetchAccessToken = async (
  setAccessToken: (accessToken: string | null) => void,
  setIsRefreshing: (isRefreshing: boolean) => void
) => {
  if (!setIsRefreshing) {
    return;
  }

  try {
    setIsRefreshing(true);
    const response = await axiosInstance.patch('/api/tokens/refresh');
    if (response.status === 200) {
      const newAccessToken = response.headers.authorization;
      setAccessToken(newAccessToken);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
    }
  } catch (error) {
    // console.log('Failed to fetch access token:', error);
  } finally {
    setIsRefreshing(false);
  }
};
