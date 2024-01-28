'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Snippet } from '@nextui-org/react';

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
      participantNickname: '행인1',
      applyStatus: 'CANCEL',
      position: 'FORWARD',
      skillLevel: 'HIGH',
    },
    {
      participantTableId: 2,
      participantNickname: '행인2',
      applyStatus: 'REJECTED',
      position: 'FORWARD',
      skillLevel: 'HIGH',
    },
    {
      participantTableId: 3,
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

const PositionRecruitment = () => (
  <div className="mb-6">
    {post.maxParticipantsCenters > 0 && (
      <div className="mb-2">
        <span className="font-semibold">센터</span>:{' '}
        {post.currentParticipantsCenters}/{post.maxParticipantsCenters} 명
      </div>
    )}
    {post.maxParticipantsGuards > 0 && (
      <div className="mb-2">
        <span className="font-semibold">가드</span>:{' '}
        {post.currentParticipantsGuards}/{post.maxParticipantsGuards} 명
      </div>
    )}
    {post.maxParticipantsForwards > 0 && (
      <div className="mb-2">
        <span className="font-semibold">포워드</span>:{' '}
        {post.currentParticipantsForwards}/{post.maxParticipantsForwards} 명
      </div>
    )}
    {post.maxParticipantsOthers > 0 && (
      <div className="mb-2">
        <span className="font-semibold">무관</span>:{' '}
        {post.currentParticipantsOthers}/{post.maxParticipantsOthers} 명
      </div>
    )}
  </div>
);

const MateDetailPage = () => {
  // 날짜 및 시간 포맷 변경 함수
  const formatTime = (timeString: string) => {
    const [datePart, timePart] = timeString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  return (
    <div className="bg-white p-4">
      {/* 유저 프로필 */}
      <div className="mb-6 flex items-center space-x-4">
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
      <h1 className="mb-4 text-xl font-bold">{post.title}</h1>

      {/* 날짜와 시간 */}
      <div className="mb-4 flex items-center justify-between">
        <span>{formatTime(post.startScheduledTime)}</span>
        <span>{formatTime(post.endScheduledTime)}</span>
      </div>

      {/* 농구장 장소와 지도 페이지 링크 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Snippet symbol="">{post.locationDetail}</Snippet>
        </div>

        <Link href="/map">
          <div className="text-blue-600 hover:underline">지도 보기</div>
        </Link>
      </div>

      {/* 상세 내용 */}
      <p className="mb-6">{post.content}</p>

      <PositionRecruitment />

      {/* 지원자 리스트 */}
      <div>
        <h2 className="mb-4 font-bold">지원자 리스트</h2>
        {post.participants.map((participant) => (
          <div key={participant.participantTableId} className="mb-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {participant.participantNickname}
              </span>
              <span
                className={`text-sm ${participant.applyStatus === 'WAITING' ? 'text-yellow-500' : 'text-gray-500'}`}
              >
                {participant.applyStatus}
              </span>
            </div>
            <div className="text-sm">
              {`포지션: ${participant.position}, 실력: ${participant.skillLevel}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MateDetailPage;
