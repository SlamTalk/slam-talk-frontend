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
import { useRouter } from 'next/navigation';
import { validateNickname, validatePassword } from '@/utils/validations';

import axiosInstance from '@/app/api/axiosInstance';
import confetti from 'canvas-confetti';
import { AxiosError } from 'axios';
import { IoChevronBackSharp } from 'react-icons/io5';
import { EyeSlashFilledIcon } from '../../login/components/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../login/components/EyeFilledIcon';

interface EmailProps {
  validEmail: string;
}

const NicknamePassword: React.FC<EmailProps> = ({ validEmail }) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [msg, setMsg] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState(false);

  const isNicknameValid = useMemo(() => {
    if (!nickname) return true;

    return validateNickname(nickname);
  }, [nickname]);

  const isPasswordValid = useMemo(() => {
    if (!password) return true;

    return validatePassword(password);
  }, [password]);

  const isPasswordSame = useMemo(() => {
    if (!confirmPassword) return true;

    if (password === confirmPassword) return true;
    return false;
  }, [password, confirmPassword]);

  const canSignUp = useMemo(() => {
    if (!nickname || !password || !confirmPassword) return false;
    if (isNicknameValid && isPasswordValid && isPasswordSame) return true;
    return false;
  }, [
    nickname,
    password,
    confirmPassword,
    isNicknameValid,
    isPasswordValid,
    isPasswordSame,
  ]);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 160,
    });
  };

  const handleSignup = async () => {
    if (!isPasswordValid || !isNicknameValid) {
      setMsg('입력 정보를 확인해주세요.');
      onOpen();
      return;
    }

    try {
      const response = await axiosInstance.post('/api/sign-up', {
        email: validEmail,
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

  const handleCloseModal = () => {
    if (successSignUp) {
      const currentUrl = window.location.href;
      const domain = new URL(currentUrl).origin;
      if (domain === 'http://localhost:3000') {
        window.location.href = 'http://localhost:3000/user-info';
      } else {
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/user-info`;
      }
    } else {
      onClose();
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleShowAlert = () => {
    setAlert(true);
    onOpen();
  };

  const handleCloseAlert = () => {
    setAlert(false);
    onClose();
  };

  return (
    <>
      <div className="relative h-full w-full">
        <div
          aria-label="뒤로가기"
          role="link"
          tabIndex={0}
          className="absolute left-0 top-0"
          onClick={handleShowAlert}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleShowAlert();
            }
          }}
        >
          <IoChevronBackSharp size={24} />
        </div>
        <h2 className="text-center text-lg font-semibold">
          회원가입 - 닉네임, 비밀번호
        </h2>
        <h1 className="mb-8 mt-14 text-2xl font-bold sm:text-xl">
          닉네임, 비밀번호를 입력해주세요.
        </h1>
        <div className="flex">
          <Input
            radius="sm"
            isRequired
            label="닉네임"
            maxLength={13}
            minLength={2}
            labelPlacement="outside"
            value={nickname}
            onValueChange={setNickname}
            isClearable
            placeholder="특수 문자 제외 2자 이상 13자 이하"
            isInvalid={!isNicknameValid}
          />
        </div>
        <div className="my-3 h-3 text-sm text-danger">
          {!isNicknameValid &&
            '닉네임은 특수 문자 제외 2자 이상 13자 이하이어야 합니다.'}
        </div>
        <div className="mt-6 flex">
          <Input
            radius="sm"
            isRequired
            type={isPasswordVisible ? 'text' : 'password'}
            labelPlacement="outside"
            label="비밀번호"
            maxLength={16}
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 16자 이하"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
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
        </div>
        <div className="my-3 h-3 text-sm text-danger">
          {!isPasswordValid &&
            '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 16자 이하'}
        </div>
        <div className="my-6 flex">
          <Input
            radius="sm"
            isRequired
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            labelPlacement="outside"
            label="비밀번호 확인"
            maxLength={16}
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 16자 이하"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? (
                  <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            isInvalid={!isPasswordSame}
          />
        </div>
        {canSignUp ? (
          <Button
            size="lg"
            radius="sm"
            color="primary"
            onClick={handleSignup}
            className="mt-6 w-full"
          >
            가입 완료
          </Button>
        ) : (
          <Button
            isDisabled
            size="lg"
            radius="sm"
            color="primary"
            onClick={handleSignup}
            className="mt-6 w-full"
          >
            가입 완료
          </Button>
        )}
      </div>

      {alert ? (
        <Modal
          size="sm"
          isOpen={isOpen}
          onClose={handleCloseAlert}
          placement="center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">알림</ModalHeader>
                <ModalBody>
                  <p>
                    지금 뒤로가기 하면 처음부터 다시 입력해야 합니다. 정말 뒤로
                    가시겠습니까?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={handleCloseAlert}
                  >
                    취소
                  </Button>
                  <Button color="primary" onPress={handleGoBack}>
                    확인
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : (
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
      )}
    </>
  );
};

export default NicknamePassword;
