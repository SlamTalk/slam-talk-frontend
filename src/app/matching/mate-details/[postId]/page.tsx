'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Snippet, Button } from '@nextui-org/react';
import axiosInstance from '@/app/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import MateApplicantList from '../../components/MateApplicantList';
import { MatePost } from '../../components/MateDataType';

const user = {
  userId: 12,
  userNickname: '스테픈커리',
  userProfile: null,
};

const MateDetailsPage = () => {
  const { postId } = useParams();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fetchMateDetailsData = async (): Promise<MatePost> => {
    const response = await axiosInstance
      .get(`/api/mate/${postId}`)
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
    userProfile: null,
  };
  const isWriter = user.userId === writer.userId;

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

  return (
    <div className="mx-[16px] mt-4 rounded-md border-2">
      {/* 유저 프로필 */}
      <div className="mb-4 flex items-center space-x-4 border-b-2 px-8 py-2">
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
      <h1 className="mx-6 mb-2 text-xl font-bold">{data?.title}</h1>

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
          {data?.positionList.map((position) => (
            <div key={position.position} className="mb-1">
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
        {data?.participants.map((participant) => (
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
            <Button color="default" className="mx-2 bg-gray-400 text-white">
              모집글 수정
            </Button>
          </>
        ) : (
          <Link href={`/matching/mate-details/${data?.matePostId}/application`}>
            <Button color="primary">지원하기</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MateDetailsPage;
