'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { getCommunityBoard } from '@/services/community/getCommunityBoard';
import { IBoard } from '@/types/community/board';

const Page = () => {
  // const params = useParams<{ tag: string }>();

  const router = useRouter();
  const [inputData, setInputData] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const { data: communityBoard } = useQuery<IBoard[]>({
    queryKey: ['communityBoard'],
    queryFn: getCommunityBoard,
  });

  const handleLink = (id: number) => {
    router.push(`/community/article/${id}`);
  };
  useEffect(() => {
    if (isFocus) {
      setTimeout(() => {
        setSearchKey(inputData);
        // setSearchData(inputData);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData]);
  const Search = () => {
    setSearchKey(inputData);
  };
  return (
    <div className="flex flex-col">
      <div className="z-10 flex w-full transform items-center justify-center rounded-md bg-background p-1 shadow-md">
        <input
          aria-label="검색창"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="w-11/12 p-2 focus:outline-none focus:ring-0"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <button
          onClick={Search}
          type="button"
          aria-label="search button in community"
          className="ml-2 mr-2 flex h-full w-8 items-center justify-center rounded-md focus:outline-none"
        >
          <IoSearchSharp className="w-full text-gray-400 hover:text-black" />
        </button>
      </div>
      <div className="my-3 flex justify-center space-x-10">
        <Button
          aria-label="태그 버튼 all"
          key="all"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/all');
          }}
        >
          전체
        </Button>
        <Button
          aria-label="태그 버튼 free"
          key="FREE"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/FREE');
          }}
        >
          자유
        </Button>
        <Button
          aria-label="태그 버튼 usedtrade"
          key="USED"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/USED');
          }}
        >
          중고거래
        </Button>
        <Button
          aria-label="태그 버튼 question"
          key="QUESTION"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/QUESTION');
          }}
        >
          질문
        </Button>
        <Button
          aria-label="태그 버튼 rentaltransfer"
          key="TRANSFER"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/TRANSFER');
          }}
        >
          대관양도
        </Button>
      </div>

      <Table color="primary" aria-label="게시글 목록">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>USER</TableColumn>
        </TableHeader>
        <TableBody>
          {(communityBoard || [])
            .filter(
              (item: IBoard) =>
                searchKey === '' || item.title.includes(searchKey)
            )
            .map((item: IBoard) => (
              <TableRow
                className="cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => handleLink(item.communityId)}
                key={item.communityId}
                aria-labelledby={`title-${item.communityId}`}
              >
                <TableCell className="flex-grow">{item.title}</TableCell>
                <TableCell>{item.userNickname}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

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

export default Page;
