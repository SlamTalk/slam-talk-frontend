'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Snippet, Button } from '@nextui-org/react';
import MateApplicantList from '../../components/MateApplicantList';

const post = {
  matePostId: 1,
  writerId: 1,
  title: '농구 같이 하실 분!!',
  content: '5시에 잠깐 공 던지실 분 구해요~',
  startScheduledTime: '2024-01-25 17:00',
  endScheduledTime: '2024-01-25 19:00',
  locationDetail: '서울 동남구',
  skillLevel: 'BEGINNER',
  maxParticipantsCenters: 1,
  currentParticipantsCenters: 0,
  maxParticipantsGuards: 0,
  currentParticipantsGuards: 0,
  maxParticipantsForwards: 1,
  currentParticipantsForwards: 0,
  maxParticipantsOthers: 1,
  currentParticipantsOthers: 0,
  participants: [
    {
      participantTableId: 1,
      participantId: 6,
      participantNickname: '행인1',
      applyStatus: 'CANCELED',
      position: 'FORWARD',
      skillLevel: 'HIGH',
    },
    {
      participantTableId: 2,
      participantId: 10,
      participantNickname: '행인2',
      applyStatus: 'REJECTED',
      position: 'FORWARD',
      skillLevel: 'HIGH',
    },
    {
      participantTableId: 3,
      participantId: 14,
      participantNickname: '행인3',
      applyStatus: 'WAITING',
      position: 'CENTER',
      skillLevel: 'HIGH',
    },
  ],
};

const writer = {
  userId: 1,
  userNickname: '농구하자',
  userProfile: null,
};

const user = {
  userId: 1,
  userNickname: '스테픈커리',
  userProfile: null,
};

const PositionRecruitment = () => (
  <div>
    {post.maxParticipantsCenters > 0 && (
      <div className="mb-1">
        <span className="font-semibold">센터</span>:{' '}
        {post.currentParticipantsCenters}/{post.maxParticipantsCenters} 명
      </div>
    )}
    {post.maxParticipantsGuards > 0 && (
      <div className="mb-1">
        <span className="font-semibold">가드</span>:{' '}
        {post.currentParticipantsGuards}/{post.maxParticipantsGuards} 명
      </div>
    )}
    {post.maxParticipantsForwards > 0 && (
      <div className="mb-1">
        <span className="font-semibold">포워드</span>:{' '}
        {post.currentParticipantsForwards}/{post.maxParticipantsForwards} 명
      </div>
    )}
    {post.maxParticipantsOthers > 0 && (
      <div className="mb-1">
        <span className="font-semibold">무관</span>:{' '}
        {post.currentParticipantsOthers}/{post.maxParticipantsOthers} 명
      </div>
    )}
  </div>
);

const MateDetailsPage = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const isWriter = user.userId === writer.userId;

  useEffect(() => {
    const formatDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return `${year}년 ${month}월 ${day}일`;
    };

    const formatHour = (timeString: string) => {
      const [hour, minute] = timeString.split(':');
      return `${hour}시 ${minute}분`;
    };

    const [startDate, startTimeString] = post.startScheduledTime.split(' ');
    const [, endTimeString] = post.endScheduledTime.split(' ');

    setDate(formatDate(startDate));
    setStartTime(formatHour(startTimeString));
    setEndTime(formatHour(endTimeString));
  }, []);

  return (
    <div className="mx-[16px] mt-4 rounded-md border-b-1 bg-gray-200 text-black">
      {/* 유저 프로필 */}
      <div className="mb-4 flex items-center space-x-4 border-b-2 border-gray-400 px-8 py-2">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-300">
          <Image
            src={writer.userProfile || '/images/userprofile-default.png'}
            alt="프로필"
            width={40}
            height={40}
            layout="responsive"
          />
        </div>
        <span className="font-bold">{writer.userNickname}</span>
      </div>

      {/* 모집글 제목 */}
      <h1 className="mx-6 mb-2 text-xl font-bold">{post.title}</h1>

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
        <div className="mt-2 flex items-center justify-between rounded-md bg-gray-300">
          <div>
            <Snippet className="bg-gray-300 text-black" symbol="">
              {post.locationDetail}
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
        <div className="mt-2 rounded-md bg-gray-300 p-3">
          <PositionRecruitment />
        </div>
      </div>

      {/* 상세 내용 */}
      <div className="mx-6 mb-4">
        <div className="text-sm font-semibold">상세 내용</div>
        <p className="mb-6 mt-2 h-[100px] overflow-y-auto break-words rounded-md bg-gray-300 p-3">
          {post.content}
        </p>
      </div>

      {/* 지원자 리스트 */}
      <div className="mx-6 mb-4">
        <div className="text-sm font-semibold">지원자 리스트</div>
        {post.participants.map((participant) => (
          <MateApplicantList
            user={user}
            applicant={participant}
            isWriter={isWriter}
          />
        ))}
      </div>
      <div className="flex justify-center py-3">
        {isWriter ? (
          <>
            <Button color="primary" className="mx-2">
              모집 완료
            </Button>
            <Button color="default" className="mx-2 bg-gray-400">
              모집글 수정
            </Button>
          </>
        ) : (
          <Button color="primary">지원하기</Button>
        )}
      </div>
    </div>
  );
};

export default MateDetailsPage;