import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { IoIosClose } from 'react-icons/io';
import axiosInstance from '@/app/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  AdminCourtDetailsProps,
  CourtData,
  PutCourtData,
} from './adminDataType';

interface NewBasketChatData {
  basket_ball_id: string;
  name: string;
}

const AdminCourtDetails: React.FC<AdminCourtDetailsProps> = ({
  data,
  onClose,
}) => {
  const putReportedCourt = async (acceptedCourtData: PutCourtData) => {
    const response = await axiosInstance.put(
      `/api/admin/update/${data.courtId}`,
      acceptedCourtData
    );
    console.log({ response });
    return response;
  };

  const createBasketChatRoom = async (
    roomData: NewBasketChatData
  ): Promise<any> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/chat/create/basketball`,
        roomData
      );

      console.log({ response });
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const convertToPutCourtData = (
    courtData: CourtData,
    newId: number
  ): PutCourtData => {
    const {
      courtType,
      indoorOutdoor,
      courtSize,
      hoopCount,
      nightLighting,
      openingHours,
      fee,
      parkingAvailable,
      phoneNum,
      website,
      convenience,
      additionalInfo,
      photoUrl,
      informerId,
    } = courtData;

    const newData: PutCourtData = {
      courtType,
      indoorOutdoor,
      courtSize,
      hoopCount,
      nightLighting,
      openingHours,
      fee,
      parkingAvailable,
      phoneNum,
      website,
      convenience: convenience.join(', '),
      additionalInfo,
      photoUrl,
      informerId,
      chatroomId: newId,
    };

    return newData;
  };

  const putReportCourtMutation = useMutation<
    AxiosResponse,
    Error,
    PutCourtData
  >({
    mutationFn: putReportedCourt,
    onSuccess: () => {
      console.log('success');
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const createBasketChatRoomMutation = useMutation<
    AxiosResponse,
    Error,
    NewBasketChatData
  >({
    mutationFn: createBasketChatRoom,
    onSuccess: (response) => {
      const newChatroomId = response.data.results;
      const newData = convertToPutCourtData(data, newChatroomId);
      putReportCourtMutation.mutate(newData);
    },
    onError: (er) => {
      console.error(er);
    },
  });

  const onAccept = () => {
    const newRoomData = {
      basket_ball_id: data.courtId.toString(),
      name: data.courtName,
    };
    createBasketChatRoomMutation.mutate(newRoomData);
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4 ">
      <div className="max-h-[800px] min-w-[400px] overflow-y-auto rounded-lg bg-background shadow-lg">
        <div className="relative">
          {/* 코트 상세 정보 제목 및 닫기 버튼 */}
          <div className="flex items-center justify-between p-4">
            <h2 className="flex-grow text-center text-xl font-bold">
              코트 상세 정보
            </h2>
            <Button
              isIconOnly
              className="ml-4"
              onClick={onClose}
              aria-label="Close"
            >
              <IoIosClose
                size={30}
                className="text-gray-600 dark:text-gray-200"
              />
            </Button>
          </div>
          <div className="relative h-60 w-full">
            <Image
              fill
              alt="농구장 사진"
              src={
                data.photoUrl ? data.photoUrl : '/images/basketball-court.svg'
              }
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{data.courtName}</h2>
          <p>{data.address}</p>
          <p>코트 종류: {data.courtType}</p>
          <p>실내/야외: {data.indoorOutdoor}</p>
          <p>코트 사이즈: {data.courtSize}</p>
          <p>골대 수: {data.hoopCount}</p>
          <p>야간 조명: {data.nightLighting ? '있음' : '없음'}</p>
          <p>개방 시간: {data.openingHours ? '24시간' : '제한 있음'}</p>
          <p>사용료: {data.fee ? '유료' : '무료'}</p>
          <p>주차 가능: {data.parkingAvailable ? '가능' : '불가능'}</p>
          <p>전화번호: {data.phoneNum || '-'}</p>
          <p>
            웹사이트:{' '}
            {data.website ? (
              <a href={data.website} target="_blank" rel="noopener noreferrer">
                {data.website}
              </a>
            ) : (
              '-'
            )}
          </p>
          <p>편의 시설: {data.convenience.join(', ')}</p>
          <p>추가 정보: {data.additionalInfo || '없음'}</p>
        </div>
        {/* 수락 및 취소 버튼 */}
        <div className="flex justify-end space-x-2 p-4">
          <Button onClick={onAccept}>승인</Button>
          <Button onClick={onCancel}>취소</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourtDetails;
