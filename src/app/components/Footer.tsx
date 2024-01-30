import React from 'react';
import { TbMoodSearch, TbClipboardText } from 'react-icons/tb';
import { PiChatsCircle, PiMapPinBold } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => (
  <div className="footer fixed bottom-0 z-30 h-[48px] w-full border-t-1 bg-background pt-[4px]">
    <div className="flex items-center justify-around">
      <Link href="/">
        <div className="grid place-items-center">
          <AiOutlineHome size={24} />
          <div className="text-xs">홈</div>
        </div>
      </Link>
      <Link href="/community/all">
        <div className="grid place-items-center">
          <TbClipboardText size={24} />
          <div className="text-xs">커뮤니티</div>
        </div>
      </Link>
      <Link href="/map">
        <div className="grid place-items-center">
          <PiMapPinBold size={24} />
          <div className="text-xs">농구장 지도</div>
        </div>
      </Link>
      <Link href="/chatting/chatlist">
        <div className="grid place-items-center">
          <PiChatsCircle size={24} />
          <div className="text-xs">채팅</div>
        </div>
      </Link>
      <Link href="/matching">
        <div className="grid place-items-center">
          <TbMoodSearch size={24} />
          <div className="text-xs">매칭</div>
        </div>
      </Link>
    </div>
  </div>
);

export default Footer;
