'use client';

import React, { useMemo, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '@/utils/validations';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { EyeSlashFilledIcon } from '../login/email/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../login/email/EyeFilledIcon';
import axiosInstance from '../../api/axiosInstance';

const SignUp = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const isNicknameInvalid = useMemo(
    () =>
      nicknameTouched &&
      (!nickname ||
        nickname.length < 2 ||
        nickname.length > 13 ||
        !validateNickname(nickname)),
    [nickname, nicknameTouched]
  );
  const isEmailInvalid = useMemo(() => {
    if (email === '') return false;

    return !validateEmail(email);
  }, [email]);

  const isPasswordInvalid = useMemo(() => {
    if (password === '') return false;

    return !validatePassword(password);
  }, [password]);

  const handleSignup = async () => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      isNicknameInvalid
    ) {
      alert('입력 정보를 확인해주세요.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/sign-up', {
        email,
        password,
        nickname,
      });

      if (response.status === 200) {
        alert('감사합니다. 회원가입에 성공했습니다!');
        router.push('/user-info');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          '죄송합니다. 회원가입에 실패했습니다. 서버 오류 발생.';
        alert(message);
      } else {
        console.log(error);
        alert('죄송합니다. 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handletoggleVisibility = () => setIsVisible(!isVisible);
  const handleemailChange = () => {};
  const handlepasswordChange = () => {};
  const handlenicknameChange = () => {
    if (!nicknameTouched) setNicknameTouched(true);
  };

  return (
    <div className="mt-14 flex h-full w-full flex-col flex-wrap gap-2 p-5 sm:mt-6 md:flex-nowrap">
      <h1 className="mb-5 text-2xl font-bold sm:text-xl">
        이메일, 닉네임, 비밀번호를 입력해주세요.
      </h1>
      <Input
        isRequired
        label="닉네임"
        maxLength={13}
        labelPlacement="outside"
        value={nickname}
        onChange={handlenicknameChange}
        onValueChange={setNickname}
        onClear={() => console.log('input cleared')}
        placeholder="특수 문자 제외 2자 이상 13자 이하"
        isInvalid={isNicknameInvalid}
      />
      <div
        className={`mb-3 h-3 text-sm text-danger ${isNicknameInvalid ? 'visible' : 'invisible'}`}
      >
        {isNicknameInvalid &&
          '닉네임은 특수 문자 제외 2자 이상 13자 이하이어야 합니다.'}
      </div>
      <Input
        isClearable
        isRequired
        type="email"
        labelPlacement="outside"
        label="이메일"
        value={email}
        onChange={handleemailChange}
        onValueChange={setEmail}
        onClear={() => console.log('input cleared')}
        placeholder="로그인시 필요"
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
        onChange={handlepasswordChange}
        onValueChange={setPassword}
        isInvalid={isPasswordInvalid}
      />
      <div
        className={`mb-7 h-3 text-sm text-danger ${isPasswordInvalid ? 'visible' : 'invisible'}`}
      >
        {isPasswordInvalid &&
          '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 16자 이하이어야 합니다.'}
      </div>
      <Button size="lg" radius="full" color="primary" onClick={handleSignup}>
        가입 완료
      </Button>
    </div>
  );
};

export default SignUp;
