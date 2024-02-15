'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import LocalStorage from '@/utils/localstorage';
import axiosInstance from '@/app/api/axiosInstance';

const refreshToken = async () => {
  try {
    const result = await axiosInstance.post('/api/tokens/refresh');
    const accessToken = result.headers.authorization;
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return accessToken;
  } catch (error) {
    console.log('Token refresh failed:', error);
    throw error;
  }
};

const SocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = searchParams.get('loginSuccess');
  const firstLoginCheck = searchParams.get('firstLoginCheck');

  if (login === 'true') {
    refreshToken().then((token) => {
      if (token !== null) {
        LocalStorage.setItem('isLoggedIn', 'true');
        if (firstLoginCheck === 'true') {
          router.push('user-info');
        } else {
          router.push('/');
        }
      }
    });
  }
  return null;
};

export default SocialLogin;
