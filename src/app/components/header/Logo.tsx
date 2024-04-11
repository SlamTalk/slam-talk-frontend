import React from 'react';
import { Anton } from 'next/font/google';
import Link from 'next/link';

const anton = Anton({ weight: '400', subsets: ['latin'] });

const Logo = () => (
  <div className={`${anton.className} text-2xl`}>
    <Link href="/">
      <div>SLAM TALK</div>
    </Link>
  </div>
);

export default Logo;
