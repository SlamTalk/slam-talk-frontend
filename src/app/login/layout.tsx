'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';

const Loginlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="md:h-100 sm:h-100 relative h-full w-full">
      <div
        aria-label="뒤로가기"
        role="link"
        tabIndex={0}
        className="absolute left-1 top-px"
        onClick={handleGoBack}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleGoBack();
          }
        }}
      >
        <IoChevronBackSharp size={24} />
      </div>
      <h2 className="mt-4 text-center text-lg font-semibold">로그인</h2>
      <main>{children}</main>
    </div>
  );
};

export default Loginlayout;
