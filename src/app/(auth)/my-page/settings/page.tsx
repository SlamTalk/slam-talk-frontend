'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { IoChevronBackSharp } from 'react-icons/io5';
import axiosInstance from '@/app/api/axiosInstance';
import LocalStorage from '@/utils/localstorage';

const MyPageSettings = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    onOpen();
  };

  const handleConfirmLogout = async () => {
    try {
      const response = await axiosInstance.post('/api/logout');

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'false');
        router.push('/');
      }
    } catch (logoutError) {
      console.log('로그아웃 실패: ', logoutError);
    }
  };

  return (
    <>
      <title>슬램톡 | 마이페이지 - 설정</title>
      <div className="relative">
        <div
          aria-label="뒤로가기"
          role="link"
          tabIndex={0}
          className="absolute left-4 top-4"
          onClick={handleGoBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleGoBack();
            }
          }}
        >
          <IoChevronBackSharp size={24} />
        </div>
        <h2 className="pt-4 text-center text-lg font-semibold">설정</h2>
        <hr className="w-90 my-4 h-px bg-gray-300" />
        <div className="flex flex-col px-4">
          <p className="my-3 font-semibold">알림 설정</p>
          <span>알림 수신 설정</span>
          <hr className="w-90 my-4 h-px bg-gray-300" />
          <p className="my-3 font-semibold">기타</p>
          <div
            className="flex items-center gap-2"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogout();
              }
            }}
          >
            <div className="flex flex-col gap-4">
              <span>로그아웃</span>
              <span>탈퇴하기</span>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                로그아웃
              </ModalHeader>
              <ModalBody>
                <p>정말 로그아웃하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button color="primary" onPress={handleConfirmLogout}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyPageSettings;
