'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import Page from './page';

const Layout = () => {
  const router = useRouter();

  return (
    <div className="flex h-svh flex-col">
      <div className="flex justify-center space-x-10">
        <Link
          className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300 text-center"
          href="/community/all"
        >
          전체
        </Link>
        <Link
          className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300	text-center"
          href="/community/free"
        >
          자유
        </Link>

        <Link
          className="h-8 w-16 rounded-md  border-2 border-solid border-gray-300	text-center"
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
      <input className="border-solid" placeholder="검색어를 입력해주세요" />

      <Page />
      <div className="fixed bottom-14 w-full max-w-[600px]">
        <div className="mr-4 flex justify-end">
          <Button
            aria-label="Write new post"
            type="button"
            startContent={<FaPlus />}
            className="rounded-full bg-primary text-white shadow-md"
            onClick={() => {
              router.push('/community/write');
            }}
          >
            글 작성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
