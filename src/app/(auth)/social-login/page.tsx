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

  // https://www.slam-talk.site/social-login?loginSuccess=true&firstLoginCheck=false
  if (login === 'true') {
    refreshToken().then((token) => {
      if (token !== null) {
        LocalStorage.setItem('isLoggedIn', 'true');
        if (firstLoginCheck === 'true') {
          router.push('/user-info');
        } else {
          const currentUrl = window.location.href;
          const domain = new URL(currentUrl).origin;
          if (domain === 'http://localhost:3000') {
            window.location.href = 'http://localhost:3000';
          } else {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`;
          }
        }
      }
    });
  }
  return null;
};

export default SocialLogin;
