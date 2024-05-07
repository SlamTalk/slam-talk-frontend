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
import axiosInstance from '@/app/api/axiosInstance';
import { validateEmail } from '@/utils/validations';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface EmailValidateProps {
  onEmailValidate: (email: string) => void;
}

const EmailValidation: React.FC<EmailValidateProps> = ({ onEmailValidate }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sendCode, setSendCode] = useState(false);
  const [msg, setMsg] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isEmailValid = useMemo(() => {
    if (!email) return true;

    return validateEmail(email);
  }, [email]);

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
        onEmailValidate(email);
      }
    } catch (error) {
      console.log('이메일 인증 실패:', error);
      setMsg('이메일 인증에 실패했습니다.');
      onOpen();
    }
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
          '이메일 인증 요청을 보냈습니다. 24시간 안에 인증코드를 입력해 주세요.'
        );
        onOpen();
      }
    } catch (error) {
      setMsg('이메일 인증 요청에 실패했습니다.');
      onOpen();
    }
  };

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleGoBack();
    }
  };

  return (
    <div className="relative h-full w-full">
      <div
        aria-label="뒤로가기"
        role="link"
        tabIndex={0}
        className="absolute left-0 top-0"
        onClick={handleGoBack}
        onKeyDown={handleKeyDown}
      >
        <IoChevronBackSharp size={24} />
      </div>
      <h2 className="text-center text-lg font-semibold">
        회원가입 - 이메일 인증
      </h2>
      <h1 className="mb-8 mt-20 text-2xl font-bold sm:text-xl">
        이메일을 인증해주세요.
      </h1>
      <div className="flex items-center gap-3">
        <Input
          radius="sm"
          isClearable
          isRequired
          type="email"
          labelPlacement="outside"
          label="이메일"
          value={email}
          onValueChange={setEmail}
          placeholder="로그인시 필요"
          isInvalid={!isEmailValid}
        />
        <Button
          color="primary"
          type="submit"
          radius="sm"
          className="top-3 w-1/4"
          onClick={handleSendEmailCode}
        >
          인증 요청
        </Button>
      </div>
      <div className="mb-6 mt-3 h-3 text-sm text-danger">
        {!isEmailValid && '올바른 이메일을 입력해 주세요.'}
      </div>
      <div className="flex items-center justify-end gap-3">
        <Input
          radius="sm"
          isRequired
          isClearable
          labelPlacement="outside"
          label="인증코드"
          placeholder="인증코드 입력"
          value={code}
          onValueChange={setCode}
        />
        {sendCode ? (
          <Button
            color="primary"
            type="submit"
            radius="sm"
            className="top-3 w-1/4"
            onClick={handleValidateEmailCode}
          >
            확인
          </Button>
        ) : (
          <Button
            color="primary"
            isDisabled
            type="submit"
            radius="sm"
            className="top-3 w-1/4"
            onClick={handleValidateEmailCode}
          >
            확인
          </Button>
        )}
      </div>
      <Modal size="sm" isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                이메일 인증
              </ModalHeader>
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
    </div>
  );
};

export default EmailValidation;
