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
import confetti from 'canvas-confetti';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '@/utils/validations';
import { AxiosError } from 'axios';
import { EyeSlashFilledIcon } from '../login/components/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../login/components/EyeFilledIcon';
import axiosInstance from '../../api/axiosInstance';

// [TO DO]
// 모달 추가, 알림 제거 ✅
// 이메일 인증 UI 고치기 ✅

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [code, setCode] = useState('');
  const [sendCode, setSendCode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [msg, setMsg] = useState('');

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

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 160,
    });
  };

  const handleSignup = async () => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      isNicknameInvalid
    ) {
      setMsg('입력 정보를 확인해주세요.');
      onOpen();
      return;
    }

    try {
      const response = await axiosInstance.post('/api/sign-up', {
        email,
        password,
        nickname,
      });

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        setSuccessSignUp(true);
        setMsg('감사합니다. 회원가입에 성공했습니다!');
        onOpen();
        handleConfetti();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          '죄송합니다. 회원가입에 실패했습니다. 서버 오류 발생.';
        setMsg(message);
        onOpen();
      } else {
        console.log(error);
        setMsg('죄송합니다. 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handletoggleVisibility = () => setIsVisible(!isVisible);
  const handleemailChange = () => {};
  const handlepasswordChange = () => {};
  const handlenicknameChange = () => {
    if (!nicknameTouched) setNicknameTouched(true);
  };

  const handleSendEmailCode = async () => {
    if (!email) {
      setMsg('이메일을 입력해 주세요.');
      onOpen();
      return;
    }
    try {
      const response = await axiosInstance.post('/api/send-mail', {
        email,
      });
      if (response.status === 200) {
        setSendCode(true);
        setMsg(
          '이메일 인증 요청을 보냈습니다. 5분 안에 인증코드를 입력해 주세요.'
        );
        onOpen();
      }
    } catch (error) {
      setMsg('이메일 인증 요청에 실패했습니다.');
      onOpen();
    }
  };

  const handleValidateEmailCode = async () => {
    if (!email) {
      setMsg('이메일을 입력해 주세요.');
      onOpen();
      return;
    }
    if (!code) {
      setMsg('인증 코드를 입력해 주세요.');
      onOpen();
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/api/mail-check?email=${email}&code=${code}`
      );
      if (response.status === 200) {
        setMsg('이메일 인증에 성공했습니다!');
        onOpen();
      }
    } catch (error) {
      console.log('이메일 인증 실패:', error);
      setMsg('이메일 인증에 실패했습니다.');
      onOpen();
    }
  };

  const handleCloseModal = () => {
    if (successSignUp) {
      const currentUrl = window.location.href;
      const domain = new URL(currentUrl).origin;
      if (domain === 'http://localhost:3000') {
        window.location.href = 'http://localhost:3000/user-info';
      } else {
        window.location.href = 'https://slam-talk.vercel.app/user-info';
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      <title>슬램톡 | 회원가입</title>
      <div className="mt-14 flex h-full w-full flex-col flex-wrap gap-2 p-4 sm:mt-6 md:flex-nowrap">
        <h1 className="mb-5 text-2xl font-bold sm:text-xl">
          이메일, 닉네임, 비밀번호를 입력해 주세요.
        </h1>
        <Input
          radius="sm"
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
        <div className="flex items-center gap-3">
          <Input
            radius="sm"
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
          <Button
            type="submit"
            radius="sm"
            className="top-3 max-w-xs"
            onClick={handleSendEmailCode}
          >
            이메일 인증 요청
          </Button>
        </div>
        <div
          className={`mb-3 h-3 text-sm text-danger ${isEmailInvalid ? 'visible' : 'invisible'}`}
        >
          {isEmailInvalid && '올바른 이메일을 입력해 주세요.'}
        </div>
        <div className="mb-6 flex items-center justify-end gap-3">
          <Input
            radius="sm"
            isRequired
            isClearable
            labelPlacement="outside"
            label="인증코드"
            placeholder="인증코드 입력"
            onValueChange={setCode}
          />
          {sendCode ? (
            <Button
              type="submit"
              radius="sm"
              className="top-3 max-w-xs font-medium"
              onClick={handleValidateEmailCode}
            >
              확인
            </Button>
          ) : (
            <Button
              isDisabled
              type="submit"
              radius="sm"
              className="top-3 max-w-xs font-medium"
              onClick={handleValidateEmailCode}
            >
              확인
            </Button>
          )}
        </div>
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
        <Button size="lg" radius="sm" color="primary" onClick={handleSignup}>
          가입 완료
        </Button>
      </div>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={handleCloseModal}
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                회원가입
              </ModalHeader>
              <ModalBody>
                <p>{msg}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleCloseModal}>
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

export default SignUp;
