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
import MatePostCard from './MatePostCard';
import { InfiniteMatePost } from '../../../types/matching/mateDataType';

const levels = [
  { label: '입문', value: 'BEGINER' },
  { label: '하수', value: 'LOW' },
  { label: '중수', value: 'MIDDLE' },
  { label: '고수', value: 'HIGH' },
];

const cities = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

const positions = ['센터', '포워드', '가드'];

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
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
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
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
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
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
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

export default MateMatching;
