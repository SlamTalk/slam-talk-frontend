'use client';

import React, { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { fetchAccessToken } from './api/auth';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { setAccessToken } = useAuthStore();
  const router = useRouter();

  const handleAccessTokenFetch = async () => {
    try {
      const response = await fetchAccessToken(setAccessToken);
      if (response && response.data && response.data.results) {
        const { firstLoginCheck } = response.data.results;
        if (firstLoginCheck === true) {
          router.push('/user-info');
        }
      }
    } catch (error) {
      console.error('Failed to fetch access token:', error);
    }
  };

  useEffect(() => {
    handleAccessTokenFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
