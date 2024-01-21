import React from 'react';
import { Anton } from 'next/font/google';
import { Button } from '@nextui-org/button';
import { IoChevronBackSharp } from 'react-icons/io5';
import Link from 'next/link';
import KakaoImg from './Kakao';
import GoogleImg from './Google';

const anton = Anton({ weight: '400', subsets: ['latin'] });

// [TODO] 뒤로 가기 구현
// 링크 연결
// 헤더 마이페이지 아이콘 변경, 아이콘별 링크 설정
const Login = () => (
  <div className="md:h-100 sm:h-100 relative h-screen">
    {/* <Link> */}
    <div className="absolute left-1 top-px">
      <IoChevronBackSharp size={24} />
    </div>
    {/* </Link> */}

    <h2 className="mt-4 text-center text-lg font-semibold">로그인</h2>
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className={`${anton.className} my-40 text-6xl sm:my-36`}>
        SLAM TALK
      </div>
      <div className="flex flex-col font-semibold">
        <Button
          radius="full"
          className="relative mb-3 w-full min-w-80 bg-kakao text-sm font-bold text-black shadow-md md:w-96"
        >
          <div className="absolute left-4">
            <KakaoImg />
          </div>
          <span className="ml-3">카카오로 3초만에 로그인하기</span>
        </Button>
        <Button
          radius="full"
          className="relative mb-2.5 w-full min-w-80 border-1 border-black bg-background font-bold text-black shadow-md md:w-96"
        >
          <div className="absolute left-4">
            <GoogleImg />
          </div>
          <span className="ml-3">구글로 간편하게 로그인하기</span>
        </Button>
      </div>
      <div className="mt-5 flex gap-3 align-middle text-sm text-gray-500">
        {/* <p className="mb-2 text-gray-400">또는</p> */}
        <Link href="/signup">
          <p>이메일로 가입</p>
        </Link>
        <hr className="h-4 w-px bg-gray-400" />
        <Link href="/login/email">
          <p>이메일 로그인</p>
        </Link>
      </div>
    </div>
  </div>
);

export default Login;
