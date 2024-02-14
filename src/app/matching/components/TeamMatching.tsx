'use client';

import React, { useState } from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { TeamPost } from '@/types/matching/teamDataType';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/api/axiosInstance';
import TeamPostCard from './TeamPostCard';

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

const TeamMatching = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const fetchTeamData = async (): Promise<TeamPost[]> => {
    const response = await axiosInstance
      .get('/api/match')
      .then((res) => res.data.results.teamMatchingList);

    return response;
  };

  const { data } = useQuery<TeamPost[], Error>({
    queryKey: ['team'],
    queryFn: fetchTeamData,
  });

  const filteredPosts = Array.isArray(data)
    ? data.filter((post) => {
        const matchesCity = selectedCity
          ? post.locationDetail.includes(selectedCity)
          : true;
        const matchesLevel = selectedLevel
          ? post.skillLevel.includes(selectedLevel)
          : true;
        return matchesCity && matchesLevel;
      })
    : [];

  if (!Array.isArray(data)) {
    return (
      <div>
        <div className="mx-auto mt-10 max-w-[250px]">
          게시글이 존재하지 않습니다.
        </div>
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
  }

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
      {filteredPosts?.map((post) => (
        <Link
          key={post.teamMatchingId}
          href={`/matching/team-details/${post.teamMatchingId}`}
        >
          {/* eslint-disable-next-line react/no-array-index-key */}
          <TeamPostCard
            key={post.teamMatchingId}
            title={post.title}
            teamName={post.teamName}
            date={post.scheduledDate}
            startTime={post.startTime}
            location={post.locationDetail}
            level={post.skillLevel}
            numberOfMembers={post.numberOfMembers}
          />
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
