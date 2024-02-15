'use client';

import React, { useState } from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import axiosInstance from '@/app/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import MatePostCard from './MatePostCard';
import { MatePost } from './MateDataType';

const levels = ['입문', '초보', '중수', '고수'];

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

const positions = ['CENTER', 'FORWARD', 'GUARD'];

interface MateMatchingProps {
  keywordProp: string | null;
}

const MateMatching: React.FC<MateMatchingProps> = ({ keywordProp }) => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const fetchMateData = async (): Promise<MatePost[]> => {
    const response = await axiosInstance
      .get('/api/mate')
      .then((res) => res.data.results.matePostList);

    return response;
  };

  const { data } = useQuery<MatePost[], Error>({
    queryKey: ['mate'],
    queryFn: fetchMateData,
  });

  const filteredMatePost =
    data?.filter((post: MatePost) => {
      // 장소 필터
      const matchesCity = selectedCity
        ? post.locationDetail.includes(selectedCity)
        : true;

      // 포지션 필터
      const matchesPosition = selectedPosition
        ? post.positionList.some(
            (position) =>
              position.position === selectedPosition ||
              position.position === 'UNSPECIFIED'
          )
        : true;

      // 실력 필터
      const matchesLevel = selectedLevel
        ? post.skillList.includes(selectedLevel)
        : true;

      // 검색어 필터링

      const keyword = keywordProp?.toLowerCase();
      const matchesKeyword = keyword
        ? post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword) ||
          post.locationDetail.toLowerCase().includes(keyword) ||
          post.writerNickname.toLowerCase().includes(keyword)
        : true;

      return matchesCity && matchesLevel && matchesPosition && matchesKeyword;
    }) || [];

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
                marginLeft: '16px',
                fontWeight: 'bold',
              }}
            >
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {filteredMatePost.map((post: MatePost) => (
        <Link
          key={post.matePostId}
          href={`/matching/mate-details/${post.matePostId}`}
        >
          <MatePostCard
            title={post.title}
            date={post.scheduledDate}
            startTime={post.startTime}
            location={post.locationDetail}
            level={post.skillList}
            positionNeeds={post.positionList}
          />
        </Link>
      ))}
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
    </div>
  );
};

export default MateMatching;
