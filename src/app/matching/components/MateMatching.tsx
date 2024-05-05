'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import { infiniteFetchMateData } from '@/services/matching/getMateData';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  basketballSkillData,
  basketballPositionFilterData,
} from '@/constants/basketballInfoData';
import { locationFilterData } from '@/constants/locationData';
import MatePostCard from './MatePostCard';
import { InfiniteMatePost } from '../../../types/matching/mateDataType';

interface MateMatchingProps {
  keywordProp: string | null;
}

const MateMatching: React.FC<MateMatchingProps> = ({ keywordProp }) => {
  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0, delay: 0 });
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<
    InfiniteMatePost,
    Error
  >({
    queryKey: ['mate', 'infinite'],
    queryFn: ({ pageParam }: any) =>
      infiniteFetchMateData(
        pageParam,
        selectedLevel,
        selectedCity,
        selectedPosition,
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
  }, [selectedCity, selectedLevel, selectedPosition, keywordProp, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const handleCreateNewPost = () => {
    const isLoggedIn = LocalStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') router.push(`/matching/mate-new-post`);
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
            aria-label="지역(시/도) 필터"
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
          <div>
            <Select
              aria-label="포지션 필터"
              variant="underlined"
              placeholder="포지션별"
              size="sm"
              onChange={(e) => setSelectedPosition(e.target.value)}
              style={{
                width: '100px',
                fontWeight: 'bold',
              }}
            >
              {basketballPositionFilterData.map((position) => (
                <SelectItem key={position.value} value={position.value}>
                  {position.value}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              aria-label="실력 필터"
              variant="underlined"
              placeholder="실력별"
              size="sm"
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{
                width: '80px',
                fontWeight: 'bold',
              }}
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
      </div>
      {data?.pages.map((page) =>
        page.matePostList.map((post) => (
          <Link
            key={post.matePostId}
            href={`/matching/mate-details/${post.matePostId}`}
          >
            <MatePostCard
              title={post.title}
              date={post.scheduledDate}
              startTime={post.startTime}
              location={post.locationDetail}
              level={post.skillLevelList}
              positionNeeds={post.positionList}
              recruitmentStatus={post.recruitmentStatus}
            />
          </Link>
        ))
      )}
      <div className="relative flex w-full justify-end">
        <Button
          startContent={<FaPlus />}
          color="primary"
          className="fixed bottom-12 m-4 rounded-full bg-primary text-white shadow-md"
          onClick={handleCreateNewPost}
        >
          새 모집글 작성
        </Button>
      </div>
      <div ref={ref} style={{ height: '10px' }} />
    </div>
  );
};

export default MateMatching;
