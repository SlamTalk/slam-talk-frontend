'use client';

import React, { Suspense, useEffect } from 'react';
import '@/styles/globals.css';
import Script from 'next/script';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LocalStorage from '@/utils/localstorage';
import { getAddressFromCoords, getUserLocation } from '@/utils/getUserLocation';
import useLocationStore from '@/store/userLocationStore';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Providers from './components/Providers';
import Analytics from './components/Analytics';

const queryClient = new QueryClient();

const isLoggedInKey = 'isLoggedIn';

const isWithoutHeader = (pathname: string): boolean =>
  pathname.includes('details') ||
  pathname.includes('new') ||
  pathname.includes('my-page') ||
  pathname.includes('chatroom');

const shouldRenderHeader = (pathname: string): boolean =>
  !isWithoutHeader(pathname);

const shouldRenderFooter = (pathname: string): boolean =>
  !pathname.includes('chatroom');

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const setUserAddress = useLocationStore((state) => state.setUserAddress);

  if (LocalStorage.getItem(isLoggedInKey) === null) {
    LocalStorage.setItem(isLoggedInKey, 'false');
  }
  const pathname = usePathname();

  useEffect(() => {
    const setupUserLocation = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        setUserLocation({ latitude, longitude });

        const { address, roadAddress } = await getAddressFromCoords(
          latitude,
          longitude
        );
        const finalAddress = roadAddress || address;

        setUserAddress(finalAddress);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error setting up user location:', error.message);
        }
      }
    };

    setupUserLocation();
  }, [setUserLocation, setUserAddress]);

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services,clusterer`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="농구를 할 장소와 함께 할 친구를 찾을 수 있는 플랫폼"
        />
        <meta name="author" content="Slam Talk" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Suspense>
            <Analytics />
          </Suspense>
          <Providers>
            {shouldRenderHeader(pathname) && <Header />}
            <main>{children}</main>
            {shouldRenderFooter(pathname) && <Footer />}
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
