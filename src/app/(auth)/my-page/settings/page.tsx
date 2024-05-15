'use client';

import React, { useState } from 'react';
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
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false);

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

  const handleAskLogout = () => {
    onOpen();
  };

  const handleKeyDownLogout = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAskLogout();
    }
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

  const handleGoChangePassword = () => {
    router.push('/my-page/settings/change-password');
  };

  const handleKeyDownMoveToChangePassword = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === 'Enter') {
      handleGoChangePassword();
    }
  };

  const handleAskWithdrawal = () => {
    setIsWithdraw(true);
    onOpen();
  };

  const handleConfirmWithdrawal = async () => {
    try {
      const response = await axiosInstance.delete('/api/user');

      if (response.status === 200) {
        setIsWithdrawSuccess(true);
        onOpen();
      }
    } catch (withdrawError) {
      console.log('탈퇴 실패: ', withdrawError);
    }
  };

  const handleCancelWithdrawal = () => {
    onClose();
    setIsWithdraw(false);
  };

  const handleWithdrawalSuccesCheck = () => {
    onClose();
    localStorage.setItem('isLoggedIn', 'false');
    router.push('/');
  };

  const handleKeyDownWithdrawal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAskWithdrawal();
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
          onKeyDown={handleKeyDown}
        >
          <IoChevronBackSharp size={24} />
        </div>
        <h2 className="pt-4 text-center text-lg font-semibold">설정</h2>
        <hr className="w-90 my-4 h-px bg-gray-300" />
        <div className="flex flex-col px-4">
          <p className="my-3 font-semibold">기타</p>

          <div className="flex flex-col gap-4">
            <div
              onClick={handleAskLogout}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDownLogout}
            >
              로그아웃
            </div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDownMoveToChangePassword}
              onClick={handleGoChangePassword}
            >
              <p>비밀번호 변경</p>
            </div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDownWithdrawal}
              onClick={handleAskWithdrawal}
            >
              <p>탈퇴하기</p>
            </div>
          </div>
        </div>
      </div>
      {isWithdraw ? (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">탈퇴</ModalHeader>
                <ModalBody>
                  <p>정말 탈퇴하시겠습니까? 탈퇴하시면 복구가 어렵습니다.</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={handleCancelWithdrawal}
                  >
                    취소
                  </Button>
                  <Button color="primary" onPress={handleConfirmWithdrawal}>
                    확인
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : (
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
      )}
      {isWithdrawSuccess && (
        <Modal
          isOpen={isOpen}
          onClose={handleWithdrawalSuccesCheck}
          placement="center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">탈퇴</ModalHeader>
                <ModalBody>
                  <p>탈퇴가 성공적으로 처리되었습니다.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={handleWithdrawalSuccesCheck}>
                    확인
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MyPageSettings;
