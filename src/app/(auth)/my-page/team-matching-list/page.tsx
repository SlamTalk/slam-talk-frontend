'use client';

import getMyTeamMatchingData from '@/services/user/getMyTeamMatchingData';
import {
  MyTeamMatching,
  MyTeamMatchingInfo,
} from '@/types/matching/teamDataType';
import LocalStorage from '@/utils/localstorage';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

const ITEMS_PER_PAGE = 10;

const TeamMatchingList = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const [selectedTab, setSelectedTab] = useState<string>('mine');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<MyTeamMatchingInfo[]>([]);
  const router = useRouter();

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const { data } = useQuery<MyTeamMatching>({
    queryKey: ['myMateMatching'],
    queryFn: getMyTeamMatchingData,
  });

  useEffect(() => {
    if (data) {
      const { authoredPost, participatedPost } = data;

      if (selectedTab === 'mine') {
        setCurrentData(
          authoredPost.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
        );
      } else {
        setCurrentData(
          participatedPost.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
        );
      }
    }
  }, [data, currentPage, selectedTab]);

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  const handleRowClick = (id: number) => {
    window.open(`/matching/team-details/${id}`, '_blank');
  };

  return (
    <>
      <title>슬램톡 | 상대팀 찾기 내역</title>
      <div className="relative w-full pb-[56px]">
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
        <h2 className="pt-4 text-center text-lg font-semibold">
          상대팀 찾기 내역
        </h2>
        <hr className="w-90 my-4 h-px bg-gray-300" />
        <div className="mt-2 flex justify-between px-[16px]">
          <div className="flex w-full flex-wrap gap-4">
            <Tabs
              variant="underlined"
              aria-label="Tabs variants"
              selectedKey={selectedTab}
              onSelectionChange={(key: React.Key) => {
                setCurrentPage(1);
                if (typeof key === 'string') setSelectedTab(key);
              }}
            >
              <Tab key="mine" title="내 모집글" />
              <Tab key="participated" title="지원 현황" />
            </Tabs>
            <Table
              aria-label="농구장 제보 목록"
              fullWidth
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    total={Math.ceil(currentData.length / ITEMS_PER_PAGE)}
                    initialPage={1}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              }
            >
              <TableHeader className="flex w-full">
                <TableColumn className="w-[200px] sm:max-w-[80px]" key="title">
                  제목
                </TableColumn>
                <TableColumn key="location">장소</TableColumn>
                <TableColumn key="startTime">시간</TableColumn>
                <TableColumn key="status">상태</TableColumn>
              </TableHeader>
              <TableBody items={currentData}>
                {currentData.map((item: MyTeamMatchingInfo) => (
                  <TableRow
                    key={item.teamMatchingId}
                    className="hover: border-b-1 hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                    onClick={() => handleRowClick(item.teamMatchingId)}
                  >
                    <TableCell className="w-[200px] break-keep sm:max-w-[80px]">
                      {item.title}
                    </TableCell>
                    <TableCell className="overflow-hidden break-keep">
                      {item.location.split(' ').slice(0, 2).join(' ')}
                    </TableCell>
                    <TableCell className="overflow-hidden break-keep">
                      {item.startTime.split(':').slice(0, 2).join(':')}
                    </TableCell>
                    <TableCell className="overflow-hidden break-keep">
                      {selectedTab === 'mine'
                        ? item.recruitmentStatusType
                        : item.applyStatusType}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMatchingList;
