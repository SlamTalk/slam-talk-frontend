'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
  Pagination,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { getCommunityTag } from '@/services/community/getCommunityTag';
import { getCommunityBoard } from '../../../services/community/getCommunityBoard';
import { IBoard } from '../../../types/community/board';

import LocalStorage from '../../../utils/localstorage';

const Page = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const [tag, setTag] = useState('');
  const router = useRouter();
  const [inputData, setInputData] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const [searchKey, setSearchKey] = useState('');
  const { data: communityBoard, refetch } = useQuery<IBoard[]>({
    queryKey: ['communityBoard'],
    queryFn: getCommunityBoard,
  });
  const { data: categoriedBoard } = useQuery<IBoard[]>({
    queryKey: ['categoriedBoard', tag],
    queryFn: useCallback(() => getCommunityTag(tag), [tag]),
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 415);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = isMobile ? 13 : 16;
  const pages = useMemo(
    () =>
      communityBoard && tag === ''
        ? Math.ceil((communityBoard || []).length / rowsPerPage)
        : Math.ceil((communityBoard || []).length / rowsPerPage),
    [communityBoard, tag, rowsPerPage]
  );

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
    <div className="relative h-[calc(100vh-109px)] w-full max-w-[600px]">
      <title>슬램톡 | 커뮤니티</title>
      <div className="z-10 flex transform items-center justify-center rounded-md bg-background p-1 shadow-md">
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
      <div className="my-2 flex justify-between">
        <Button
          onClick={() => {
            setTag('');
          }}
          aria-label="태그 버튼 all"
          size={isMobile ? 'sm' : 'md'}
          key="all"
          radius="full"
          className="rounded-lg bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
        >
          전체
        </Button>

        <Button
          onClick={() => {
            setTag('FREE');
            setPage(1);
          }}
          aria-label="태그 버튼 free"
          size={isMobile ? 'sm' : 'md'}
          value="FREE"
          key="FREE"
          radius="full"
          className="rounded-lg bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
        >
          자유
        </Button>
        <Button
          aria-label="태그 버튼 usedtrade"
          onClick={() => {
            setTag('USED');
            setPage(1);
          }}
          size={isMobile ? 'sm' : 'md'}
          key="USED"
          radius="full"
          className="rounded-lg bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
        >
          중고거래
        </Button>
        <Button
          onClick={() => {
            setTag('QUESTION');
            setPage(1);
          }}
          size={isMobile ? 'sm' : 'md'}
          aria-label="태그 버튼 question"
          key="QUESTION"
          radius="full"
          className="rounded-lg bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
        >
          질문
        </Button>
        <Button
          aria-label="태그 버튼 rentaltransfer"
          onClick={() => {
            setTag('TRANSFER');
            setPage(1);
          }}
          size={isMobile ? 'sm' : 'md'}
          key="TRANSFER"
          radius="full"
          className="rounded-lg bg-gray-200 text-gray-500 shadow-md hover:bg-primary hover:text-white"
        >
          대관양도
        </Button>
      </div>
      <div className="pb-[48px]">
        <Table
          color="primary"
          aria-label="게시글 목록"
          fullWidth
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(num) => setPage(num)}
              />
            </div>
          }
          classNames={{
            wrapper: 'h-full min-h-[710px] sm:min-h-[637px]',
          }}
        >
          <TableHeader>
            <TableColumn>제목</TableColumn>
            <TableColumn>글쓴이</TableColumn>
          </TableHeader>

          <TableBody items={communityBoard ?? []} loadingContent={<Spinner />}>
            {tag === ''
              ? (
                  communityBoard?.slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  ) || []
                )
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
                  ))
              : (
                  categoriedBoard?.slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  ) || []
                )
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
        <div className="fixed bottom-14 mr-4 flex w-[600px] justify-end sm:w-[390px]">
          <div className="fixed bottom-14 mr-4">
            <Button
              aria-label="Write new post"
              type="button"
              startContent={<FaPlus />}
              className="z-40 rounded-full bg-primary text-white shadow-md sm:w-[100px]"
              onClick={() => {
                if (isLoggedIn === 'true') {
                  return router.push('/community/write');
                }
                return router.push('/login');
              }}
            >
              글 작성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
