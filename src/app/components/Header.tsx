'use client';

import React from 'react';
import Link from 'next/link';
import LocalStorage from '@/utils/localstorage';
import { Anton } from 'next/font/google';
import { PiBell, PiUserCircle } from 'react-icons/pi';
import { LuLogIn } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import ThemeSwitcher from './ThemeSwitcher';

// Anton 폰트 설정
const anton = Anton({ weight: '400', subsets: ['latin'] });

const Header = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');

  const { error, data } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
  });

  if (error) {
    console.log(error);
  }

  return (
    <div className="sticky top-0 z-30 flex h-[61px] w-full max-w-[600px] items-center justify-between border-b-1 bg-background pl-4">
      <div className={`${anton.className} text-2xl`}>
        <Link href="/">
          <div>SLAM TALK</div>
        </Link>
      </div>
      <div className="flex gap-2 pr-4">
        <ThemeSwitcher />
        <div className="mr-2">
          {isLoggedIn === 'true' || data ? (
            <Link href="/my-page">
              <PiUserCircle aria-label="유저" size={26} />
            </Link>
          ) : (
            <Link href="/login">
              <LuLogIn aria-label="로그인" size={24} />
            </Link>
          )}
        </div>
        <PiBell aria-label="알림" size={24} />
      </div>
    </div>
  );
};
export default Header;
