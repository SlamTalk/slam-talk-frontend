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

  // https://slam-talk.vercel.app/social-login?loginSuccess=true&firstLoginCheck=false
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
            window.location.href = 'https://slam-talk.vercel.app';
          }
        }
      }
    });
  } else if (login === 'false') {
    alert(
      '탈퇴한 유저입니다. 같은 계정으로 로그인을 원하시면 탈퇴 7일 이후에 재가입 해주세요.'
    );
    router.push('/login');
  }
  return null;
};

export default SocialLogin;
