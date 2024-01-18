import React from 'react';
import { Anton } from 'next/font/google';
import { PiBell, PiUserCircle } from 'react-icons/pi';

const anton = Anton({ weight: '400', subsets: ['latin'] });

const Header = () => (
  <div className="z-30 mt-1 flex h-[61px] items-center justify-between border-b-1 pl-4">
    <div className={`${anton.className} text-2xl`}>
      <div>SLAM TALK</div>
    </div>
    <div className="flex space-x-4 pr-4">
      <PiUserCircle size={24} />
      <PiBell size={24} />
    </div>
  </div>
);

export default Header;
