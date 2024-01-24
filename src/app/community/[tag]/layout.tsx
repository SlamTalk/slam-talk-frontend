'use client';

import React from 'react';
import { Button } from '@nextui-org/button';
import { usePathname, useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';

import { Tab, Tabs } from '@nextui-org/react';
import Page from './page';

const Layout = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      <div className="z-10 flex w-full transform items-center justify-center rounded-md bg-background p-1 shadow-md">
        <input
          placeholder="검색어를 입력해주세요"
          className="w-11/12 p-2 focus:outline-none focus:ring-0"
        />
        <button
          type="button"
          aria-label="search button in community"
          className="ml-2 mr-2 flex h-full w-8 items-center justify-center rounded-md focus:outline-none"
        >
          <IoSearchSharp className="w-full text-gray-400 hover:text-black" />
        </button>
      </div>
      <div className="flex justify-center space-x-10">
        <Tabs aria-label="Options" selectedKey={pathname}>
          <Tab key="all" title="전체" href="/community/all" />
          <Tab key="free" title="자유" href="/community/free" />
          <Tab href="/community/usedtrade" key="usedtrade" title="중고거래" />
          <Tab href="/community/question" key="question" title="질문" />
          <Tab
            href="/community/rentaltransfer"
            key="rentaltransfer"
            title="대관양도"
          />
        </Tabs>
      </div>

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
