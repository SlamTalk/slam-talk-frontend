'use client';

import React, { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import useAuthStore from '@/store/authStore';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    // 페이지 로딩 시 토큰을 가져와서 로그인 상태를 설정
    const accessToken = localStorage.getItem('slam');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [setAccessToken]); // setAccessToken을 의존성으로 추가하여 변화할 때마다 호출

  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={['light', 'dark']}
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
