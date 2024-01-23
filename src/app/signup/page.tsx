'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { validateEmail, validatePassword } from '@/utils/validations';
import { EyeSlashFilledIcon } from '../login/email/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../login/email/EyeFilledIcon';
import axiosInstance from '../api/axiosInstance';

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const isNicknameInvalid = useMemo(
    () =>
      nicknameTouched &&
      (!nickname || nickname.length < 2 || nickname.length > 13),
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
        alert('회원가입 성공!');
      } else {
        setErrorMsg('회원가입 실패. 서버 오류 발생.');
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || '회원가입 실패. 네트워크 오류 발생.'
      );
    }
  };

  const handletoggleVisibility = () => setIsVisible(!isVisible);
  const handleemailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlepasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlenicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!nicknameTouched) setNicknameTouched(true);
    setNickname(e.target.value);
  };

  return (
    <div className="mt-16 flex h-full w-full flex-col flex-wrap gap-6 p-5 sm:mt-10 md:flex-nowrap">
      <h1 className="mb-4 text-2xl font-bold">
        이메일, 닉네임, 비밀번호를 입력해주세요.
      </h1>
      <Input
        isRequired
        label="닉네임"
        labelPlacement="outside"
        value={nickname}
        onChange={handlenicknameChange}
        placeholder="2자 이상 13자 이하"
        isInvalid={isNicknameInvalid}
        errorMessage={
          isNicknameInvalid && '닉네임은 2자 이상 13자 이하이어야 합니다.'
        }
      />
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
        isInvalid={isPasswordInvalid}
        errorMessage={
          isPasswordInvalid &&
          '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
        }
      />
      {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
      <Button size="md" radius="full" color="primary" onClick={handleSignup}>
        가입 완료
      </Button>
    </div>
  );
};

export default SignUp;
