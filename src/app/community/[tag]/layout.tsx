import Link from 'next/link';
import React from 'react';

import Page from './page';

const Layout = () => (
  <div className="flex h-svh flex-col ">
    <input className="border-solid" placeholder="검색어를 입력해주세요" />
    <div className="flex justify-center space-x-10  ">
      <Link
        className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300 text-center	"
        href="/community/all"
      >
        전체
      </Link>
      <Link
        className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300	text-center "
        href="/community/free"
      >
        자유
      </Link>

      <Link
        className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300	text-center "
        href="/community/usedtrade"
      >
        중고 거래
      </Link>

      <Link
        className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300	 text-center"
        href="/community/question"
      >
        질문
      </Link>

      <Link
        className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300	 text-center"
        href="/community/rentaltransfer"
      >
        대관 양도
      </Link>
    </div>

    <Page />
    <button
      type="button"
      className="absolute bottom-20 right-40 h-8 w-24 rounded-xl	bg-orange-600	"
    >
      <Link href="/community/write" className="text-white	">
        +글 작성하기
      </Link>
    </button>
  </div>
);

export default Layout;
