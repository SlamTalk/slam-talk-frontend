import { getUserData } from '@/services/user/getUserData';
import { Avatar, Tooltip } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import SmallLoading from '../loading/SmallLoading';

const GoMyPage = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (isLoading) {
    return <SmallLoading />;
  }

  if (user) {
    return (
      <Link href="/my-page">
        <div className="flex items-center gap-2 font-medium">
          {user.nickname} (Lv.{user.level})
          <Tooltip showArrow content="내 정보 바로가기">
            <Avatar
              showFallback
              name={user.nickname}
              size="sm"
              alt="마이 페이지"
              src={user.imageUrl || ''}
            />
          </Tooltip>
        </div>
      </Link>
    );
  }
  return null;
};

export default GoMyPage;
