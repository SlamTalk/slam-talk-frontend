import React, { useState } from 'react';
import { Card, Select, SelectItem, Button } from '@nextui-org/react';
import Link from 'next/link';

interface Post {
  postId: string;
  title: string;
  date: string;
  location: string;
  level: string[];
  positionNeeds: { [position: string]: number };
  currentParticipants: { [position: string]: number }; // 현재 참여 인원
}

interface MatePost {
  title: string;
  date: string;
  location: string;
  level: string[];
  positionNeeds: { [position: string]: number };
  currentParticipants: { [position: string]: number };
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

const positions = ['센터', '포워드', '가드'];

const posts: Post[] = [
  {
    postId: '1',
    title: '서초구 주말 농구 모임!',
    date: '2월 20일 오전 10시',
    location: '서울특별시 서초구',
    level: ['입문', '초보'],
    positionNeeds: {
      센터: 1,
      포워드: 2,
      가드: 2,
      무관: 3,
    },
    currentParticipants: {
      센터: 0,
      포워드: 1,
      가드: 1,
      무관: 0,
    },
  },
  {
    postId: '2',
    title: '강남구 친선 경기 팀원 구합니다!',
    date: '2월 25일 오후 1시',
    location: '서울특별시 강남구',
    level: ['중수', '고수'],
    positionNeeds: {
      센터: 2,
      포워드: 1,
      가드: 1,
    },
    currentParticipants: {
      센터: 1,
      포워드: 0,
      가드: 0,
    },
  },
  {
    postId: '3',
    title: '마포구 저녁 농구 동호회원 모집',
    date: '2월 28일 오후 6시',
    location: '서울특별시 마포구',
    level: ['초보', '중수'],
    positionNeeds: {
      포워드: 1,
      가드: 3,
    },
    currentParticipants: {
      포워드: 1,
      가드: 2,
    },
  },
];

const MatePostCard: React.FC<MatePost> = ({
  title,
  date,
  location,
  level,
  positionNeeds,
  currentParticipants,
}) => (
  <Card className="m-3">
    <div className="p-4">
      <h4 className="text-md font-bold">{title}</h4>
      <div className="mb-1 mt-2 flex items-center justify-between">
        <p className="text-sm">{location}</p>
        <div className="flex flex-wrap">
          {Object.entries(positionNeeds).map(([position, need]) => {
            const current = currentParticipants[position] || 0;
            return (
              <div
                key={position}
                className="mx-1 rounded border bg-gray-300 p-1 text-xs font-bold text-black"
              >
                {`${position}:  ${current}/${need}`}
              </div>
            );
          })}
        </div>
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

const MateMatching = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    const matchesCity = selectedCity
      ? post.location.includes(selectedCity)
      : true;
    const matchesLevel = selectedLevel
      ? post.level.includes(selectedLevel)
      : true;
    const matchesPosition = selectedPosition
      ? Object.keys(post.positionNeeds).includes(selectedPosition)
      : true;
    return matchesCity && matchesLevel && matchesPosition;
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
              aria-label="포지션 선택"
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
      </div>
      {filteredPosts.map((post) => (
        <Link href={`/matching/mate-detail/${post.postId}`}>
          <MatePostCard key={post.postId} {...post} />
        </Link>
      ))}
      <div className="fixed bottom-14 w-full max-w-[600px]">
        <div className="mr-4 flex justify-end">
          <Link href="/matching/mate-new-post">
            <Button color="primary">새 모집글 작성</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MateMatching;
