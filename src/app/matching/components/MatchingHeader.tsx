'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MatchingHeader = () => {
  const pathname = usePathname();
  const [curPage, setCurPage] = useState('');

  useEffect(() => {
    if (pathname.includes('mate')) {
      setCurPage('메이트 찾기');
    } else if (pathname.includes('team')) {
      setCurPage('상대팀 찾기');
    }
  }, [pathname]);

  return (
    <div className="fixed top-0 z-40 flex h-[61px] w-full max-w-[600px] items-center border-b-1 bg-background">
      <div className="flex w-1/3 justify-start pl-4">
        <div>{'<'}</div>
      </div>
      <div className="flex w-1/3 justify-center">
        <div>{curPage}</div>
      </div>
      <div className="w-1/3">
        {' '}
        {/* 이 부분은 비어있지만 3분할 위해 필요 필요한 것 있으면 추가 예정 */}
      </div>
    </div>
  );
};
export default MatchingHeader;
