import React from 'react';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import { PiBell, PiUserCircle } from 'react-icons/pi';

const anton = Anton({ weight: '400', subsets: ['latin'] });

const Header = () => (
  <div className="z-30 mt-1 flex h-[61px] items-center justify-between border-b-1 pl-4">
    <div className={`${anton.className} text-2xl`}>
      <Link href="/">
        <div>SLAM TALK</div>
      </Link>
    </div>
    <div className="flex space-x-4 pr-4">
      <Link href="/mypage">
        <PiUserCircle size={24} />
      </Link>
      <PiBell size={24} />
    </div>
  </div>
);

export default Header;
