'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import LocalStorage from '@/utils/localstorage';
import useAuthStore from '@/store/authStore';
import { fetchAccessToken } from './api/auth';

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('loginSuccess');
  const { setAccessToken } = useAuthStore();

  if (search === 'true') {
    LocalStorage.setItem('isLoggedIn', 'true');
    router.push('/');
    fetchAccessToken(setAccessToken);
  }

  return (
    <div>
      <div className="m-auto grid max-w-[600px] overflow-y-auto scrollbar-hide">
        <div className="mt-4 rounded-md bg-gray-100 px-8">
          <div className="mt-2 text-center text-lg font-bold">
            임박한 약속이 있어요!
          </div>
          <div className="mt-1 text-sm">제목: 용산구 초청팀 구합니다!!</div>
          <div className="mt-1 text-sm">
            장소: 서울특별시 용산구 녹사평대로 73 한강중학교 농구장
          </div>
          <div className="mt-1 text-sm">시간: 1월 21일(일) 12시</div>
          <div className="mb-2 text-right text-xs text-black text-opacity-50 underline">
            자세히 보기
          </div>
        </div>
        <div className="-mb-2">
          <div className="mt-4 text-lg font-bold">
            집 주변의 농구장을 찾아보세요!
          </div>
          <div className="mt-2">
            <Image
              src="/images/map_image.png"
              alt="map-image"
              style={{ borderRadius: '8px', overflow: 'hidden' }}
              width={600}
              height={200}
            />
          </div>
          <div className="relative bottom-10 z-10 m-auto w-[150px] rounded bg-[#FF644C] py-1 text-center text-sm font-bold text-white">
            농구장 찾으러 가기
          </div>
        </div>
        <div>
          <div className="text-lg font-bold">경기할 팀을 찾고 있어요!</div>
          <div className="grid">
            <div className="mt-2 grid max-w-[600px] grid-cols-12 items-center gap-4 rounded bg-gray-100 p-1 px-3">
              <div className="col-span-4 truncate text-sm">
                동탄 오산 1월 19일 초청팀 구합니다.
              </div>
              <div className="col-span-3 truncate text-xs font-bold">
                경기도 화성시
              </div>
              <div className="col-span-3 truncate text-xs font-bold">
                1월 19일 14:00
              </div>
              <div className="col-span-2 text-right text-xs font-bold text-black text-opacity-40">
                〉
              </div>
            </div>
            <div className="mt-2 grid max-w-[600px] grid-cols-12 items-center gap-4 rounded bg-gray-100 p-1 px-3">
              <div className="col-span-4 truncate text-sm">
                동탄 오산 1월 19일 초청팀 구합니다.
              </div>
              <div className="col-span-3 truncate text-xs font-bold">
                경기도 화성시
              </div>
              <div className="col-span-3 truncate text-xs font-bold">
                1월 19일 14:00
              </div>
              <div className="col-span-2 text-right text-xs font-bold text-black text-opacity-40">
                〉
              </div>
            </div>
            <div className="mt-2 grid max-w-[600px] grid-cols-12 items-center gap-4 rounded bg-gray-100 p-1 px-3">
              <div className="col-span-4 truncate text-sm">
                동탄 오산 1월 19일 초청팀 구합니다.
              </div>
              <div className="col-span-3 truncate text-xs font-bold">
                경기도 화성시
              </div>
              <div className="col-span-3 truncate text-xs font-bold">
                1월 19일 14:00
              </div>
              <div className="col-span-2 text-right text-xs font-bold text-black text-opacity-40">
                〉
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 text-lg font-bold">
            같이 농구할 사람을 구해요!
          </div>
          <div className="mt-2 grid max-w-[600px] grid-cols-12 items-center gap-4 rounded bg-gray-100 p-1 px-3">
            <div className="col-span-4 truncate text-sm">
              [위례/송파] 1/20(토) 게스트 모집
            </div>
            <div className="col-span-3 truncate text-xs font-bold">
              서울특별시 송파구
            </div>
            <div className="col-span-3 truncate text-xs font-bold">
              1월 20일 07:00
            </div>
            <div className="col-span-2 text-right text-xs font-bold text-black text-opacity-40">
              〉
            </div>
          </div>
          <div className="mt-2 grid max-w-[600px] grid-cols-12 items-center gap-4 rounded bg-gray-100 p-1 px-3">
            <div className="col-span-4 truncate text-sm">
              [마포/상암]상암체육관(정규 코트) 1월 18일(목)15:40~18:10 게스트
              모집
            </div>
            <div className="col-span-3 truncate text-xs font-bold">
              경기도 고양시
            </div>
            <div className="col-span-3 truncate text-xs font-bold">
              1월 18일 15:40
            </div>
            <div className="col-span-2 text-right text-xs font-bold text-black text-opacity-40">
              〉
            </div>
          </div>
          <div className="mt-2 grid max-w-[600px] grid-cols-12 items-center gap-4 rounded bg-gray-100 p-1 px-3">
            <div className="col-span-4 truncate text-sm">
              [부천,인천] 부천JW스포츠센터 1월 20일(토) 아침 6시~9시 게스트 초청
              드립니다
            </div>
            <div className="col-span-3 truncate text-xs font-bold">
              경기도 부천시
            </div>
            <div className="col-span-3 truncate text-xs font-bold">
              1월 20일 06:00
            </div>
            <div className="col-span-2 text-right text-xs font-bold text-black text-opacity-40">
              〉
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
