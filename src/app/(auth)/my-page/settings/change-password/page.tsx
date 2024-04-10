'use client';

import { validatePassword } from '@/utils/validations';
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { getUserData } from '@/services/user/getUserData';
import { useQuery } from '@tanstack/react-query';
import LocalStorage from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/api/axiosInstance';
import { IoChevronBackSharp } from 'react-icons/io5';
import { EyeSlashFilledIcon } from '@/app/components/input/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/app/components/input/EyeFilledIcon';

const ChangePassword = () => {
  const router = useRouter();
  const isLoggedIn = LocalStorage.getItem('isLoggedIn');
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [msg, setMsg] = useState('');

  if (isLoggedIn === 'false') {
    router.push('/login');
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  if (error) {
    console.log(error);
  }

  const isPasswordValid = useMemo(() => {
    if (!password) return true;

    return validatePassword(password);
  }, [password]);

  const handletoggleVisibility = () => setIsVisible(!isVisible);

  if (user) {
    const handleChangePassword = async () => {
      if (!password) {
        setMsg('비밀번호를 입력해주세요.');
        onOpen();
        return;
      }
      try {
        const response = await axiosInstance.patch(
          '/api/user/change-password',
          {
            email: user.email,
            password,
          }
        );
        if (response.status === 200) {
          console.log(response);
          setMsg('비밀번호 변경에 성공했습니다.');
          onOpen();
        }
      } catch (ChangeError) {
        console.log(ChangeError);
        setMsg('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        onOpen();
      }
    };

    return (
      <>
        <title>슬램톡 | 비밀번호 변경</title>
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
          <div className="flex h-full w-full flex-col flex-wrap justify-center gap-3 p-5 align-middle md:flex-nowrap">
            <h1 className="mb-4 text-2xl font-bold sm:text-xl">
              비밀번호 변경
            </h1>
            <Input
              radius="sm"
              isDisabled
              isRequired
              type="email"
              labelPlacement="outside"
              label="이메일"
              value={user.email}
              placeholder="이메일"
              className="mb-3"
            />
            <Input
              radius="sm"
              isRequired
              type={isVisible ? 'text' : 'password'}
              labelPlacement="outside"
              label="비밀번호"
              maxLength={16}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상 16자 이하"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={handletoggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              value={password}
              onValueChange={setPassword}
              isInvalid={!isPasswordValid}
            />
            <div className="mb-7 h-3 text-sm text-danger">
              {!isPasswordValid &&
                '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 16자 이하이어야 합니다.'}
            </div>
            {validatePassword(password) ? (
              <Button
                size="lg"
                radius="sm"
                color="primary"
                onClick={handleChangePassword}
              >
                비밀번호 변경
              </Button>
            ) : (
              <Button size="lg" radius="sm" color="primary" isDisabled>
                비밀번호 변경
              </Button>
            )}
          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  비밀번호 변경
                </ModalHeader>
                <ModalBody>{msg}</ModalBody>
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

export default ChangePassword;
