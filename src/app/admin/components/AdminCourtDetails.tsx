'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { IoIosClose } from 'react-icons/io';
import {
  FaPhoneAlt,
  FaParking,
  FaTag,
  FaRegDotCircle,
  FaEdit,
} from 'react-icons/fa';
import Image from 'next/image';
import { FaLocationDot, FaClock, FaLightbulb } from 'react-icons/fa6';
import Link from 'next/link';
import { CourtIcon } from '@/app/map/components/icons/CourtIcon';
import { HoopIcon } from '@/app/map/components/icons/HoopIcon';
import { FeeIcon } from '@/app/map/components/icons/FeeIcon';
import { InfoIcon } from '@/app/map/components/icons/InfoIcon';
import { WebsiteIcon } from '@/app/map/components/icons/WebsiteIcon';
import axiosInstance from '@/app/api/axiosInstance';
import { BasketballCourtReportAdmin } from '@/types/basketballCourt/basketballCourtReport';
import { convertCourtData } from '@/utils/convertCourtData';

interface CourtDetailsProps {
  data: BasketballCourtReportAdmin;
  handleCloseDetails: () => void;
  handleEditMode: () => void;
  refetch: () => void;
}

const AdminCourtDetails: React.FC<CourtDetailsProps> = ({
  data,
  handleCloseDetails,
  handleEditMode,
  refetch,
}) => {
  const handleReject = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/reject/${data.courtId}`
      );
      if (response.status === 200) {
        refetch();
        handleCloseDetails();
      }
    } catch (error) {
      console.error('농구장 거절 에러:', error);
    }
  };

  const handleAccept = async () => {
    const cleanedData = convertCourtData(data, data.photoUrl);

    try {
      const response = await axiosInstance.put(
        `/api/admin/update/${data.courtId}`,
        cleanedData
      );
      if (response.status === 200) {
        refetch();
        handleCloseDetails();
      }
    } catch (error) {
      console.error('농구장 수락 에러:', error);
    }
  };

  const handleCopyAddress = async () => {
    if (data.address) {
      try {
        await navigator.clipboard.writeText(data.address);
        alert('주소가 복사되었습니다.');
      } catch (copyError) {
        console.error('주소 복사 중 오류 발생:', copyError);
        alert('주소를 복사하는 데 실패했습니다.');
      }
    }
  };

  if (data) {
    return (
      <>
        <title>슬램톡 | 관리자</title>
        <div className="min-w-md sm-h-full fixed inset-0 z-40 m-auto h-fit max-h-[calc(100vh-109px)] w-fit min-w-96 max-w-md overflow-y-auto rounded-lg bg-background shadow-md transition-all duration-300 ease-in-out sm:min-w-full">
          <div className="relative h-full w-full text-sm">
            <div className="relative h-56 w-full sm:h-52">
              <Image
                fill
                alt="농구장 사진"
                src={
                  data.photoUrl ? data.photoUrl : '/images/basketball-court.svg'
                }
              />
              <Button
                size="sm"
                radius="full"
                variant="light"
                isIconOnly
                className="absolute right-2 top-2"
                onClick={handleCloseDetails}
                aria-label="Close"
              >
                <IoIosClose size={30} />
              </Button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="mb-1 text-xl font-bold">{data.courtName}</h2>
                <Button
                  startContent={<FaEdit size={20} />}
                  className="flex items-center justify-center gap-1"
                  onClick={handleEditMode}
                >
                  수정하기
                </Button>
              </div>

              {data.indoorOutdoor && (
                <span className="break-keep rounded-sm bg-gray-100 px-1 text-gray-500 dark:bg-gray-300 dark:text-gray-600">
                  {data.indoorOutdoor}
                </span>
              )}

              <div className="flex w-full items-center justify-end">
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={<FaRegDotCircle />}
                  radius="full"
                  className="border-0 p-0"
                  onClick={() => {
                    window.open(
                      `https://map.kakao.com/link/to/${data.courtName},${data.latitude},${data.longitude}`,
                      '_blank'
                    );
                  }}
                >
                  길찾기
                </Button>
              </div>
              <div className="flex justify-center" />
              <hr className="w-90 my-4 h-px bg-gray-300" />
              <div className="my-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 align-middle">
                  <FaLocationDot
                    size={16}
                    className="dark:text-gray-20 text-gray-400"
                  />
                  <span>{data.address}</span>
                  <button type="button" onClick={handleCopyAddress}>
                    <span className="text-blue-500">복사</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaClock
                    size={14}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <span>
                    개방 시간:{' '}
                    <span className="text-rose-400">
                      {data.openingHours === '정보없음'
                        ? '-'
                        : data.openingHours}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaPhoneAlt
                    size={15}
                    className="pointer-events-auto text-gray-400 dark:text-gray-200"
                  />
                  <span>{data.phoneNum ? data.phoneNum : '-'}</span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FeeIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="text-info text-blue-500">
                    이용료: {data.fee === '정보없음' ? '-' : data.fee}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <WebsiteIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="text-blue-500">
                    {data.website ? (
                      <Link href={data.website} target="_blank">
                        {data.website}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <CourtIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="font-medium">
                    코트 종류: {data.courtType ? data.courtType : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <CourtIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="font-medium">
                    코트 사이즈: {data.courtSize ? data.courtSize : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <HoopIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="font-medium">
                    골대 수: {data.hoopCount ? data.hoopCount : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaLightbulb
                    size={17}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <span>
                    야간 조명:{' '}
                    {data.nightLighting === '정보없음'
                      ? '-'
                      : data.nightLighting}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <FaParking
                    size={17}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <span>
                    주차:{' '}
                    {data.parkingAvailable === '정보없음'
                      ? '-'
                      : data.parkingAvailable}
                  </span>
                </div>
                <div className="flex items-center gap-2 align-middle text-sm">
                  <FaTag
                    size={17}
                    className="text-gray-400 dark:text-gray-200"
                  />
                  <ul className="flex gap-2">
                    {data.convenience?.length
                      ? data.convenience
                          .filter((item) => item !== '')
                          .map((tag: string, idx: number) => (
                            <li
                              // eslint-disable-next-line react/no-array-index-key
                              key={idx}
                              className="rounded-sm bg-gray-100 px-1 text-gray-500 dark:bg-gray-300 dark:text-gray-600"
                            >
                              <span>{tag}</span>
                            </li>
                          ))
                      : '-'}
                  </ul>
                </div>
                <div className="flex items-center gap-2 align-middle">
                  <InfoIcon className="text-gray-400 dark:text-gray-200" />
                  <span className="text-sm">
                    {data.additionalInfo ? data.additionalInfo : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 p-4 pt-0">
            <Button color="danger" variant="flat" onClick={handleReject}>
              거절
            </Button>
            <Button color="primary" onClick={handleAccept}>
              승인
            </Button>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default AdminCourtDetails;
