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
} from '@nextui-org/react';
import getReportedCourtData from '@/services/admin/getReportedCourtData';
import { BasketballCourtReportAdmin } from '@/types/basketballCourt/basketballCourtReport';
import AdminCourtDetails from './components/AdminCourtDetails';
import AdminUserAvatar from './components/AdminUserAvatar';
import EditAdminCourtDetails from './components/EditAdminCourtDetails';

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
];

const AdminPage = () => {
  const [isCourtDetailsVisible, setIsCourtDetailsVisible] = useState(false);
  const [selectedCourt, setSelectedCourt] =
    useState<BasketballCourtReportAdmin | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { data: reportedData, refetch } = useQuery({
    queryKey: ['reportedData'],
    queryFn: getReportedCourtData,
  });

  const handleCourtDetailClick = (item: BasketballCourtReportAdmin) => {
    setIsCourtDetailsVisible(true);
    setSelectedCourt(item);
  };

  const handleEditMode = () => {
    setEditMode(true);
    setIsCourtDetailsVisible(false);
  };

  if (!reportedData) {
    return (
      <div className="mt-60 w-full text-center">
        제보받은 농구장이 없습니다.
      </div>
    );
  }

  const handleEditClose = () => {
    setEditMode(false);
    refetch();
  };

  return (
    <div
      className={`relative h-[calc(100vh-109px)] w-full ${isCourtDetailsVisible || editMode ? 'overflow-y-hidden' : 'overflow-y-scroll'}`}
    >
      <title>슬램톡 | 관리자</title>
      <Table isHeaderSticky aria-label="농구장 제보 목록" fullWidth>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={reportedData}>
          {reportedData.map((item: BasketballCourtReportAdmin) => (
            <TableRow key={item.courtId}>
              {columns.map((column) => (
                <TableCell key={`${column.key}`}>
                  {column.key === 'informerId' ? (
                    <AdminUserAvatar userId={item.informerId} />
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
      {isCourtDetailsVisible && selectedCourt && !editMode && (
        <AdminCourtDetails
          data={selectedCourt}
          handleCloseDetails={() => setIsCourtDetailsVisible(false)}
          handleEditMode={handleEditMode}
          refetch={refetch}
        />
      )}
      {editMode && selectedCourt && (
        <EditAdminCourtDetails
          data={selectedCourt}
          handleEditClose={handleEditClose}
        />
      )}
    </div>
  );
};

export default AdminPage;
