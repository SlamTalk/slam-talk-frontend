'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';

const MatchingHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/matching');
    }
  };

  return (
    <div className="fixed top-0 z-40 flex h-[61px] w-full max-w-[600px] items-center border-b-1 bg-background">
      <div className="flex w-1/3 justify-start pl-4">
        <IoChevronBackSharp
          cursor="pointer"
          size={24}
          onClick={handleBackClick}
        />
      </div>
      <div className="flex w-1/3 justify-center text-lg font-bold">
        <div>{pathname.includes('mate') ? '메이트 찾기' : '상대팀 찾기'}</div>
      </div>
      <div className="w-1/3">
        {' '}
        {/* 이 부분은 비어있지만 3분할 위해 필요 필요한 것 있으면 추가 예정 */}
      </div>
    </div>
  );
};
export default MatchingHeader;
