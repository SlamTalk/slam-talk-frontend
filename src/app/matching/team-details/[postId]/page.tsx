'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Snippet, Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import axiosInstance from '@/app/api/axiosInstance';
import { TeamPost } from '@/types/matching/teamDataType';
import LocalStorage from '@/utils/localstorage';
import TeamApplicantList from '../../components/TeamApplicantList';

const TeamDetailsPage = () => {
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
  const router = useRouter();

  const fetchTeamDetailsData = async (): Promise<TeamPost> => {
    const response = await axiosInstance
      .get(`/api/match/${postId}`)
      .then((res) => res.data.results);

    return response;
  };

  const { data } = useQuery<TeamPost, Error>({
    queryKey: ['team', postId],
    queryFn: fetchTeamDetailsData,
  });

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

  const writer = {
    userId: data?.writerId,
    userNickname: data?.nickname,
    userProfile: null,
  };
  const isWriter = user?.id === writer.userId;

  const handleApply = () => {
    const isLoggedIn = LocalStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true')
      router.push(`/matching/team-details/${data?.teamMatchingId}/application`);
    else {
      alert('로그인 후 이용할 수 있습니다.');
      router.push(`/login`);
    }
  };

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
        <span className="font-bold">
          {writer.userNickname} [{data?.teamName}]
        </span>
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
        <div className="text-sm font-semibold">경기 유형</div>
        <p className="mb-6 mt-2 rounded-md border-2 p-3">
          {data?.numberOfMembers} vs {data?.numberOfMembers}
        </p>
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
        {data?.teamApplicantsDto.map((applicant) => (
          <TeamApplicantList
            user={user}
            applicant={applicant}
            isWriter={isWriter}
          />
        ))}
      </div>

      {/* 모집 완료, 수정, 지원 버튼 */}
      <div className="flex justify-center py-3">
        {isWriter ? (
          <>
            <Button color="primary" className="mx-2">
              모집 완료
            </Button>
            <Link
              href={`/matching/team-details/${data?.teamMatchingId}/revise`}
            >
              <Button color="default" className="mx-2 bg-gray-400 text-white">
                모집글 수정
              </Button>
            </Link>
          </>
        ) : (
          <Link
            href={`/matching/team-details/${data?.teamMatchingId}/application`}
          >
            <Button color="primary" onClick={handleApply}>
              지원하기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TeamDetailsPage;
