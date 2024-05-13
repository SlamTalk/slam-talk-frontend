'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react';
import getReportedCourtData from '@/services/admin/getReportedCourtData';
import { BasketballCourtReportAdmin } from '@/types/basketballCourt/basketballCourtReport';
import AdminCourtDetails from './components/AdminCourtDetails';
import UserAvatar from './components/UserAvatar';

const columns = [
  {
    key: 'informerId',
    label: '제보자',
  },
  {
    key: 'courtName',
    label: '농구장 명칭',
  },
  {
    key: 'address',
    label: '위치',
  },
  {
    key: 'status',
    label: '상태',
  },
];
const ITEMS_PER_PAGE = 10; // 예를 들어, 페이지당 2개의 아이템

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCourtDetailsVisible, setIsCourtDetailsVisible] = useState(false);
  const [selectedCourt, setSelectedCourt] =
    useState<BasketballCourtReportAdmin | null>(null);

  const { data: reportedData, refetch } = useQuery({
    queryKey: ['reportedData'],
    queryFn: getReportedCourtData,
  });

  const handleCourtDetailClick = (item: BasketballCourtReportAdmin) => {
    setIsCourtDetailsVisible(true);
    setSelectedCourt(item);
  };

  if (reportedData) {
    const currentData = reportedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div className="relative h-[calc(100vh-109px)] w-full max-w-[600px] overflow-y-scroll">
        <title>슬램톡 | 관리자</title>
        <Table
          aria-label="농구장 제보 목록"
          fullWidth
          classNames={{
            wrapper: 'h-full min-h-[810px] sm:min-h-[637px]',
          }}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                total={Math.ceil(reportedData.length / ITEMS_PER_PAGE)}
                initialPage={1}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={reportedData}>
            {currentData.map((item: BasketballCourtReportAdmin) => (
              <TableRow key={item.courtId}>
                {columns.map((column) => (
                  <TableCell key={`${column.key}`}>
                    {column.key === 'informerId' ? (
                      <UserAvatar userId={item.informerId} />
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCourtDetailClick(item)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCourtDetailClick(item);
                          }
                        }}
                      >
                        {item[column.key as keyof BasketballCourtReportAdmin]}
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isCourtDetailsVisible && selectedCourt && (
          <AdminCourtDetails
            data={selectedCourt}
            onClose={() => setIsCourtDetailsVisible(false)}
            refetch={refetch}
          />
        )}
      </div>
    );
  }
  return (
    <div className="mt-20 w-full text-center">제보받은 농구장이 없습니다.</div>
  );
};

export default AdminPage;
