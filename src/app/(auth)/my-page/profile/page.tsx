'use client';

import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import React from 'react';

const MyProfile = () => {
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const router = useRouter();

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  return (
    <>
      <title>슬램톡 | 내 프로필</title>
      <div>프로필</div>
    </>
  );
};

export default MyProfile;
