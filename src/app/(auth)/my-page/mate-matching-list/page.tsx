'use client';

import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';

const MateMatchingList = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const router = useRouter();

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  return (
    <>
      <title>슬램톡 | 농구 메이트 찾기 내역</title>
      <div className="relative">
        <div
          aria-label="뒤로가기"
          role="link"
          tabIndex={0}
          className="absolute left-4 top-4"
          onClick={handleGoBack}
          onKeyDown={handleKeyDown}
        >
          <IoChevronBackSharp size={24} />
        </div>
        <h2 className="pt-4 text-center text-lg font-semibold">
          농구 메이트 찾기 내역
        </h2>
        <hr className="w-90 my-4 h-px bg-gray-300" />
        <div>목록 개발 중</div>
      </div>
    </>
  );
};

export default MateMatchingList;
