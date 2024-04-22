'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import Logo from './Logo';
import GoMyPage from './GoMyPage';
import GoLogin from './GoLogin';
import Notifications from './Notifications';

const Header = () => {
  const { data: token } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
  });

  if (!token) {
    return (
      <div className="sticky top-0 z-30 flex h-[61px] w-full max-w-[600px] items-center justify-between border-b-1 bg-background pl-4">
        <Logo />
        <div className="flex items-center gap-2 pr-4">
          <GoLogin />
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-30 flex h-[61px] w-full max-w-[600px] items-center justify-between border-b-1 bg-background pl-4">
      <Logo />
      <div className="flex items-center gap-2 pr-4">
        <GoMyPage />
        <Notifications />
      </div>
    </div>
  );
};
export default Header;
