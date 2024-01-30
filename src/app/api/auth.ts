import axiosInstance from './axiosInstance';

export const fetchAccessToken = async (
  setAccessToken: (accessToken: string | null) => void
  // eslint-disable-next-line consistent-return
) => {
  try {
    const response = await axiosInstance.patch('/api/tokens/refresh');
    if (response.status === 200) {
      const newAccessToken = response.headers.authorization;
      setAccessToken(newAccessToken);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      return response;
    }
  } catch (error) {
    console.log('Failed to fetch access token:', error);
  }
};
