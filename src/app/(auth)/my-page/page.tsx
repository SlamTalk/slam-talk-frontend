'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp, IoSettingsOutline } from 'react-icons/io5';
import axiosInstance from '@/app/api/axiosInstance';
import { LuClipboardList } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import { Avatar, Button } from '@nextui-org/react';
// import { FaRegHeart } from 'react-icons/fa6';
import { MdOutlineShareLocation } from 'react-icons/md';
import Link from 'next/link';
import LocalStorage from '@/utils/localstorage';

const MyPage = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleAttend = async () => {
    try {
      const response = await axiosInstance.post('/api/user/attend');

      if (response.status === 200) {
        alert('출석체크 완료되었습니다. 감사합니다 :)');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        console.log('출석체크 실패: ', error);
        alert(
          message ||
            '죄송합니다. 출석체크에 실패했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    }
  };

  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log(error);
  }

  if (user) {
    return (
      <>
        <title>슬램톡 | 마이페이지</title>
        <div className="relative h-screen w-full p-4">
          <div className="flex w-full justify-between">
            <div
              aria-label="뒤로가기"
              role="link"
              tabIndex={0}
              onClick={handleGoBack}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGoBack();
                }
              }}
            >
              <IoChevronBackSharp size={24} />
            </div>
            <Link href="/my-page/settings">
              <IoSettingsOutline aria-label="settings" size={24} />
            </Link>
          </div>
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar alt="profile-img" src={user.imageUrl} />
              <p className="text-lg font-semibold">{user.nickname}</p>
            </div>
            <Link href="/my-page/profile">
              <Button size="sm">프로필 보기</Button>
            </Link>
          </div>
          <Button
            type="submit"
            color="primary"
            className="my-6 w-full"
            radius="sm"
            onClick={handleAttend}
          >
            출석하기
          </Button>
          <div>
            <p className="mb-3 font-semibold">나의 활동</p>
            <div className="flex flex-col gap-4">
              {/* <div className="flex items-center gap-2">
              <FaRegHeart className="text-text" aria-label="like button" />
              <span>게시물 좋아요 목록</span>
            </div> */}
              <div className="flex items-center gap-2">
                <LuClipboardList className="text-text" />
                <span>팀 매칭 내역</span>
              </div>
              <div className="flex items-center gap-2">
                <LuClipboardList className="text-text" />
                <span>농구 메이트 찾기 내역</span>
              </div>
            </div>
            <hr className="w-90 my-4 h-px bg-gray-300" />

            <p className="my-3 font-semibold">기타</p>
            <div className="mb-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MdOutlineShareLocation className="text-text" size={20} />
                <span>내 동네 설정</span>
              </div>
            </div>

            <hr className="w-90 my-4 h-px bg-gray-300" />
            <div className="mb-4 flex flex-col gap-4">
              <span>자주 묻는 질문</span>
              <span>문의하기</span>
            </div>
          </div>
          {user.role === 'ADMIN' && (
            <div className="absolute bottom-16 right-4">
              <Link href="/admin">
                <Button
                  radius="sm"
                  color="success"
                  className="font-medium text-white"
                >
                  관리자 페이지
                </Button>
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
  return null;
};

export default MyPage;
