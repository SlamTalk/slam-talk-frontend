'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Snippet,
  Button,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import axiosInstance from '@/app/api/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import LocalStorage from '@/utils/localstorage';
import { getUserData } from '@/services/user/getUserData';
import UserProfile from '@/app/components/profile/UserProfile';
import MateApplicantList from '../../components/MateApplicantList';
import { MatePost } from '../../../../types/matching/mateDataType';

interface MateChatRoomType {
  participants: number[];
  roomType: string;
  together_id: string;
  name: string;
}

const MateDetailsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onOpen: handleProfileOpen,
    onClose: handleProfileClose,
  } = useDisclosure();
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log({ error });
  }

  const { postId } = useParams();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [chatRoomId, setChatRoomId] = useState('');
  const router = useRouter();

  // 상세 데이터 가져오기
  const fetchMateDetailsData = async (): Promise<MatePost> => {
    const response = await axiosInstance
      .get(`/api/mate/read/${postId}`)
      .then((res) => res.data.results);

    return response;
  };

  const { data } = useQuery<MatePost, Error>({
    queryKey: ['mate', postId],
    queryFn: fetchMateDetailsData,
  });

  const writer = {
    userId: data?.writerId,
    userNickname: data?.writerNickname,
    userProfile: data?.writerImageUrl,
  };
  const isWriter = user?.id === writer.userId; // 작성자인지 확인하는 변수

  // const deleteRecruitment = async (): Promise<AxiosResponse> => {
  //   const response = await axiosInstance.delete<AxiosResponse>(
  //     `/api/mate/${postId}`
  //   );

  //   return response;
  // };

  const patchCompleteRecruitment = async (): Promise<AxiosResponse> => {
    const response = await axiosInstance.patch<AxiosResponse>(
      `/api/mate/${postId}/complete`
    );

    return response;
  };

  const creatMateChatRoom = async (
    roomData: MateChatRoomType
  ): Promise<any> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/chat/create`,
        roomData
      );

      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const createMateChatRoomMutation = useMutation<
    AxiosResponse,
    Error,
    MateChatRoomType
  >({
    mutationFn: creatMateChatRoom,
    onSuccess: (response) => {
      const newChatRoomId = response.data.results;
      setChatRoomId(newChatRoomId);
      onOpen();
    },
    onError: (er) => {
      console.error(er);
    },
  });

  const patchPostStatusMutation = useMutation<AxiosResponse, Error>({
    mutationFn: patchCompleteRecruitment,
    onSuccess: () => {
      console.log('success');
    },
    onError: (err: Error) => {
      console.log(err);
      throw err;
    },
  });

  const handleFinishRecruitment = () => {
    try {
      patchPostStatusMutation.mutate();

      const acceptedParticipantIds =
        data?.participants
          .filter((participant) => participant.applyStatus === 'ACCEPTED')
          .map((acceptedParticipant) => acceptedParticipant.participantId) ||
        [];
      const participantsIds = [
        data?.writerId,
        ...acceptedParticipantIds,
      ].filter((id): id is number => id !== undefined);

      const newRoomData: MateChatRoomType = {
        participants: participantsIds,
        roomType: 'TM',
        together_id: data?.matePostId.toString() ?? '',
        name: data?.title ?? '',
      };

      createMateChatRoomMutation.mutate(newRoomData);
    } catch (err) {
      console.error(err);
      alert('모집 완료 처리 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (data) {
      const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${year}년 ${month}월 ${day}일`;
      };

      const formatHour = (timeString: string) => {
        const [hour, minuteString] = timeString.split(':');
        const hours = parseInt(hour, 10);
        const minutes = parseInt(minuteString, 10);
        const suffix = hours >= 12 ? '오후' : '오전';
        const formattedHour = ((hours + 11) % 12) + 1;
        const paddedHour =
          formattedHour < 10 ? `0${formattedHour}` : formattedHour;
        const paddedMinute = minutes < 10 ? `0${minutes}` : minutes.toString();
        return `${suffix} ${paddedHour}시 ${paddedMinute}분`;
      };

      const startDate = formatDate(data.scheduledDate);
      const startTimeFormatted = formatHour(data.startTime);
      const endTimeFormatted = formatHour(data.endTime);

      setDate(startDate);
      setStartTime(startTimeFormatted);
      setEndTime(endTimeFormatted);
    }
  }, [data]);

  const handleApply = () => {
    const isLoggedIn = LocalStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true')
      router.push(`/matching/mate-details/${data?.matePostId}/application`);
    else {
      alert('로그인 후 이용할 수 있습니다.');
      router.push(`/login`);
    }
  };

  return (
    <div className="mx-[16px] mt-4 rounded-md border-2">
      {/* 유저 프로필 */}
      <div className="mb-4 flex items-center space-x-4 border-b-2 px-8 py-2">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-300">
          <UserProfile
            isOpen={isProfileOpen}
            userId={writer?.userId || -1}
            onClose={handleProfileClose}
          />
          <Avatar
            onClick={handleProfileOpen}
            showFallback
            className="cursor-pointer"
            alt="profile-img"
            src={writer?.userProfile}
          />
        </div>
        <span className="font-bold">{writer.userNickname}</span>
      </div>

      {/* 모집글 제목 */}
      <div className="mx-6 mb-2 flex items-start">
        <h1 className="mr-4 max-w-[420px] text-xl font-bold">{data?.title}</h1>
        <div
          className={`mt-0.5 rounded-full px-3 py-1 text-xs text-white ${
            data?.recruitmentStatus === 'COMPLETED' ? 'bg-danger' : 'bg-success'
          }`}
        >
          {data?.recruitmentStatus === 'COMPLETED' ? '모집 완료' : '모집중'}
        </div>
      </div>

      {/* 날짜와 시간 */}
      <div className="mx-6 mb-4 flex items-center">
        <div className="text-sm">{date}</div>
        <div className="pl-4 text-sm font-semibold">
          {startTime} ~ {endTime}
        </div>
      </div>

      {/* 농구장 장소와 지도 페이지 링크 */}
      <div className="mx-6 mb-4">
        <div className="text-sm font-semibold">농구장 장소</div>
        <div className="mt-2 flex items-center justify-between rounded-md border-2">
          <div>
            <Snippet className="bg-background" symbol="">
              {data?.locationDetail}
            </Snippet>
          </div>

          <Link href="/map">
            <div className="pr-10 text-blue-600 hover:underline">지도 보기</div>
          </Link>
        </div>
      </div>

      {/* 모집 정보 */}
      <div className="mx-6 mb-4">
        <div className="text-sm font-semibold">모집 정보</div>

        <div className="mt-2 rounded-md border-2 p-3">
          <div className="flex">
            {data?.skillLevelList.map((lev, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="mb-2 mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-400"
              >
                {lev}
              </div>
            ))}
          </div>
          {data?.positionList.map((position, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="mb-1">
              <span className="font-semibold">{position.position}</span>:{' '}
              {position.currentPosition}/{position.maxPosition} 명
            </div>
          ))}
        </div>
      </div>

      {/* 상세 내용 */}
      <div className="mx-6 mb-4">
        <div className="text-sm font-semibold">상세 내용</div>
        <p className="mb-6 mt-2 h-[100px] overflow-y-auto break-words rounded-md border-2 p-3">
          {data?.content}
        </p>
      </div>

      {/* 지원자 리스트 */}
      <div className="mx-6 mb-4">
        <div className="text-sm font-semibold">지원자 리스트</div>
        {data?.participants.map((participant, index) => (
          <MateApplicantList
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            user={user}
            applicant={participant}
            isWriter={isWriter}
          />
        ))}
      </div>
      <div className="flex justify-center py-3">
        {isWriter ? (
          data?.recruitmentStatus !== 'COMPLETED' && (
            <>
              <Button
                color="primary"
                className="mx-2"
                onClick={handleFinishRecruitment}
              >
                모집 완료
              </Button>
              <Link href={`/matching/mate-details/${data?.matePostId}/revise`}>
                <Button color="default" className="mx-2 bg-gray-400 text-white">
                  모집글 수정
                </Button>
              </Link>
            </>
          )
        ) : (
          <Button
            color="primary"
            onClick={handleApply}
            disabled={data?.recruitmentStatus === 'COMPLETED'}
          >
            지원하기
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                메이트 찾기 모집 완료
              </ModalHeader>
              <ModalBody>
                <p>메이트 찾기 모집이 완료되었습니다.</p>
                <p>메이트 채팅방이 개설되었습니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    router.push(`/chatting/chatroom/${chatRoomId}`)
                  }
                >
                  채팅방으로 이동
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MateDetailsPage;
