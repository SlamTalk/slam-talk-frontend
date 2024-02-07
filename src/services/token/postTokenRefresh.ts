import axiosInstance from '@/app/api/axiosInstance';
import LocalStorage from '../../utils/localstorage';

export const postTokenRefresh = async () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const result = await axiosInstance.post('/api/tokens/refresh');
    const accessToken = result.headers.authorization;

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    return accessToken;
  }
  return null;
};
