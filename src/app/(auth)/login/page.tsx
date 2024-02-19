'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Anton } from 'next/font/google';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import LocalStorage from '@/utils/localstorage';
import KakaoImg from './components/Kakao';
import GoogleImg from './components/Google';
import NaverImg from './components/Naver';

const anton = Anton({ weight: '400', subsets: ['latin'] });

const Login = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    router.push('my-page');
  }

  const handleKakaoLogin = () => {
    const kakaoLoginURL = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
    router.push(kakaoLoginURL);
  };
  const handleNaverLogin = () => {
    const naverLoginURL = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/naver`;
    router.push(naverLoginURL);
  };
  const handleGoogleLogin = () => {
    const googleLoginURL = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`;
    router.push(googleLoginURL);
  };

  return (
    <>
      <title>슬램톡 | 로그인</title>
      <div className="flex w-full flex-col items-center justify-center text-center">
        <div className={`${anton.className} my-32 text-6xl sm:my-20`}>
          SLAM TALK
        </div>
        <div className="flex flex-col gap-4 font-semibold">
          <Button
            size="lg"
            radius="full"
            className="relative w-full min-w-80 bg-kakao font-semibold text-black shadow-md dark:shadow-slate-500 md:w-96"
            onClick={handleKakaoLogin}
          >
            <div className="absolute left-6">
              <KakaoImg />
            </div>
            <span className="ml-3">카카오로 3초 만에 로그인하기</span>
          </Button>
          <Link href="/login/naver">
            <Button
              size="lg"
              radius="full"
              className="relative w-full min-w-80 bg-naver font-semibold text-white shadow-md dark:shadow-slate-500 md:w-96"
              onClick={handleNaverLogin}
            >
              <div className="absolute left-4">
                <NaverImg />
              </div>
              <span className="ml-3">네이버로 계속하기</span>
            </Button>
          </Link>
          <Link href="/login/google">
            <Button
              size="lg"
              radius="full"
              className="relative mb-2.5 w-full min-w-80 border-1 border-gray-400 bg-white font-semibold text-black shadow-md dark:shadow-slate-500 md:w-96"
              onClick={handleGoogleLogin}
            >
              <div className="absolute left-6">
                <GoogleImg />
              </div>
              <span className="ml-3">구글로 계속하기</span>
            </Button>
          </Link>
        </div>
        <div>
          <hr className="mt-4 h-px w-80 bg-gray-400 sm:w-72" />
        </div>
        <div className="mt-5 flex gap-3 align-middle text-sm text-gray-500 dark:text-gray-300">
          <Link href="/signup">
            <p>이메일로 가입</p>
          </Link>
          <hr className="h-4 w-px bg-gray-300" />
          <Link href="/login/email">
            <p>이메일 로그인</p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Login;
