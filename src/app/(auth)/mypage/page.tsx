'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import axiosInstance from '@/app/api/axiosInstance';
import { LuLogOut } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';

const MyPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/api/logout');

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'false');
        alert('로그아웃되었습니다.');
        router.push('/');
      }
    } catch (logoutError) {
      console.log('로그아웃 실패: ', logoutError);
      alert('죄송합니다. 로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log(error);
  }

  return (
    <div className="md:h-100 sm:h-100 relative h-full w-full p-5">
      <div
        aria-label="뒤로가기"
        role="link"
        tabIndex={0}
        className="fixed left-4 top-4"
        onClick={handleGoBack}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleGoBack();
          }
        }}
      >
        <IoChevronBackSharp size={24} />
      </div>
      <div>
        <p>{user?.nickname}</p>
        <p>{user?.socialType}</p>
        <p>{user?.email}</p>
      </div>
      <button type="submit" className="flex gap-2" onClick={handleLogout}>
        <LuLogOut aria-label="로그아웃" size={24} />
        <span>로그아웃</span>
      </button>
    </div>
  );
};

export default MyPage;
