'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp, IoSettingsOutline } from 'react-icons/io5';
import axiosInstance from '@/app/api/axiosInstance';
import { LuClipboardList } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react';
import Link from 'next/link';
import LocalStorage from '@/utils/localstorage';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
// import KakaoChannelImg from './components/KakaoChannel';

const MyPage = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [check, setCheck] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  const handleAttend = async () => {
    try {
      const response = await axiosInstance.post('/api/user/attend');

      if (response.status === 200) {
        setCheck(true);
        onOpen();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setCheck(false);
        setErrorMessage(message);
        console.log('출석체크 실패: ', error);
        onOpen();
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
              onKeyDown={handleKeyDown}
            >
              <IoChevronBackSharp size={24} />
            </div>
            <Button
              href="/my-page/settings"
              as={Link}
              isIconOnly
              size="sm"
              radius="full"
              aria-label="설정"
              variant="light"
            >
              <IoSettingsOutline aria-label="settings" size={24} />
            </Button>
          </div>
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                showFallback
                alt="profile-img"
                src={user.imageUrl || ''}
              />
              <p className="text-lg font-semibold">{user.nickname}</p>
            </div>
            <Button href="/my-page/profile" as={Link} size="sm">
              프로필 보기
            </Button>
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
              <Link href="/my-page/team-matching-list">
                <div className="flex items-center gap-2">
                  <LuClipboardList className="text-text" />
                  <span>상대팀 찾기 내역</span>
                </div>
              </Link>
              <Link href="/my-page/mate-matching-list">
                <div className="flex items-center gap-2">
                  <LuClipboardList className="text-text" />
                  <span>메이트 찾기 내역</span>
                </div>
              </Link>
            </div>
            <hr className="w-90 my-4 h-px bg-gray-300" />
            <p className="my-3 font-semibold">설정</p>
            <div className="mb-4 flex flex-col gap-4">
              <div className="flex gap-2">
                <span>화면 모드</span>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          <hr className="w-90 my-4 h-px bg-gray-300" />
          {/* <p className="my-3 font-semibold">기타</p>
          <div className="mb-4 flex flex-col gap-4">
            <Button
              radius="sm"
              href="https://pf.kakao.com/_AxisJG"
              target="_blank"
              as={Link}
              startContent={<KakaoChannelImg />}
              className="w-fit bg-kakao dark:text-background"
            >
              카카오톡 채널 문의하기
            </Button>
          </div> */}
          <div>
            <p className="mb-3 font-semibold">문의</p>
            <Tooltip
              showArrow
              content="slamtalk.official@gmail.com"
              placement="right-end"
            >
              <a href="mailto:slamtalk.official@gmail.com">
                <span>📬 이메일 문의</span>
              </a>
            </Tooltip>
          </div>
          {user.role === 'ADMIN' && (
            <div className="absolute bottom-16 right-4">
              <Button
                href="/admin"
                as={Link}
                radius="sm"
                color="success"
                className="font-medium text-white"
              >
                관리자 페이지
              </Button>
            </div>
          )}
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  출석체크
                </ModalHeader>
                <ModalBody>
                  {check
                    ? '출석체크 완료되었습니다. 감사합니다.'
                    : errorMessage ||
                      '죄송합니다. 출석체크에 실패했습니다. 잠시 후 다시 시도해 주세요.'}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    확인
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  return null;
};

export default MyPage;
