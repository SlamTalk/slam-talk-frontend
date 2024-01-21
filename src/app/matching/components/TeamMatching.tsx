import React, { useState } from 'react';
import { Card, Select, SelectItem, Button } from '@nextui-org/react';

interface Post {
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
    title: '개포동 00체육관 한 팀 구합니다!',
    date: '1월 12일 오후 2시',
    type: '5 vs 5',
    location: '서울특별시 강남구',
    level: ['입문', '초보', '중수'],
  },
  {
    title: '구로구 7시 한 팀 구해요!',
    date: '1월 15일 오후 7시',
    type: '5 vs 5',
    location: '서울특별시 구로구',
    level: ['입문', '초보'],
  },
  {
    title: '도봉구 간단하게 3:3 하실 분~',
    date: '1월 12일 오후 2시',
    type: '3 vs 3',
    location: '서울특별시 도봉구',
    level: ['입문', '초보', '중수', '고수'],
  },
];

const PostCard: React.FC<Post> = ({ title, date, type, location, level }) => (
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

const handleNewPostClick = () => {
  console.log('새 모집글 작성하기');
};

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
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
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
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {filteredPosts.map((post) => (
        <PostCard key={post.title} {...post} />
      ))}
      <div className="fixed bottom-[54px] md:left-[calc(50%-400px)] md:right-[16px]">
        <Button color="primary" onClick={handleNewPostClick}>
          새 모집글 작성
        </Button>
      </div>
    </div>
  );
};

export default TeamMatching;
