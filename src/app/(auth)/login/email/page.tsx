'use client';

import React, { useMemo, useState } from 'react';
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
import { validateEmail, validatePassword } from '@/utils/validations';
import Link from 'next/link';
import axiosInstance from '@/app/api/axiosInstance';
import { AxiosError } from 'axios';
import { EyeSlashFilledIcon } from '../../../components/input/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../../components/input/EyeFilledIcon';

const EmailLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [msg, setMsg] = useState('');

  const isEmailValid = useMemo(() => {
    if (!email) return true;

    return validateEmail(email);
  }, [email]);

  const isPasswordValid = useMemo(() => {
    if (!password) return true;

    return validatePassword(password);
  }, [password]);

  const handleLogin = async () => {
    if (!email) {
      setMsg('이메일을 입력해주세요.');
      onOpen();
      return;
    }
    if (!password) {
      setMsg('비밀번호를 입력해주세요.');
      onOpen();
      return;
    }
    if (!isEmailValid || !isPasswordValid) {
      setMsg('입력 정보를 확인해주세요.');
      onOpen();
      return;
    }

    try {
      const response = await axiosInstance.post('/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.headers.authorization;
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem('isLoggedIn', 'true');
        const currentUrl = window.location.href;
        const domain = new URL(currentUrl).origin;
        if (domain === 'http://localhost:3000') {
          window.location.href = 'http://localhost:3000';
        } else {
          window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`;
        }
      }
    } catch (error) {
      console.log('로그인 실패:', error);
      if (error instanceof AxiosError && error.response?.data.message) {
        setMsg(error.response.data.message);
        onOpen();
      }
    }
  };
  const handleToggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <title>슬램톡 | 로그인</title>
      <div className="mt-14 flex h-full w-full flex-col flex-wrap justify-center gap-3 p-4 align-middle md:flex-nowrap">
        <h1 className="mb-4 text-2xl font-bold sm:text-xl">
          이메일과 비밀번호를 입력해 주세요.
        </h1>

        <Input
          radius="sm"
          isClearable
          isRequired
          type="email"
          labelPlacement="outside"
          label="이메일"
          value={email}
          onValueChange={setEmail}
          placeholder="이메일"
          isInvalid={!isEmailValid}
        />
        <div className="mb-3 h-3 text-sm text-danger">
          {!isEmailValid && '올바른 이메일을 입력해 주세요.'}
        </div>

        <Input
          radius="sm"
          isRequired
          type={isVisible ? 'text' : 'password'}
          labelPlacement="outside"
          label="비밀번호"
          placeholder="비밀번호"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={handleToggleVisibility}
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
        />
        <div className="mb-3 h-3 text-sm text-danger" />
        {validateEmail(email) && validatePassword(password) ? (
          <Button size="lg" radius="sm" color="primary" onClick={handleLogin}>
            로그인
          </Button>
        ) : (
          <Button size="lg" radius="sm" color="primary" isDisabled>
            로그인
          </Button>
        )}
        <div className="mt-4 flex justify-center gap-3 align-middle text-sm text-gray-400">
          <Link href="/find-password">
            <p>비밀번호 찾기</p>
          </Link>
        </div>
      </div>
      <Modal size="sm" isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">로그인</ModalHeader>
              <ModalBody>
                <p>{msg}</p>
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
};

export default EmailLogin;
