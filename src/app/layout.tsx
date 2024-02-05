'use client';

import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './providers';
import FullLoading from './components/FullLoading';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mounted, setMouted] = useState<boolean>(false);

  useEffect(() => {
    setMouted(true);
  }, []);

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services`}
        />
      </head>
      <body className={`${inter.className}`}>
        <Providers>
          {mounted ? (
            <div>
              {pathname.includes('details') ||
              pathname.includes('new') ||
              pathname.includes('mypage') ||
              pathname.includes('chatroom') ? null : (
                <Header />
              )}
              <div className="pb-[48px] pt-[61px]">{children}</div>
              {pathname.includes('chatroom') ? null : <Footer />}
            </div>
          ) : (
            <FullLoading />
          )}
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
