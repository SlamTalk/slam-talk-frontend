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

  return <div>프로필</div>;
};

export default MyProfile;
