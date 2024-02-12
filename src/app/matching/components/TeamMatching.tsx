'use client';

import React, { useState } from 'react';
import { Card, Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface Post {
  postId: number;
  title: string;
  date: string;
  type: string;
  location: string;
  level: string[];
}

interface TeamPost {
  title: string;
  date: string;
  type: string;
  location: string;
  level: string[];
}

const levels = ['입문', '초보', '중수', '고수'];

const cities = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];

const posts: Post[] = [
  {
    postId: 1,
    title: '개포동 00체육관 한 팀 구합니다!',
    date: '1월 12일 오후 2시',
    type: '5 vs 5',
    location: '서울특별시 강남구',
    level: ['입문', '초보', '중수'],
  },
  {
    postId: 2,
    title: '구로구 7시 한 팀 구해요!',
    date: '1월 15일 오후 7시',
    type: '5 vs 5',
    location: '서울특별시 구로구',
    level: ['입문', '초보'],
  },
  {
    postId: 3,
    title: '도봉구 간단하게 3:3 하실 분~',
    date: '1월 12일 오후 2시',
    type: '3 vs 3',
    location: '서울특별시 도봉구',
    level: ['입문', '초보', '중수', '고수'],
  },
];

const TeamPostCard: React.FC<TeamPost> = ({
  title,
  date,
  type,
  location,
  level,
}) => (
  <Card className="m-3">
    <div className="p-4">
      <h4 className="text-md font-bold">{title}</h4>
      <div className="mb-1 mt-2 flex items-center justify-between">
        <p className="text-sm">{location}</p>
        <p className="mx-4 ">{type}</p>
      </div>
      <div className="my-1 flex items-center justify-between">
        <p className="text-sm">{date}</p>
        <div className="flex flex-wrap">
          {level.map((lvl) => (
            <div
              key={lvl}
              className="mx-1 rounded border bg-gray-300 p-1 
              text-xs
              font-bold
              text-black"
            >
              {lvl}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

const TeamMatching = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    const matchesCity = selectedCity
      ? post.location.includes(selectedCity)
      : true;
    const matchesLevel = selectedLevel
      ? post.level.includes(selectedLevel)
      : true;
    return matchesCity && matchesLevel;
  });

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
            {cities.map((city, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <SelectItem key={index} value={city}>
                {city}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Select
            aria-label="실력"
            variant="underlined"
            placeholder="실력별"
            size="sm"
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{ width: '80px', marginLeft: '16px', fontWeight: 'bold' }}
          >
            {levels.map((level, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <SelectItem key={index} value={level}>
                {level}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {filteredPosts.map((post) => (
        <Link key={post.postId} href={`/matching/team-details/${post.postId}`}>
          {/* eslint-disable-next-line react/no-array-index-key */}
          <TeamPostCard key={post.postId} {...post} />
        </Link>
      ))}
      <div className="fixed bottom-14 w-full max-w-[600px]">
        <div className="mr-4 flex justify-end">
          <Link href="/matching/team-new-post">
            <Button
              startContent={<FaPlus />}
              color="primary"
              className="rounded-full bg-primary text-white shadow-md"
            >
              새 모집글 작성
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamMatching;
