'use client';

import React, { useMemo, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { validateEmail, validatePassword } from '@/utils/validations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import axiosInstance from '@/app/api/axiosInstance';
import { AxiosError } from 'axios';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { EyeFilledIcon } from './EyeFilledIcon';

const EmailLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useAuthStore();

  const isEmailInvalid = useMemo(
    () => !validateEmail(email) && email !== '',
    [email]
  );
  const isPasswordInvalid = useMemo(
    () => !validatePassword(password) && password !== '',
    [password]
  );

  const handleLogin = async () => {
    if (isEmailInvalid || isPasswordInvalid) {
      alert('유효하지 않은 이메일 또는 비밀번호입니다.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/login', {
        email,
        password,
      });

      console.log(response);

      if (response.status === 200) {
        const { accessToken } = response.data;
        setAccessToken(accessToken);

        alert('로그인 성공!');
        router.back();
      }
    } catch (error) {
      console.log('로그인 실패:', error);
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          '죄송합니다. 로그인에 실패했습니다. 서버 오류 발생.';
        alert(message);
      } else {
        alert('죄송합니다. 알 수 없는 오류가 발생했습니다.');
      }
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="mt-14 flex h-full w-full flex-col flex-wrap justify-center gap-3 p-5 align-middle md:flex-nowrap">
      <h1 className="mb-4 text-2xl font-bold sm:text-xl">
        이메일과 비밀번호를 입력해주세요.
      </h1>

      <Input
        isClearable
        isRequired
        type="email"
        labelPlacement="outside"
        label="이메일"
        value={email}
        onValueChange={setEmail}
        onClear={() => setEmail('')}
        placeholder="이메일"
        isInvalid={isEmailInvalid}
      />
      <div
        className={`mb-3 h-3 text-sm text-danger ${isEmailInvalid ? 'visible' : 'invisible'}`}
      >
        {isEmailInvalid && '올바른 이메일을 입력해주세요.'}
      </div>

      <Input
        isRequired
        type={isVisible ? 'text' : 'password'}
        labelPlacement="outside"
        label="비밀번호"
        placeholder="비밀번호"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
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
      <Button size="lg" radius="full" color="primary" onClick={handleLogin}>
        로그인
      </Button>
      <div className="mt-4 flex justify-center gap-3 align-middle text-sm text-gray-400">
        <Link href="/find-password">
          <p>비밀번호 찾기</p>
        </Link>
      </div>
    </div>
  );
};

export default EmailLogin;
