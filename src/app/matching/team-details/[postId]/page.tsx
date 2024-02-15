'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Snippet, Button, Avatar } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import axiosInstance from '@/app/api/axiosInstance';
import { TeamPost } from '@/types/matching/teamDataType';
import LocalStorage from '@/utils/localstorage';
import { AxiosResponse } from 'axios';
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
      .get(`/api/match/read/${postId}`)
      .then((res) => res.data.results);

    return response;
  };

  // const deleteRecruitment = async (): Promise<AxiosResponse> => {
  //   const response = await axiosInstance.delete<AxiosResponse>(
  //     `/api/match/read/${postId}`
  //   );

  //   return response;
  // };

  const completeRecruitment = async (): Promise<AxiosResponse> => {
    const response = await axiosInstance.patch<AxiosResponse>(
      `/api/match/${postId}/complete`
    );

    return response;
  };

  const handleFinishRecruitment = async () => {
    try {
      completeRecruitment();
      alert('모집이 완료되었습니다.');
      router.push('/matching');
    } catch (err) {
      console.error(err);
      alert('모집 완료 처리 중 오류가 발생했습니다.');
    }
  };

  const { data } = useQuery<TeamPost, Error>({
    queryKey: ['team', postId],
    queryFn: fetchTeamDetailsData,
  });

  console.log({ data });

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
    userNickname: data?.writerNickname,
    userProfile: data?.writerImageUrl,
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
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-300">
          <Avatar
            alt="profile-img"
            src={writer.userProfile || '/images/userprofile-default.png'}
          />
        </div>
        <span className="font-bold">
          {writer.userNickname} [{data?.teamName}]
        </span>
      </div>

      {/* 모집글 제목 */}
      <div className="mx-6 mb-2 flex items-start">
        <h1 className="mr-4 max-w-[420px] text-xl font-bold">{data?.title}</h1>
        <div
          className={`mt-0.5 rounded-full px-3 py-1 text-xs text-white ${
            data?.recruitmentStatusType === 'COMPLETED'
              ? 'bg-danger'
              : 'bg-success'
          }`}
        >
          {data?.recruitmentStatusType === 'COMPLETED' ? '모집 완료' : '모집중'}
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
        {data?.teamApplicants.map((applicant) => (
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
          data?.recruitmentStatusType !== 'COMPLETED' && (
            <>
              <Button
                color="primary"
                className="mx-2"
                onClick={handleFinishRecruitment}
              >
                모집 완료
              </Button>
              <Link
                href={`/matching/mate-details/${data?.teamMatchingId}/revise`}
              >
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
            disabled={data?.recruitmentStatusType === 'COMPLETED'}
          >
            지원하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeamDetailsPage;
