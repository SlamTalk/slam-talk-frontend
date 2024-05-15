'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';

const Loginlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  return (
    <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
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
      <h2 className="mt-4 text-center text-lg font-semibold">로그인</h2>
      <main>{children}</main>
      <footer className="sticky bottom-12 mt-72 flex w-full max-w-[600px] flex-col justify-center gap-2 bg-gray-100 px-4 pb-3 pt-8 text-xs text-gray-500">
        <p className="text-sm">슬램톡 정보</p>
        <a href="mailto:slamtalk.official@gmail.com">
          <p>문의: slamtalk.official@gmail.com</p>
        </a>
        <hr className="my-3 h-px w-full bg-gray-300" />
        <p className="text-gray-400">©Slam Talk. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Loginlayout;
