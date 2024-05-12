'use client';

import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Tab, Tabs } from '@nextui-org/tabs';
import getMyMateMatchingData from '@/services/user/getMyMateMatchingData';
import { useQuery } from '@tanstack/react-query';
import { MatePost, MyMateMatching } from '@/types/matching/mateDataType';

const MateMatchingList = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const [authoredPost, setAuthoredPost] = useState<MatePost[]>([]);
  const [participatedPost, setParticipatedPost] = useState<MatePost[]>([]);
  const router = useRouter();

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const { data } = useQuery<MyMateMatching>({
    queryKey: ['myMateMatching'],
    queryFn: getMyMateMatchingData,
  });

  useEffect(() => {
    if (data) {
      setAuthoredPost(data.authoredPost);
      setParticipatedPost(data.participatedPost);
    }
  }, [data]);

  console.log({ authoredPost }, { participatedPost });

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  return (
    <>
      <title>슬램톡 | 농구 메이트 찾기 내역</title>
      <div className="relative">
        <div
          aria-label="뒤로가기"
          role="link"
          tabIndex={0}
          className="absolute left-4 top-4"
          onClick={handleGoBack}
          onKeyDown={handleKeyDown}
        >
          <IoChevronBackSharp size={24} />
        </div>
        <h2 className="pt-4 text-center text-lg font-semibold">
          농구 메이트 찾기 내역
        </h2>
        <hr className="w-90 my-4 h-px bg-gray-300" />
        <div className="mt-2 flex justify-between px-[16px]">
          <div className="flex flex-wrap gap-4">
            <Tabs variant="underlined" aria-label="Tabs variants">
              <Tab key="team" title="내 모집글" />
              <Tab key="mate" title="지원 현황" />
            </Tabs>
          </div>
        </div>
        <div>목록 개발 중</div>
      </div>
    </>
  );
};

export default MateMatchingList;
