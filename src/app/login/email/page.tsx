'use client';

import React, { useMemo, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { validateEmail, validatePassword } from '@/utils/validations';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { EyeFilledIcon } from './EyeFilledIcon';

const EmailLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isEmailInvalid = useMemo(() => {
    if (email === '') return false;

    return !validateEmail(email);
  }, [email]);

  const isPasswordInvalid = useMemo(() => {
    if (password === '') return false;

    return !validatePassword(password);
  }, [password]);

  const handleSignup = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      alert('유효하지 않은 이메일 또는 비밀번호입니다.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 회원가입 성공 처리
        alert('회원가입 성공!');
      } else {
        // 서버 에러 처리
        alert('회원가입 실패. 서버 오류 발생.');
      }
    } catch (error) {
      // 네트워크 에러 처리
      alert('회원가입 실패. 네트워크 오류 발생.');
    }
  };

  return (
    <div className="mt-32 flex h-full w-full flex-col flex-wrap justify-center gap-6 p-5 align-middle md:flex-nowrap">
      <h1 className="mb-4 text-2xl font-bold">
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
        onClear={() => console.log('input cleared')}
        placeholder="로그인시 필요"
        isInvalid={isEmailInvalid}
        errorMessage={isEmailInvalid && '올바른 이메일을 입력해주세요.'}
      />
      <Input
        isRequired
        type={isVisible ? 'text' : 'password'}
        labelPlacement="outside"
        label="비밀번호"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
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
        isInvalid={isPasswordInvalid}
        errorMessage={
          isPasswordInvalid &&
          '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
        }
      />
      <Button radius="full" color="primary" onClick={handleSignup}>
        가입 완료
      </Button>
    </div>
  );
};

export default EmailLogin;
