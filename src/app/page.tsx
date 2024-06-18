'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Image, Link } from '@nextui-org/react';
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
  const router = useRouter();

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

  const handleKeyDownGoMap = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push('/map');
    }
  };

  return (
    <>
      <title>슬램톡 | 농구 플랫폼</title>
      <div className="relative w-full max-w-[600px] pb-[52px]">
        <div className="m-auto overflow-y-auto scrollbar-hide">
          <div className="relative mx-[16px] mt-4 rounded-md bg-background ">
            {mostImminentSchedule ? (
              <Card className="w-full px-4 py-4">
                <div className="text-center text-lg font-bold">
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
                  <div className="absolute bottom-0 right-2 text-right text-xs text-black/50 underline dark:text-white/50">
                    자세히 보기
                  </div>
                </Link>
              </Card>
            ) : (
              <div className="flex min-h-[130px] items-center justify-center rounded-medium border-1 bg-content1 shadow-md dark:border-none">
                <div className="text-md m-2 h-[50%] text-gray-600 dark:text-gray-200">
                  예정된 매칭이 없습니다.
                </div>
              </div>
            )}
          </div>
          <div className="mx-[16px] mt-2">
            <div className="mb-2 mt-4 text-lg font-bold">
              집 주변의 농구장을 찾아보세요!
            </div>
            <Link href="/map" onKeyDown={handleKeyDownGoMap}>
              <Card>
                <Image
                  isZoomed
                  src="/images/map-image.webp"
                  alt="map-image"
                  height={200}
                  width={600}
                />
              </Card>
            </Link>
          </div>
          <div className="mx-[16px] mt-4">
            <div className="flex justify-between ">
              <div className="text-lg font-bold">경기할 팀을 찾고 있어요!</div>
              <Link href="/matching?tab=team">
                <div className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                  전체보기 〉
                </div>
              </Link>
            </div>
            <div className="my-2 flex gap-3">
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
                <div className="m-auto flex h-[80px] max-w-[568px] items-center justify-center text-center text-gray-600 dark:text-gray-200">
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
              <div className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                전체보기 〉
              </div>
            </Link>
          </div>
          <div className="my-2 flex gap-3">
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
              <div className="m-auto flex h-[80px] max-w-[568px] items-center justify-center text-center dark:text-gray-200">
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
