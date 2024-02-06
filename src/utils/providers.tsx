'use client';

import React, { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import FullLoading from '@/app/components/FullLoading';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
