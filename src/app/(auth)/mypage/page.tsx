'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import axiosInstance from '@/app/api/axiosInstance';
import useAuthStore from '@/store/authStore';
import { LuLogOut } from 'react-icons/lu';

const MyPage = () => {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('api/logout');

      if (response.status === 200) {
        setAccessToken(null);

        localStorage.setItem('isLoggedIn', 'false');
        alert('로그아웃 되었습니다!');
        router.push('/');
      }
    } catch (error) {
      console.log('로그아웃 실패: ', error);
      alert('죄송합니다. 로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

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
      <button type="submit" className="flex gap-2" onClick={handleLogout}>
        <LuLogOut aria-label="로그아웃" size={24} />
        <span>로그아웃</span>
      </button>
    </div>
  );
};

export default MyPage;
