'use client';

import React, { useEffect } from 'react';
import '@/styles/globals.css';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LocalStorage from '@/utils/localstorage';
import { getAddressFromCoords, getUserLocation } from '@/utils/getUserLocation';
import useLocationStore from '@/store/userLocationStore';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Providers from './components/Providers';

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const setUserAddress = useLocationStore((state) => state.setUserAddress);

  if (LocalStorage.getItem('isLoggedIn') === null) {
    LocalStorage.setItem('isLoggedIn', 'false');
  }
  const pathname = usePathname();

  const withoutHeader =
    pathname.includes('details') ||
    pathname.includes('new') ||
    pathname.includes('my-page') ||
    pathname.includes('chatroom');

  useEffect(() => {
    getUserLocation()
      .then(({ latitude, longitude }) => {
        setUserLocation({ latitude, longitude });
        return getAddressFromCoords(latitude, longitude);
      })
      .then(({ address, roadAddress }) => {
        const finalAddress = roadAddress || address;
        setUserAddress(finalAddress);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [setUserLocation, setUserAddress]);

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services,clusterer`}
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Providers>
            {withoutHeader ? null : <Header />}
            <main>{children}</main>
            {pathname.includes('chatroom') ? null : <Footer />}
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
