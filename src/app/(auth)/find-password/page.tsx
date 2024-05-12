'use client';

import axiosInstance from '@/app/api/axiosInstance';
import { validateEmail } from '@/utils/validations';
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

const FindPassword = () => {
  const [email, setEmail] = useState('');
  const isEmailInvalid = useMemo(
    () => !validateEmail(email) && email !== '',
    [email]
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [msg, setMsg] = useState('');

  const handleSendEmail = async () => {
    if (email === '') {
      setMsg('이메일을 입력해주세요.');
      onOpen();
      return;
    }
    try {
      const response = await axiosInstance.patch(
        '/api/user/temporary-passwords',
        {
          email,
        }
      );

      if (response.status === 200) {
        setMsg(
          '해당 이메일로 임시 비밀번호 발송을 완료했습니다. 임시 비밀번호로 로그인을 진행하고 이후 마이페이지에서 비밀번호 변경을 진행해주세요.'
        );
        onOpen();
      }
    } catch (error) {
      setMsg(
        '비밀번호 재설정이 완료되지 않았습니다. 입력하신 이메일을 확인해주세요.'
      );
      onOpen();
      console.log(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      handleSendEmail();
    }
  };

  return (
    <>
      <title>슬램톡 | 비밀번호 찾기</title>
      <div className="mt-14 flex h-full w-full flex-col flex-wrap justify-center gap-3 p-5 align-middle md:flex-nowrap">
        <h1 className="mb-4 text-2xl font-bold sm:text-xl">
          임시 비밀번호 발급
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
          placeholder="이메일 예) slamtalk@naver.com"
          isInvalid={isEmailInvalid}
        />
        <div
          className={`mb-3 h-3 text-sm text-danger ${isEmailInvalid ? 'visible' : 'invisible'}`}
        >
          {isEmailInvalid && '올바른 이메일을 입력해 주세요.'}
        </div>
        <Button
          size="lg"
          radius="sm"
          color="primary"
          onClick={handleSendEmail}
          onKeyDown={handleKeyDown}
        >
          메일 발송
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                비밀번호 찾기
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
};

export default FindPassword;
