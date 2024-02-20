'use client';

import React from 'react';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import { LuLogIn } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import { Avatar, Button, Tooltip } from '@nextui-org/react';
import { getUserData } from '@/services/user/getUserData';

// Anton 폰트 설정
const anton = Anton({ weight: '400', subsets: ['latin'] });

const Header = () => {
  const { data: token } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
  });

  const { data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  return (
    <div className="sticky top-0 z-30 flex h-[61px] w-full max-w-[600px] items-center justify-between border-b-1 bg-background pl-4">
      <div className={`${anton.className} text-2xl`}>
        <Link href="/">
          <div>SLAM TALK</div>
        </Link>
      </div>
      <div className="flex items-center gap-2 pr-4">
        <div>
          {token && user ? (
            <Link href="/my-page">
              <div className="flex items-center gap-2 font-medium">
                {user.nickname} (Lv.{user.level})
                <Tooltip showArrow content="내 정보 바로가기">
                  <Avatar
                    showFallback
                    name={user.nickname}
                    size="sm"
                    alt="마이 페이지"
                    src={user.imageUrl}
                  />
                </Tooltip>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <Tooltip showArrow content="로그인하러 가기" placement="left-end">
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="로그인"
                  variant="light"
                >
                  <LuLogIn aria-label="로그인" size={24} />
                </Button>
              </Tooltip>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
