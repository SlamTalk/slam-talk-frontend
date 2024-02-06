'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { fetchLoginData } from '@/utils/fetchLoginData';
import FullLoading from '@/app/components/FullLoading';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['loginData'],
    queryFn: fetchLoginData,
    staleTime: 3,
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    console.log(error);
  }
  console.log(isLoading);
  console.log(data);

  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={['light', 'dark']}
      >
        {mounted ? children : <FullLoading />}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
