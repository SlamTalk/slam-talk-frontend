'use client';

import React from 'react';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import { PiBell, PiUserCircle } from 'react-icons/pi';
import { LuLogIn } from 'react-icons/lu';
// import useAuthStore from '@/store/authStore';

const anton = Anton({ weight: '400', subsets: ['latin'] });

const Header = () => (
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  <div className="fixed z-30 flex h-[61px] w-full max-w-[600px] items-center justify-between border-b-1 bg-background pl-4">
    <div className={`${anton.className} text-2xl`}>
      <Link href="/">
        <div>SLAM TALK</div>
      </Link>
    </div>
    <div className="flex space-x-4 pr-4">
      <Link href="/mypage">
        <PiUserCircle aria-label="알림" size={25} />
      </Link>
      <Link href="/login">
        <LuLogIn aria-label="로그인" size={24} />
      </Link>
      {/* {isLoggedIn ? (
          <Link href="/mypage">
            <PiUserCircle aria-label="알림" size={25} />
          </Link>
        ) : (
          <Link href="/login">
            <LuLogIn aria-label="로그인" size={24} />
          </Link>
        )} */}
      <PiBell size={24} />
    </div>
  </div>
);
export default Header;
