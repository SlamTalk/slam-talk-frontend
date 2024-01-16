import React from 'react';
import Image from 'next/image';
import { PiBell } from 'react-icons/pi';
import { HiOutlineUserCircle } from 'react-icons/hi2';

const Header = () => (
  <div className="mt-4 flex h-12 items-center justify-between border-b-1 pl-4">
    <div>
      <Image
        src="/logo/slamtalk_logo.png"
        alt="slamtalk-logo"
        width={100}
        height={50}
      />
    </div>
    <div className="flex space-x-4 pr-4">
      <HiOutlineUserCircle size={28} />
      <PiBell size={28} />
    </div>
  </div>
);

export default Header;
