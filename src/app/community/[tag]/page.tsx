'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { useRouter, useParams } from 'next/navigation';
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

interface ICommunityItem {
  id: number;
  userId: string;
  title: string;
  content: string;
  tag: string;
  comment?: {
    id: string;
    postId: string;
    userId: string;
    content: string;
  }[];
}

const Page = () => {
  const params = useParams<{ tag: string }>();

  const [data, setData] = useState<ICommunityItem[]>([
    {
      id: 1,
      title: '농구화 추천해주세요',
      userId: 'user-1',
      content: '농구화 추천 좀 해주세요~~',
      tag: 'question',
      comment: [
        {
          id: 'c1',
          userId: 'user-1',
          postId: '1',
          content: '농구화 추천해드렸습니다~',
        },
      ],
    },
    {
      id: 2,
      userId: 'user-2',
      title: '헤어밴드 팝니다',
      content: '나이키 헤어밴드입니다. 착감 거의 없습니다~~',
      tag: 'usedtrade',
      comment: [],
    },
  ]);

  const router = useRouter();
  const [inputData, setInputData] = useState('');
  // const [searchData, setSearchData] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    const dummyData = localStorage.getItem('community');
    localStorage.setItem('community', JSON.stringify(data));
    if (!dummyData && dummyData !== null) {
      setData(JSON.parse(dummyData));
    }
  }, [data]);
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
          key="free"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/free');
          }}
        >
          자유
        </Button>
        <Button
          aria-label="태그 버튼 usedtrade"
          key="usedtrade"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/usedtrade');
          }}
        >
          중고거래
        </Button>
        <Button
          aria-label="태그 버튼 question"
          key="question"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/question');
          }}
        >
          질문
        </Button>
        <Button
          aria-label="태그 버튼 rentaltransfer"
          key="rentaltransfer"
          radius="full"
          className="rounded-lg border border-gray-200 bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
          onClick={() => {
            router.push('/community/rentaltransfer');
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
          {params.tag === 'all'
            ? data
                .filter(
                  (item) => searchKey === '' || item.title.includes(searchKey)
                )
                .map((item) => (
                  <TableRow
                    className="cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => handleLink(item.id)}
                    key={item.id}
                    aria-labelledby={`title-${item.id}`}
                  >
                    <TableCell className="flex-grow">{item.title}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                  </TableRow>
                ))
            : data
                .filter((item) => item.tag === params.tag)
                .filter(
                  (item) => searchKey === '' || item.title.includes(searchKey)
                )
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex-grow">{item.title}</TableCell>
                    <TableCell>{item.userId}</TableCell>
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
