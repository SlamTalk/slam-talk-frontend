'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from '../utils/providers';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const withoutHeader =
    pathname.includes('details') ||
    pathname.includes('new') ||
    pathname.includes('my-page') ||
    pathname.includes('chatroom');

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services`}
        />
      </head>
      <body className={`${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Providers>
            {withoutHeader ? null : <Header />}
            <div className={withoutHeader ? '' : 'pb-[48px] pt-[61px]'}>
              {children}
            </div>
            {pathname.includes('chatroom') ? null : <Footer />}
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
