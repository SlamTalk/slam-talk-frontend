'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@nextui-org/react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Schedule,
  ScheduleItem,
  ScheduleResponse,
} from '@/types/home/scheduleType';
import { fetchScheduleList } from '@/services/home/getSchedule';
import { MatePost } from '@/types/matching/mateDataType';
import { TeamPost } from '@/types/matching/teamDataType';
import { fetchMateData } from '@/services/matching/getMateData';
import { fetchTeamData } from '@/services/matching/getTeamData';
import MiniMatePostCard from './components/MiniMatePostCard';
import MiniTeamPostCard from './components/MiniTeamPostCard';

const convertToSchedule = (
  item: ScheduleItem,
  source: 'team' | 'mate'
): Schedule => {
  const postId =
    source === 'team'
      ? (item as typeof item & { teamMatchingId: number }).teamMatchingId
      : (item as typeof item & { matePostId: number }).matePostId;

  return {
    postId,
    scheduledDate: item.scheduledDate,
    startTime: item.startTime,
    title: item.title,
    locationDetail: item.locationDetail,
    source,
  };
};

const Home = () => {
  const { data: schedule } = useQuery<ScheduleResponse['results'], Error>({
    queryKey: ['scheduleList'],
    queryFn: fetchScheduleList,
  });
  const { data: teamPosts } = useQuery<TeamPost[], Error>({
    queryKey: ['team'],
    queryFn: fetchTeamData,
  });
  const { data: matePosts } = useQuery<MatePost[], Error>({
    queryKey: ['mate'],
    queryFn: fetchMateData,
  });

  // 가장 임박한 스케줄을 계산하는 로직
  const mostImminentSchedule = React.useMemo(() => {
    if (!schedule) return null;

    const { teamMatchingList, mateList } = schedule;
    const firstTeamMatch = teamMatchingList?.[0];
    const firstMateMatch = mateList?.[0];

    let mostImminent: Schedule | null = null;

    if (firstTeamMatch && firstMateMatch) {
      const teamDate = new Date(
        `${firstTeamMatch.scheduledDate}T${firstTeamMatch.startTime}`
      );
      const mateDate = new Date(
        `${firstMateMatch.scheduledDate}T${firstMateMatch.startTime}`
      );

      mostImminent =
        teamDate < mateDate
          ? convertToSchedule(firstTeamMatch, 'team')
          : convertToSchedule(firstMateMatch, 'mate');
    } else if (firstTeamMatch) {
      mostImminent = convertToSchedule(firstTeamMatch, 'team');
    } else if (firstMateMatch) {
      mostImminent = convertToSchedule(firstMateMatch, 'mate');
    }

    return mostImminent;
  }, [schedule]);

  return (
    <>
      <title>슬램톡 | 농구 플랫폼</title>
      <div>
        <div className="m-auto grid max-w-[600px] overflow-y-auto  scrollbar-hide">
          <div className="mx-[16px] mt-4 rounded-md bg-background">
            {mostImminentSchedule ? (
              <Card className="max-w-[568px] px-4 py-2">
                <div className="mt-2 text-center text-lg font-bold">
                  임박한 매칭이 있어요!
                </div>
                <div className="mt-1 text-sm">
                  제목: {mostImminentSchedule.title}
                </div>
                <div className="mt-1 text-sm">
                  장소: {mostImminentSchedule.locationDetail}
                </div>
                <div className="mt-1 text-sm">
                  시간: {mostImminentSchedule.scheduledDate}{' '}
                  {mostImminentSchedule.startTime}
                </div>
                <Link
                  href={`/matching/${mostImminentSchedule.source}-details/${mostImminentSchedule.postId}`}
                >
                  <div className="mb-2 text-right text-xs text-black text-opacity-50 underline">
                    자세히 보기
                  </div>
                </Link>
              </Card>
            ) : (
              <div>
                <div className="text-md m-2 items-center text-center text-gray-400">
                  예정된 매칭이 없습니다.
                </div>
              </div>
            )}
          </div>
          <div className="mx-[16px] mt-2">
            <div className="mt-4 text-lg font-bold">
              집 주변의 농구장을 찾아보세요!
            </div>
            <Link href="/map">
              <div className="mt-2">
                <Image
                  src="/images/map_image.png"
                  alt="map-image"
                  style={{ borderRadius: '8px', overflow: 'hidden' }}
                  width={600}
                  height={200}
                />
              </div>
              <div className="relative bottom-10 z-10 m-auto w-[150px] rounded bg-[#FF644C] py-1 text-center text-sm font-bold text-white">
                농구장 찾으러 가기
              </div>
            </Link>
          </div>
          <div className="mx-[16px] ">
            <div className="flex justify-between ">
              <div className="text-lg font-bold">경기할 팀을 찾고 있어요!</div>
              <Link href="/matching?tab=team">
                <div className="mr-2 text-black text-opacity-40">
                  전체보기 〉
                </div>
              </Link>
            </div>
            <div className="flex max-w-[568px] gap-3">
              {teamPosts && teamPosts.length > 0 ? (
                teamPosts
                  .slice(0, 3)
                  .map((teamPost) => (
                    <MiniTeamPostCard
                      key={teamPost.teamMatchingId}
                      teamPost={teamPost}
                    />
                  ))
              ) : (
                <div className="m-auto flex h-[80px] max-w-[568px] items-center justify-center text-center text-gray-500">
                  새로운 게시글이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx-[16px] mt-2">
          <div className="flex justify-between ">
            <div className="text-lg font-bold">같이 농구할 사람을 구해요!</div>
            <Link href="/matching?tab=mate">
              <div className="mr-2 text-black text-opacity-40">전체보기 〉</div>
            </Link>
          </div>
          <div className="flex max-w-[568px] gap-3">
            {matePosts && matePosts.length > 0 ? (
              matePosts
                .slice(0, 3)
                .map((matePost) => (
                  <MiniMatePostCard
                    key={matePost.matePostId}
                    matePost={matePost}
                  />
                ))
            ) : (
              <div className="m-auto flex h-[80px] max-w-[568px] items-center justify-center text-center text-gray-500">
                새로운 게시글이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
