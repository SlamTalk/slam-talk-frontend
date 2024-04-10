'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { InfiniteTeamPost } from '@/types/matching/teamDataType';
import { useInfiniteQuery } from '@tanstack/react-query';
import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import { infiniteFetchTeamData } from '@/services/matching/getTeamData';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from 'react-intersection-observer';
import {
  basketballSkillData,
  basketballGameScaleFilterData,
} from '@/constants/basketballInfoData';
import { locationFilterData } from '@/constants/locationData';
import TeamPostCard from './TeamPostCard';

interface MateMatchingProps {
  keywordProp: string | null;
}

const TeamMatching: React.FC<MateMatchingProps> = ({ keywordProp }) => {
  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0, delay: 0 });
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedNumberOfMembers, setSelectedNumberOfMembers] =
    useState<string>('');

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<
    InfiniteTeamPost,
    Error
  >({
    queryKey: ['team', 'infinite'],
    queryFn: ({ pageParam }: any) =>
      infiniteFetchTeamData(
        pageParam,
        selectedLevel,
        selectedCity,
        selectedNumberOfMembers,
        keywordProp
      ),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [
    selectedCity,
    selectedLevel,
    selectedNumberOfMembers,
    keywordProp,
    refetch,
  ]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const handleCreateNewPost = () => {
    const isLoggedIn = LocalStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') router.push(`/matching/team-new-post`);
    else {
      alert('로그인 후 이용할 수 있습니다.');
      router.push(`/login`);
    }
  };

  return (
    <div className="relative mx-auto max-w-[600px] pb-[80px]">
      <div className="mx-[24px] flex items-end justify-between">
        <div>
          <Select
            classNames={{
              value: 'text-xl font-semibold',
            }}
            aria-label="시/도 선택"
            variant="underlined"
            placeholder="시/도 선택"
            size="lg"
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              width: '140px',
              fontWeight: 'bold',
            }}
            className="text-bold"
          >
            {locationFilterData.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex">
          <Select
            aria-label="게임 유형"
            variant="underlined"
            placeholder="유형별"
            size="sm"
            onChange={(e) => setSelectedNumberOfMembers(e.target.value)}
            style={{ width: '100px', fontWeight: 'bold' }}
          >
            {basketballGameScaleFilterData.map((number) => (
              <SelectItem key={number.value} value={number.value}>
                {`${number.value} vs ${number.value}`}
              </SelectItem>
            ))}
          </Select>
          <Select
            aria-label="실력"
            variant="underlined"
            placeholder="실력별"
            size="sm"
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{ width: '80px', fontWeight: 'bold' }}
            className="ml-[16px] sm:ml-0"
          >
            {basketballSkillData.map((level) => (
              <SelectItem key={level.key} value={level.key}>
                {level.value}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {data?.pages.map((page) =>
        page.teamMatchingList.map((post) => (
          <Link href={`/matching/team-details/${post.teamMatchingId}`}>
            <TeamPostCard
              key={post.teamMatchingId}
              title={post.title}
              teamName={post.teamName}
              date={post.scheduledDate}
              startTime={post.startTime}
              location={post.locationDetail}
              level={post.skillLevelList}
              numberOfMembers={post.numberOfMembers}
              recruitmentStatusType={post.recruitmentStatusType}
            />
          </Link>
        ))
      )}
      <div className="fixed bottom-14 w-full max-w-[600px]">
        <div className="mr-4 flex justify-end">
          <Button
            startContent={<FaPlus />}
            color="primary"
            className="rounded-full bg-primary text-white shadow-md"
            onClick={handleCreateNewPost}
          >
            새 모집글 작성
          </Button>
        </div>
      </div>
      <div ref={ref} style={{ height: '10px' }} />
    </div>
  );
};

export default TeamMatching;
