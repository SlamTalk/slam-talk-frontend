'use client';

import React, { useState } from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { TeamPost } from '@/types/matching/teamDataType';
import { useQuery } from '@tanstack/react-query';
import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import { fetchTeamData } from '@/services/matching/getTeamData';
import TeamPostCard from './TeamPostCard';

const levels = ['입문', '하수', '중수', '고수'];

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

const scale = ['2', '3', '4', '5'];

interface MateMatchingProps {
  keywordProp: string | null;
}

const TeamMatching: React.FC<MateMatchingProps> = ({ keywordProp }) => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedNumberOfMembers, setSelectedNumberOfMembers] =
    useState<string>('');

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
          ? post.skillLevelList.includes(selectedLevel)
          : true;
        const matchesNumberOfMembers = selectedNumberOfMembers
          ? post.numberOfMembers === selectedNumberOfMembers
          : true;
        const keyword = keywordProp?.toLowerCase();
        const matchesKeyword = keyword
          ? post.title.toLowerCase().includes(keyword) ||
            post.content.toLowerCase().includes(keyword) ||
            post.locationDetail.toLowerCase().includes(keyword) ||
            post.writerNickname.toLowerCase().includes(keyword)
          : true;

        return (
          matchesCity &&
          matchesLevel &&
          matchesNumberOfMembers &&
          matchesKeyword
        );
      })
    : [];

  const handleCreateNewPost = () => {
    const isLoggedIn = LocalStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') router.push(`/matching/team-new-post`);
    else {
      alert('로그인 후 이용할 수 있습니다.');
      router.push(`/login`);
    }
  };

  if (!Array.isArray(data)) {
    return (
      <div>
        <div className="mx-auto mt-[50px] max-w-[250px]">
          게시글이 존재하지 않습니다.
        </div>
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
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
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
            {scale.map((number) => (
              <SelectItem key={number} value={number}>
                {`${number} vs ${number}`}
              </SelectItem>
            ))}
          </Select>
          <Select
            aria-label="실력"
            variant="underlined"
            placeholder="실력별"
            size="sm"
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{ width: '80px', marginLeft: '16px', fontWeight: 'bold' }}
          >
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
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
            level={post.skillLevelList}
            numberOfMembers={post.numberOfMembers}
            recruitmentStatusType={post.recruitmentStatusType}
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

export default TeamMatching;
