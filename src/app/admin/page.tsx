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
import axiosInstance from '../api/axiosInstance';
import CourtDetails from './components/AdminCourtDetails';
import { CourtData } from './components/adminDataType';

const columns = [
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
  const [selectedCourt, setSelectedCourt] = useState<CourtData | null>(null);

  const getReportedCourtData = async () => {
    const response = await axiosInstance
      .get('/api/admin/stand')
      .then((res) => res.data.results);

    return response;
  };

  const { data } = useQuery<CourtData[]>({
    queryKey: ['reportedData'],
    queryFn: getReportedCourtData,
  });

  console.log({ data });

  const handleRowClick = (item: CourtData) => {
    setIsCourtDetailsVisible(true);
    setSelectedCourt(item);
  };

  if (data) {
    // 현재 페이지에 따른 행 필터링
    const currentData = data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div>
        <Table aria-label="Example table with dynamic content">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.courtId} onClick={() => handleRowClick(item)}>
                {columns.map((column) => (
                  <TableCell key={`${column.key}`}>
                    {item[column.key as keyof typeof item]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          total={Math.ceil(data.length / ITEMS_PER_PAGE)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
        {isCourtDetailsVisible && selectedCourt && (
          <CourtDetails
            data={selectedCourt}
            onClose={() => setIsCourtDetailsVisible(false)}
          />
        )}
      </div>
    );
  }
  return <div>제보 받은 농구장이 없습니다.</div>;
};

export default AdminPage;
