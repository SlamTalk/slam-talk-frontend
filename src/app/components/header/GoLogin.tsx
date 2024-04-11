import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import { Button, Tooltip } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { LuLogIn } from 'react-icons/lu';
import SmallLoading from '../loading/SmallLoading';

const GoLogin = () => {
  const { isLoading } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
  });

  if (isLoading) {
    return <SmallLoading />;
  }

  return (
    <Link href="/login">
      <Tooltip showArrow content="로그인하러 가기" placement="left-end">
        <Button radius="full" isIconOnly aria-label="로그인" variant="light">
          <LuLogIn aria-label="로그인" size={24} />
        </Button>
      </Tooltip>
    </Link>
  );
};

export default GoLogin;
