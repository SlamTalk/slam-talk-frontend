'use client';

import React, { useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { PiClipboardTextFill } from 'react-icons/pi';
import { HiMapPin } from 'react-icons/hi2';
import { IoIosChatbubbles } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const [tab, setTab] = useState('');

  useEffect(() => {
    if (pathname.includes('community')) {
      setTab('community');
    } else if (pathname.includes('map')) {
      setTab('map');
    } else if (pathname.includes('chatting')) {
      setTab('chat');
    } else if (pathname.includes('matching')) {
      setTab('match');
    } else {
      setTab('home');
    }
  }, [pathname]);

  return (
    <div className="footer fixed bottom-0 z-30 h-[48px] w-full border-t-1 bg-background pt-[4px]">
      <div className="flex items-center justify-around">
        <Link href="/">
          <div
            className={`grid place-items-center ${tab === 'home' ? 'text-primary' : ''}`}
          >
            <AiFillHome size={24} />
            <div className="text-xs">홈</div>
          </div>
        </Link>
        <Link href="/community/all">
          <div
            className={`grid place-items-center ${tab === 'community' ? 'text-primary' : ''}`}
          >
            <PiClipboardTextFill size={24} />
            <div className="text-xs">커뮤니티</div>
          </div>
        </Link>
        <Link href="/map">
          <div
            className={`grid place-items-center ${tab === 'map' ? 'text-primary' : ''}`}
          >
            <HiMapPin size={24} />
            <div className="text-xs">농구장 지도</div>
          </div>
        </Link>
        <Link href="/chatting">
          <div
            className={`grid place-items-center ${tab === 'chat' ? 'text-primary' : ''}`}
          >
            <IoIosChatbubbles size={24} />
            <div className="text-xs">채팅</div>
          </div>
        </Link>
        <Link href="/matching">
          <div
            className={`grid place-items-center ${tab === 'match' ? 'text-primary' : ''}`}
          >
            <BsPeopleFill size={24} />
            <div className="text-xs">매칭</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
